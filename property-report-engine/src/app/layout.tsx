import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Property Report Engine | Bacon Home Loans",
  description: "Property analysis and Realtor marketing reports from Bacon Home Loans.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
