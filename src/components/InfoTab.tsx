type Props = {
  heading: string;
  children: React.ReactNode;
};

export default async function InfoTab({ heading, children }: Props) {
  return (
    <div>
      <h4>{heading}</h4>
      {children}
    </div>
  );
}
