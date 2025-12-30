import PostsList from "@/components/PostsList";
import { auth0 } from "@/lib/auth0";
import User from "@/models/User";

export default async function Home() {
  const session = await auth0.getSession();

  const dbUser = await User.findOne({ auth0Id: session?.user.sub });
  const following = dbUser?.subscribedTo || [];

  if (following.length === 0) {
    return (
      <p>
        You arent following anyone yet! Go to Explore to find posts and users.
      </p>
    );
  }
  return <PostsList userId={following} />;
}
