import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { ensureUser } from "@/lib/ensureUser";
import { auth0 } from "@/lib/auth0";

export async function POST(req: Request) {
  const session = await auth0.getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!session.user.email_verified) {
    return NextResponse.json(
      { error: "Email verification required" },
      { status: 403 }
    );
  }

  const { title, description } = await req.json();

  await connectDB();
  await ensureUser();

  const post = await Post.create({
    title,
    description,
    authorId: session.user.sub,
    topic: "General",
  });

  return NextResponse.json(post);
}
