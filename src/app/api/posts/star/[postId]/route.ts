import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Post from "@/models/Post";
import { auth0 } from "@/lib/auth0";
import { ObjectId } from "mongoose";

type RouteParams = { params: Promise<{ postId: string }> };

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const session = await auth0.getSession();
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { postId } = await params;
    await connectDB();

    const currentUser = await User.findOne({ auth0Id: session.user.sub });
    if (!currentUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    const isStarred = currentUser.starredPosts.some(
      (id: ObjectId) => id.toString() === postId
    );

    if (isStarred) {
      await User.updateOne(
        { auth0Id: session.user.sub },
        { $pull: { starredPosts: postId } }
      );
      await Post.updateOne({ _id: postId }, { $inc: { stars: -1 } });
    } else {
      await User.updateOne(
        { auth0Id: session.user.sub },
        { $addToSet: { starredPosts: postId } }
      );
      await Post.updateOne({ _id: postId }, { $inc: { stars: 1 } });
    }

    return NextResponse.json({ isStarred: !isStarred });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: RouteParams) {
  const session = await auth0.getSession();
  if (!session) return NextResponse.json({ isStarred: false });

  const { postId } = await params;
  await connectDB();

  const currentUser = await User.findOne({ auth0Id: session.user.sub });
  if (!currentUser) return NextResponse.json({ isStarred: false });

  const isStarred = currentUser.starredPosts.some(
    (id: ObjectId) => id.toString() === postId
  );
  return NextResponse.json({ isStarred });
}
