"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const categories = [
    { name: "সব পণ্য", slug: "" },
    { name: "চাল", slug: "chal" },
    { name: "মসলা", slug: "mosla" },
    { name: "সবজি", slug: "sobji" },
    { name: "মাছ", slug: "mach" },
    { name: "মাংস", slug: "mangsho" },

];

const Navbar = () => {
    const pathname = usePathname();

    const today = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date());



    return (

        <header className=" sticky top-0 z-50 border-b border-emerald-100 bg-white shadow-sm">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link href="/" className="flex items-center gap-3 ">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-800 text-2xl"> 🛒

                        </span>
                        <span>
                            <span className="block text-xl font-extrabold text-emerald-900 sm:text-2xl">
                                বাজার দর
                            </span>
                            <span className="block text-xs text-gray-500">
                                {today}
                            </span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 ">
                        <Link href="/signin" className="rounded-lg border border-emerald-700 px-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 sm:px-4">
                            সাইন ইন
                        </Link>
                        <Link href="/signup" className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:px-4">
                            সাইন আপ
                        </Link>

                    </div>

                </div>

                <nav
                    aria-label="পণ্যের ক্যাটাগরি"
                    className="flex gap-2 overflow-x-auto border-t border-gray-100 pt-3"
                >

                    {
                        categories.map((category) => {
                            const href = category.slug ?
                                `/category/${category.slug}`
                                : "/";

                            const isActive = category.slug === "" ?
                                pathname === "/" :
                                pathname === href ||
                                pathname.startsWith(`${href}/`)
                            return (
                                <Link key={category.name} href={href}
                                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${isActive
                                            ? "bg-emerald-700 text-white"
                                            : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                                        }`}
                                >
                                    {category.name}
                                </Link>
                            )
                        })
                    }


                </nav>

            </div>
        </header>
    )
}
export default Navbar

