import { connectDB } from "@/lib/db";
import User from "../models/User";
import { auth0 } from "./auth0";

export async function ensureUser() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) return null;

  await connectDB();

  const auth0Id = session.user.sub;

  let user = await User.findOne({ auth0Id });

  if (!user) {
    user = await User.create({
      auth0Id,
      name: session.user.name,
      avatarUrl: session.user.picture,
    });
  }

  return user;
}
