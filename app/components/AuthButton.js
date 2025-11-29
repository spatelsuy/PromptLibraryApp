"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    // If user is not logged in, show login button
    return (
      <button onClick={() => signIn("google")}  className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Login with Google
      </button>
    );
  }

  // If user is logged in, show logout button
  return (
    <button onClick={() => signOut()}  className="px-4 py-2 bg-red-600 text-white rounded-md">
      Logout
    </button>
  );
}
