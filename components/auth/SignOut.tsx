"use client";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await fetch("/api/auth/signout", {
      method: "POST",
    });
    window.location.href = "/auth";
  };

  return (
    <a onClick={handleSignOut} className="text-base-content">
      Sign out
    </a>
  );
}
