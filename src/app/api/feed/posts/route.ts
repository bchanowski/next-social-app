import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { auth0 } from "@/lib/auth0";
import { Types, InferSchemaType, QueryFilter } from "mongoose";
import { PostT } from "@/types/PostT";

type PostDoc = InferSchemaType<typeof Post.schema>;
const PAGE_SIZE = 5;

export async function GET(req: Request) {
  try {
    const session = await auth0.getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids");
    const cursor = searchParams.get("cursor");

    if (!idsParam) return NextResponse.json({ posts: [], hasMore: false });

    const validObjectIds = idsParam
      .split(",")
      .filter((id) => Types.ObjectId.isValid(id))
      .map((id) => new Types.ObjectId(id));

    if (validObjectIds.length === 0)
      return NextResponse.json({ posts: [], hasMore: false });

    const query: QueryFilter<PostDoc> = {
      _id: { $in: validObjectIds },
    };

    if (cursor && Types.ObjectId.isValid(cursor)) {
      query._id = {
        $in: validObjectIds,
        $lt: new Types.ObjectId(cursor),
      };
    }

    const postsRaw = await Post.find(query)
      .sort({ _id: -1 })
      .limit(PAGE_SIZE + 1)
      .lean();

    const posts = postsRaw as unknown as PostT[];
    const hasMore = posts.length > PAGE_SIZE;
    const sliced = hasMore ? posts.slice(0, PAGE_SIZE) : posts;
    const nextCursor = hasMore
      ? sliced[sliced.length - 1]._id.toString()
      : null;

    return NextResponse.json({ posts: sliced, hasMore, nextCursor });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
