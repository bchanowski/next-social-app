import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { auth0 } from "@/lib/auth0";

export async function POST(req: Request) {
  try {
    const session = await auth0.getSession();
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { targetId } = await req.json();
    if (!targetId)
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await connectDB();

    const currentUser = await User.findOne({ auth0Id: session.user.sub });
    if (!currentUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isSubscribed = currentUser.subscribedTo.includes(targetId);

    if (isSubscribed) {
      await User.updateOne(
        { auth0Id: session.user.sub },
        { $pull: { subscribedTo: targetId } }
      );
    } else {
      await User.updateOne(
        { auth0Id: session.user.sub },
        { $addToSet: { subscribedTo: targetId } }
      );
    }

    return NextResponse.json({ success: true, isSubscribed: !isSubscribed });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
