import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sérgio Monteiro | IAHub360",
  description: "Página oficial de Sérgio Monteiro na IAHub360 – inovação, inteligência artificial e projetos estratégicos.",
  keywords: ["Sérgio Monteiro", "IAHub360", "Inteligência Artificial", "Supply Chain", "Inovação", "Tecnologia", "Automação", "Pesquisa", "Desenvolvimento"],
  authors: [{ name: "Sérgio Monteiro" }],
  openGraph: {
    title: "Sérgio Monteiro | IAHub360",
    description: "Página oficial de Sérgio Monteiro na IAHub360 – inovação, inteligência artificial e projetos estratégicos.",
    url: "https://sergiomonteiro.iahub360.com",
    siteName: "Sérgio Monteiro | IAHub360",
    type: "website",
    images: [
      {
        url: "/assets/cover.jpg",
        width: 1200,
        height: 630,
        alt: "Sérgio Monteiro | IAHub360",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sérgio Monteiro | IAHub360",
    description: "Página oficial de Sérgio Monteiro na IAHub360 – inovação, inteligência artificial e projetos estratégicos.",
    images: ["/assets/cover.jpg"],
  },
  icons: {
    icon: "/assets/favicon-sm.png",
    apple: "/assets/favicon-sm.png",
  },
  other: {
    "twitter:image": "/assets/cover.jpg",
    "og:image": "/assets/cover.jpg",
    "linkedin:image": "/assets/cover.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a0a1a] text-[#e0e0e0]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
