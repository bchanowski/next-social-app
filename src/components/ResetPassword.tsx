"use client";

export default function ResetPassword({
  isSocialUser,
}: {
  isSocialUser: boolean | undefined;
}) {
  const handlePasswordReset = async () => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Password reset email sent!");
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
  };
  return (
    <div>
      <button disabled={isSocialUser} onClick={() => handlePasswordReset()}>
        Reset Password
      </button>
      {isSocialUser && <p>Only non social users can reset password!</p>}
    </div>
  );
}
