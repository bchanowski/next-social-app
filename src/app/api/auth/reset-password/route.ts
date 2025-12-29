import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function POST() {
  const session = await auth0.getSession();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const response = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/dbconnections/change_password`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        email: session.user.email,
        connection: "Username-Password-Authentication",
      }),
    }
  );

  if (response.ok) {
    return NextResponse.json({ message: "Reset email sent!" });
  } else {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 400 }
    );
  }
}
