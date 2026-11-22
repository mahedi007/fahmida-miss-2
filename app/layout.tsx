import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionConfig } from "motion/react";
import type { CSSProperties } from "react";
import "./globals.css";
import { getSettings } from "@/lib/content";
import { contactHref, isExternal, isFile } from "@/lib/links";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "./fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Inter-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Inter-SemiBoldItalic.woff2", weight: "600", style: "italic" },
    { path: "./fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Inter-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/Inter-Black.woff2", weight: "900", style: "normal" },
    { path: "./fonts/Inter-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
});

const s = getSettings();

export const metadata: Metadata = {
  metadataBase: (s.site.url || process.env.CF_PAGES_URL) ? new URL((s.site.url || process.env.CF_PAGES_URL)!) : undefined,
  title: s.site.title,
  description: s.site.description,
  authors: [{ name: `${s.site.firstName} ${s.site.lastName}` }],
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
  openGraph: { type: "profile", title: s.site.title, description: s.site.description, images: s.site.ogImage ? [s.site.ogImage] : [] },
  twitter: { card: "summary_large_image", title: s.site.title, description: s.site.description, images: s.site.ogImage ? [s.site.ogImage] : [] },
};

export const viewport: Viewport = { themeColor: "#0f0f0f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const contact = contactHref(s);
  const btnHref = s.headerButton?.url || contact;
  const name = `${s.site.firstName} ${s.site.lastName}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name.replace(/\b(\w)(\w*)/g, (_, a, b) => a + b.toLowerCase()),
    jobTitle: s.site.jobTitle,
    description: s.site.description,
    address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
    worksFor: s.site.worksFor ? { "@type": "EducationalOrganization", name: s.site.worksFor } : undefined,
    sameAs: [s.contact.linkedin].filter(Boolean),
  };
  const style = { "--accent": s.theme?.accent || "#dc2626", "--accent-deep": s.theme?.accentDeep || "#7f1d1d" } as CSSProperties;

  return (
    <html lang="en" className={inter.variable} style={style}>
      <body className="font-sans antialiased" id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionConfig reducedMotion="user">
          <SmoothScroll enabled={s.theme?.smoothScroll !== false} />
          <Header
            firstName={s.site.firstName} lastName={s.site.lastName} nav={s.nav || []}
            buttonLabel={s.headerButton?.label || "Say Hello"} buttonHref={btnHref} buttonExternal={isExternal(btnHref) || isFile(btnHref)}
            linkedin={s.contact.linkedin || undefined} emailHref={s.contact.email ? `mailto:${s.contact.email}` : undefined}
          />
          <main className="flex-1">{children}</main>
          <Footer s={s} />
        </MotionConfig>
      </body>
    </html>
  );
}
