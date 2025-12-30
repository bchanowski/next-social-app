import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { auth0 } from "@/lib/auth0";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ targetId: string }> }
) {
  const session = await auth0.getSession();
  if (!session) return NextResponse.json({ isSubscribed: false });

  await connectDB();
  const { targetId } = await params;

  const user = await User.findOne({
    auth0Id: session.user.sub,
    subscribedTo: targetId,
  });

  return NextResponse.json({ isSubscribed: !!user });
}
