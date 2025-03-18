import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Understanding Shadow Figures | Comprehensive Guide",
  description:
    "A detailed explanation of shadow figure experiences through scientific and cultural perspectives",
  keywords:
    "shadow figures, shadow people, meditation, pareidolia, hypnagogic hallucinations, spiritual experiences",
  authors: [{ name: "Shadow Figure Research" }],
  openGraph: {
    title: "Understanding Shadow Figures | Comprehensive Guide",
    description:
      "A detailed explanation of shadow figure experiences through scientific and cultural perspectives",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
