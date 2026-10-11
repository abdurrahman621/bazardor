
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl animate-pulse px-4 py-8">
      <div className="mb-8 grid gap-6 rounded-2xl bg-gray-100 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="h-5 w-32 rounded bg-gray-200" />
          <div className="h-10 w-full max-w-md rounded bg-gray-200" />
          <div className="h-4 w-full max-w-sm rounded bg-gray-200" />
          <div className="h-10 w-36 rounded bg-gray-200" />
        </div>
        <div className="h-48 rounded-xl bg-gray-200" />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-32 rounded-xl border border-gray-100 bg-gray-100 p-4"
          >
            <div className="mb-4 h-5 w-2/3 rounded bg-gray-200" />
            <div className="mb-3 h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-6 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="mb-5 h-8 w-48 rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-64 rounded-xl border border-gray-100 bg-gray-100 p-4"
          >
            <div className="mb-4 h-32 rounded-lg bg-gray-200" />
            <div className="mb-3 h-5 w-2/3 rounded bg-gray-200" />
            <div className="mb-3 h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-6 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
