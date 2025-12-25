import { auth0 } from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;
  return (
    <div>
      <h1>
        You're not logged in! Login or Register to fully experience the site!
      </h1>
      <h3>
        <a href="/auth/login">Login/Register</a>
      </h3>
    </div>
  );
}
