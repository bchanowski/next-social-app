import Loader from "@/components/Shared/Loader";
import "../styles/globals.scss";

export default function GlobalLoading() {
  return (
    <div className="loader-container">
      <Loader fullPage={true} size="large" />
    </div>
  );
}
