import Image from "next/image";
import Link from "next/link";


const Hero = () => {
  return (
    <section className="rounded-[22px] border border-[#dfe9e0] bg-[#f8fbf8] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
      <div className="grid items-center gap-8 md:grid-cols-[1.5fr_0.8fr]">
        <div>
          <span className="inline-flex rounded-full bg-[#e1f3e8] px-3 py-1.5 text-sm font-medium text-[#078344]">
            শুক্রবার, ৯ অক্টোবর, ২০২৬
          </span>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-[#202b23] sm:text-4xl lg:text-[42px]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#69736c] sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের
            পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-6 inline-flex items-center rounded-lg bg-[#078747] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#056d39]"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

       <div>
      <Image src="/bazar-hero.png" width={500} height={500} alt="buket"></Image>
       </div>
      </div>
    </section>
  );
};

export default Hero;