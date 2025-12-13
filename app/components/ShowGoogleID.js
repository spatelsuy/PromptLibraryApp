"use client";

import { useSession } from "next-auth/react";

export default function ShowGoogleID() {
  const { data: session } = useSession();

  if (!session) return <p>Not logged in</p>;

  return (
    <div>
      <p className="text-gray-900">Welcome {session.user.email}</p>
    </div>
  );
}

