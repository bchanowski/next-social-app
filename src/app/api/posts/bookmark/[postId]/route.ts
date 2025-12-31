import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { auth0 } from "@/lib/auth0";
import { ObjectId } from "mongoose";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await auth0.getSession();
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { postId } = await params;
    await connectDB();

    const currentUser = await User.findOne({ auth0Id: session.user.sub });
    const isBookmarked = currentUser.bookmarkedPosts.some(
      (id: ObjectId) => id.toString() === postId
    );

    const update = isBookmarked
      ? { $pull: { bookmarkedPosts: postId } }
      : { $addToSet: { bookmarkedPosts: postId } };

    await User.updateOne({ auth0Id: session.user.sub }, update);

    return NextResponse.json({ isBookmarked: !isBookmarked });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const session = await auth0.getSession();
  if (!session) return NextResponse.json({ isBookmarked: false });

  const { postId } = await params;
  await connectDB();

  const currentUser = await User.findOne({ auth0Id: session.user.sub });
  if (!currentUser) return NextResponse.json({ isBookmarked: false });

  const isBookmarked = currentUser.bookmarkedPosts.some(
    (id: ObjectId) => id.toString() === postId
  );

  return NextResponse.json({ isBookmarked });
}
