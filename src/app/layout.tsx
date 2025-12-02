import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";


// Space Grotesk → primary UI / headings
// JetBrains Mono → code / terminal text
const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Keneni Asefa | Penetration Tester & Bug Bounty Hunter",
  description:
    "Portfolio of Keneni Asefa – Penetration Tester, Bug Bounty Hunter, and cybersecurity professional based in Adama, Ethiopia.",
  metadataBase: new URL("https://www.example.com"),
  openGraph: {
    title: "Keneni Asefa | Penetration Tester & Bug Bounty Hunter",
    description:
      "Securing digital worlds, one vulnerability at a time. Explore experience, projects, and cybersecurity work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
