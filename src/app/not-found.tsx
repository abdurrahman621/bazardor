import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-extrabold text-emerald-700">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mt-2 max-w-md text-sm text-gray-600">
        দুঃখিত, তুমি যে পেজটি খুঁজছ সেটি পাওয়া যাচ্ছে না।
        ঠিকানা যাচাই করো অথবা হোম পেজে ফিরে যাও।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
      >
        হোম পেজে ফিরে যাও
      </Link>
    </main>
  );
}
