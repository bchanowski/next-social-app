import "../styles/Loader.scss";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  fullPage?: boolean;
}

export default function Loader({
  size = "medium",
  fullPage = false,
}: LoaderProps) {
  return (
    <div className={`loader-container ${size} ${fullPage ? "full-page" : ""}`}>
      <div className="spinner" />
    </div>
  );
}
