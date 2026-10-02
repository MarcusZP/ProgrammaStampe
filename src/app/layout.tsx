import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Navigazione } from "@/components/Navigazione";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Programma Stampe", template: "%s · Programma Stampe" },
  description: "Avvisi, convocazioni e comunicazioni per i condomini amministrati.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex h-full flex-col">
        <Navigazione />
        <main className="flex min-h-0 flex-1 flex-col overflow-auto">{children}</main>
      </body>
    </html>
  );
}
