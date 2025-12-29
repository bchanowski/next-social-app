import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { auth0 } from "@/lib/auth0";

export async function PATCH(req: Request) {
  try {
    const session = await auth0.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, position, avatarUrl } = body;

    await connectDB();

    const updatedUser = await User.findOneAndUpdate(
      { auth0Id: session.user.sub },
      {
        $set: {
          name,
          description,
          position,
          avatarUrl,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
