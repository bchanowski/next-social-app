import "../styles/InfoTab.scss";

type Props = {
  heading: string;
  children: React.ReactNode;
};

export default async function InfoTab({ heading, children }: Props) {
  return (
    <div className="info-tab-container">
      <h2 className="info-tab-heading">{heading}</h2>
      {children}
    </div>
  );
}
