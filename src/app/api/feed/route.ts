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
    const authorId = searchParams.get("authorId");
    const topic = searchParams.get("topic");
    const cursor = searchParams.get("cursor");

    const query: QueryFilter<PostDoc> = {};

    if (searchParams.has("authorId")) {
      if (!authorId || authorId === "undefined" || authorId === "") {
        return NextResponse.json({
          posts: [],
          hasMore: false,
          nextCursor: null,
        });
      }

      if (authorId.includes(",")) {
        const idsArray = authorId.split(",");
        query.authorId = { $in: idsArray };
      } else {
        query.authorId = authorId;
      }
    }

    if (topic && topic !== "") {
      query.topic = topic;
    }

    if (cursor && Types.ObjectId.isValid(cursor)) {
      query._id = { $lt: new Types.ObjectId(cursor) };
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
