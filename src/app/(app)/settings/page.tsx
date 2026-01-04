import ResetPassword from "@/components/Settings/ResetPassword";
import UserSettingsForm from "@/components/Settings/UserSettingsForm";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import { auth0 } from "@/lib/auth0";
import "./settings.scss";

export default async function Settings() {
  const session = await auth0.getSession();
  const isSocialUser = session?.user?.sub?.startsWith("google-oauth2");

  return (
    <div className="settings-page">
      <h1 className="settings-main-title">Settings</h1>

      <div className="settings-content-row">
        <section className="settings-section main-column">
          <UserSettingsForm />
          <div className="settings-divider"></div>
          <ResetPassword isSocialUser={isSocialUser} />
        </section>

        <section className="settings-section side-column">
          <h2 className="settings-subtitle">Site Settings</h2>
          <div className="theme-card">
            <p className="theme-label">Interface Theme</p>
            <ThemeSwitcher />
          </div>
        </section>
      </div>
    </div>
  );
}
