import Head from "next/head";
import siteConfig from "../lib/siteConfig";

export default function Seo({ title, description, path = "/" }) {
  const pageTitle = title
    ? `${title} | ${siteConfig.brandName}`
    : `Arizona Mortgage Loan Officer | ${siteConfig.brandName}`;
  const canonicalUrl = `${siteConfig.siteUrl}${path === "/" ? "" : path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    areaServed: "Arizona",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: "AZ",
      addressCountry: "US"
    },
    employee: {
      "@type": "Person",
      name: siteConfig.officerName,
      identifier: `NMLS ID ${siteConfig.nmlsId}`,
      jobTitle: "Mortgage Loan Officer"
    },
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.brokerageName
    }
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteConfig.brandName} />
      <meta name="twitter:card" content="summary_large_image" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
