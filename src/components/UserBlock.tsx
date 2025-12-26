import { auth0 } from "@/lib/auth0";
import Image from "next/image";
import Link from "next/link";
import "../styles/UserBlock.scss";

export default async function UserBlock() {
  const session = await auth0.getSession();
  const user = session?.user;
  return (
    <Link href="/user" className="user-block-container">
      {user?.picture ? (
        <Image
          src={user.picture}
          alt="User's Avatar"
          width={60}
          height={60}
          className="user-image"
        />
      ) : (
        "no photo"
      )}
      <div>
        <h3 className="user-block-text">{user?.email}</h3>
        <p className="user-block-text">{user?.nickname}</p>
      </div>
    </Link>
  );
}
