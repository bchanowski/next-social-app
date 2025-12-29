import "../styles/UserMiniProfile.scss";
import Image from "next/image";
import { User } from "@auth0/nextjs-auth0/types";
import Link from "next/link";

type Props = {
  user: User | undefined;
};

export default function UserMiniProfile({ user }: Props) {
  return (
    <Link className="user-mini-container" href={"/users/" + user?.nickname}>
      {user?.picture || user?.avatarUrl ? (
        <Image
          alt="User's Avatar"
          src={user.picture ? user.picture : user.avatarUrl}
          width={30}
          height={30}
          className="user-mini-img"
        />
      ) : (
        <></>
      )}
      <div className="user-mini-text">
        <p>Dummy User</p>
        <p>Engineer</p>
      </div>
    </Link>
  );
}
