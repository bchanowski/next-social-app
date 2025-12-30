import ResetPassword from "@/components/ResetPassword";
import "./settings.scss";
import UserSettingsForm from "@/components/UserSettingsForm";
import { auth0 } from "@/lib/auth0";
export default async function Settings() {
  const session = await auth0.getSession();
  const isSocialUser = session?.user?.sub?.startsWith("google-oauth2");
  return (
    <div className="settings-container">
      <h2>
        Settings
        <UserSettingsForm />
        <ResetPassword isSocialUser={isSocialUser} />
      </h2>
      <h2>
        Site Settings
        <p>Theme</p>
        <button>Light</button>
        <button>Dark</button>
        <button>System</button>
      </h2>
    </div>
  );
}
