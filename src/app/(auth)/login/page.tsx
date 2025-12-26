import "./login.scss";

export default async function Home() {
  return (
    <div className="login-container">
      <div className="login-modal">
        <div className="login-div">
          <h1 className="login-text">
            {"Welcome to the Next Social App!"}
            {<br />}
            {
              "You're not logged in. Login or Register to fully experience the site."
            }
          </h1>
          <a href="/auth/login" className="login-btn">
            Login / Register
          </a>
        </div>
        <p>Login powered by Auth0</p>
      </div>
    </div>
  );
}
