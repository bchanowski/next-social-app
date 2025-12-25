import SearchTab from "@/components/SearchTab";
import UserTab from "@/components/UserTab";
import { ensureUser } from "@/lib/ensureUser";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await ensureUser();
  return (
    <div>
      <UserTab />
      {children}
      <SearchTab />
    </div>
  );
}
