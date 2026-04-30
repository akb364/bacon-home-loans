import siteConfig from "../lib/siteConfig";

export default function Disclaimer({ className = "" }) {
  return (
    <div
      className={`rounded-md border border-slate-200 bg-slate-100 px-5 py-4 text-xs leading-6 text-slate-600 ${className}`}
    >
      Information on this website is for educational purposes only and is not a commitment to lend,
      loan approval, rate quote, or offer of credit. {siteConfig.officerName}, NMLS ID:{" "}
      {siteConfig.nmlsId}, is powered by {siteConfig.brokerageName}. Loan programs, eligibility,
      rates, terms, and assistance options are subject to underwriting, investor guidelines,
      property review, and program availability.
    </div>
  );
}
