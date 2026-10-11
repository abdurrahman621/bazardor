
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const updatedName = String(formData.get("name") ?? "").trim();

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
        setError(result.error.message || "নাম আপডেট করা যায়নি।");
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

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="h-40 w-full max-w-md animate-pulse rounded-2xl bg-gray-100" />
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#f0f5f0] px-4 py-10">
      <div className="mx-auto max-w-xl">
        <Link
          href="/profile"
          className="text-sm font-medium text-emerald-700 hover:underline"
        >
          ← প্রোফাইলে ফিরে যাও
        </Link>

        <section className="mt-5 rounded-2xl border border-[#dfe8df] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-extrabold text-gray-900">
            প্রোফাইল আপডেট
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            তোমার অ্যাকাউন্টের নাম পরিবর্তন করো।
          </p>

          <form onSubmit={handleUpdate} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="update-name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                তোমার নাম
              </label>

              <input
                id="update-name"
                name="name"
                type="text"
                autoComplete="name"
                defaultValue={session.user.name ?? ""}
                maxLength={100}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                placeholder="তোমার নাম লিখো"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {message && (
              <p
                role="status"
                className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "Update Information"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
