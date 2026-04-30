import Link from "next/link";
import { useRouter } from "next/router";
import siteConfig from "../lib/siteConfig";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/first-time-home-buyer-programs-arizona", label: "First-Time Buyers" },
  { href: "/fha-loans-arizona", label: "FHA Loans" },
  { href: "/conventional-loans-arizona", label: "Conventional" },
  { href: "/va-loans-arizona", label: "VA Loans" },
  { href: "/down-payment-assistance-arizona", label: "Down Payment Help" },
  { href: "/contact", label: "Contact" }
];

function NavLink({ href, label }) {
  const router = useRouter();
  const active = router.pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
        active
          ? "bg-saguaro-700 text-white"
          : "text-slate-700 hover:bg-slate-100 hover:text-saguaro-700"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label={siteConfig.brandName}>
            <span className="grid h-11 w-11 place-items-center rounded-md bg-saguaro-700 text-lg font-black text-white">
              BH
            </span>
            <span>
              <span className="block text-base font-black tracking-tight text-ink">
                {siteConfig.brandName}
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-desert-600">
                Powered by {siteConfig.brokerageName}
              </span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
          <div>
            <p className="text-lg font-black text-ink">{siteConfig.brandName}</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Arizona mortgage guidance from {siteConfig.officerName}, NMLS ID:{" "}
              {siteConfig.nmlsId}. Powered by {siteConfig.brokerageName}.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Office</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {siteConfig.city}, {siteConfig.state}
              <br />
              Serving borrowers statewide
            </p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Contact</p>
            <div className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
              <a className="font-semibold text-saguaro-700" href={`tel:${siteConfig.phone}`}>
                {siteConfig.phoneDisplay}
              </a>
              <br />
              <a className="font-semibold text-saguaro-700" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-[0_-12px_30px_rgba(23,32,51,0.12)] md:hidden">
        <Link
          href="/contact"
          className="block rounded-md bg-saguaro-700 px-5 py-3 text-center text-sm font-black text-white"
        >
          See What You Qualify For
        </Link>
      </div>
    </div>
  );
}
