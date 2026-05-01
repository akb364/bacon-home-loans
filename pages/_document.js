import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname
                  });
                `
              }}
            />
          </>
        ) : null}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
