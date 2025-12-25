import { auth0 } from "@/lib/auth0";
import Link from "next/link";

export default async function UserBlock() {
  const session = await auth0.getSession();
  const user = session?.user;
  return (
    <Link href="/user">
      {user?.picture ? <img src={user.picture} /> : "no photo"}
      <p>{user?.email}</p>
      <p>{user?.nickname}</p>
    </Link>
  );
}
