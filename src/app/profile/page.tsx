"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState(session?.user?.name || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);


  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const updatedName = name.trim();

    if (!updatedName) {
      setError("তোমার নাম লিখো।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: updatedName,
      });

      if (result.error) {
        setError(result.error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      setMessage("তোমার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    setError("");
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError(result.error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      router.replace("/signin");
      router.refresh();
    } catch {
      setError("সাইন আউট করার সময় সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4">
        <div className="w-full max-w-md animate-pulse rounded-2xl border border-[#dfe8df] bg-white p-8">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-200" />
          <div className="mx-auto mt-4 h-5 w-40 rounded bg-gray-200" />
          <div className="mt-6 h-11 rounded-lg bg-gray-100" />
          <div className="mt-3 h-11 rounded-lg bg-gray-100" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] bg-[#f0f5f0] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-700 hover:underline"
        >
          ← হোম পেজে ফিরে যাও
        </Link>

        <section className="mt-5 overflow-hidden rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] shadow-sm">
          <div className="bg-emerald-700 px-6 py-8 text-center text-white sm:px-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/40 bg-white/15 text-3xl font-bold">
              {session.user.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h1 className="mt-4 text-2xl font-extrabold">
              আমার প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-emerald-50">
              তোমার অ্যাকাউন্টের তথ্য দেখো ও আপডেট করো।
            </p>
          </div>

          <div className="p-6 sm:p-8">

            <div className="mb-5">
              <Link
                href="/profile/update"
                className="inline-block rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                প্রোফাইল আপডেট করো
              </Link>
            </div>

            <div className="mb-6 rounded-xl border border-[#e4ebe4] bg-white p-4">
              <p className="text-xs font-medium text-gray-500">
                ইমেইল ঠিকানা
              </p>
              <p className="mt-1 break-all font-semibold text-gray-800">
                {session.user.email}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                ইমেইল ঠিকানা এই ফর্ম থেকে পরিবর্তন করা যাবে না।
              </p>
            </div>


            <div className="my-7 border-t border-[#e4ebe4]" />

            <div>
              <h2 className="font-bold text-gray-800">অ্যাকাউন্ট</h2>
              <p className="mt-1 text-sm text-gray-500">
                অ্যাকাউন্ট থেকে বের হতে চাইলে নিচের বাটনে ক্লিক করো।
              </p>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut || saving}
                className="mt-4 w-full rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
