import Link from "next/link";
import "./nopage.scss";
export default function NoPage() {
  return (
    <div className="nopage-container">
      <h2>
        Sorry this page does not yet exist! It may be under construction.{" "}
        <p>
          Check again later! For now go back{" "}
          <Link href="/home" className="nopage-link">
            home
          </Link>
        </p>
      </h2>
    </div>
  );
}
