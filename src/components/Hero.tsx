"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-emerald-50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        {/* Left Content */}
        <div>
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
            🇧🇩 আপনার প্রতিদিনের বাজারদর
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            বাজারের সঠিক দাম,
            <span className="mt-2 block text-emerald-700">
              এখন আপনার হাতেই
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            চাল, ডাল, মাছ, মাংস, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের
            প্রতিদিনের দাম জানুন। বাজারে যাওয়ার আগেই জেনে নিন
            কোন পণ্যের দাম বাড়ছে আর কোনটির দাম কমছে।
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="rounded-xl bg-emerald-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800" href="#সব-পণ্য">
              সব পণ্য দেখুন →
            </Link>

            <Link className="rounded-xl border border-emerald-200 bg-white px-6 py-3.5 font-bold text-emerald-800 transition hover:bg-emerald-100" href="/category/chal">
              চালের দাম দেখুন
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <span>✓ প্রতিদিনের দাম</span>
            <span>✓ দাম বাড়া-কমার হিসাব</span>
            <span>✓ বিভিন্ন বাজারের তথ্য</span>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-4 rounded-[2rem] bg-emerald-200 blur-2xl" />

          <div className="relative rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  আজকের বাজার
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
                  নিত্যপণ্যের দাম
                </h2>
              </div>

              <span className="rounded-2xl bg-emerald-100 p-3 text-3xl">
                🛒
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-orange-50 p-5">
                <span className="text-4xl">🍚</span>
                <p className="mt-3 font-bold text-gray-800">চাল</p>
                <p className="mt-1 text-sm text-gray-500">
                  প্রতিদিনের দাম
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-5">
                <span className="text-4xl">🐟</span>
                <p className="mt-3 font-bold text-gray-800">মাছ</p>
                <p className="mt-1 text-sm text-gray-500">
                  বাজারের আপডেট
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-5">
                <span className="text-4xl">🥬</span>
                <p className="mt-3 font-bold text-gray-800">সবজি</p>
                <p className="mt-1 text-sm text-gray-500">
                  দাম বাড়া-কমা
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-5">
                <span className="text-4xl">🥚</span>
                <p className="mt-3 font-bold text-gray-800">ডিম</p>
                <p className="mt-1 text-sm text-gray-500">
                  নিত্যপ্রয়োজনীয় পণ্য
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-emerald-700 p-4 text-white">
              <p className="font-bold">সচেতন বাজার করুন</p>
              <p className="mt-1 text-sm text-emerald-100">
                দাম জেনে কিনুন, সাশ্রয়ী থাকুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;