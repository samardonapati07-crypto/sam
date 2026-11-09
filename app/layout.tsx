import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Interactive multi-agent reasoning demo: Perceive → Plan → Act → Observe → Reflect → Adapt. Customized and maintained by Samar.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: "AAROP - Agentic Loop Live Demo · Samar",
  description,
  authors: [{ name: "Samar", url: "https://github.com/samardonapati07-crypto" }],
  metadataBase: new URL(siteUrl),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "AAROP - Agentic Loop Live Demo · Samar",
    description,
    url: siteUrl,
    siteName: "AAROP · Samar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AAROP - Agentic Loop Live Demo · Samar",
    description,
    images: ["/opengraph-image"],
  },
};

// Set the theme before first paint to avoid a flash of the wrong theme.
const noFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('aarop-theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = stored || system;
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
