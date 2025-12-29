export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { auth0 } from "@/lib/auth0";
import { QueryFilter, InferSchemaType, Types } from "mongoose";

const PAGE_SIZE = 5;

type PostDoc = InferSchemaType<typeof Post.schema>;

export async function GET(req: Request) {
  const session = await auth0.getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");
  const authorIdParam = searchParams.get("authorId");

  const query: QueryFilter<PostDoc> = {};

  if (authorIdParam) {
    const decodedId = decodeURIComponent(authorIdParam);
    const ids = decodedId.split(",");

    query.authorId = ids.length > 1 ? { $in: ids } : ids[0];
  }

  if (cursor && Types.ObjectId.isValid(cursor)) {
    query._id = { $lt: new Types.ObjectId(cursor) };
  }

  const posts = await Post.find(query)
    .sort({ _id: -1 })
    .limit(PAGE_SIZE + 1);

  const hasMore = posts.length > PAGE_SIZE;
  const sliced = hasMore ? posts.slice(0, PAGE_SIZE) : posts;
  const nextCursor = hasMore ? sliced[sliced.length - 1]._id.toString() : null;

  return NextResponse.json({ posts: sliced, hasMore, nextCursor });
}
