import { ThemeProvider } from "@/components/ThemeProvider";
import "../styles/globals.scss";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { raleway, archivo } from "./fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Auth0Provider>
          <ThemeProvider>{children}</ThemeProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
