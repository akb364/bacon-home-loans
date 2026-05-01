import { useEffect } from "react";
import "../styles/globals.css";
import { pageview } from "../lib/gtag";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);

    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
