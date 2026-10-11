"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await authClient.signOut();

    if (!result.error) {
      router.push("/");
      router.refresh();
    }
  };

  if (isPending) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="max-w-32 truncate text-sm font-medium text-gray-700">
          {session.user.name}
        </span>
        <Link
          href="/profile"
          className="rounded-lg px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
        >
          Profile
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
      >
        Sign In
      </Link>

      <Link
        href="/signup"
        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        Sign Up
      </Link>
    </div>
  );
}
