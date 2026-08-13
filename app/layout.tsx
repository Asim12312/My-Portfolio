import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { PROFILE, PROJECTS, SITE_URL, SKILL_GROUPS } from "@/lib/content";

/* Inter Tight for headings, Inter for reading, JetBrains Mono for code.
   Space Grotesk was previously carrying body copy — it's a display face, and
   it was the main reason long paragraphs were tiring to read. */
const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const DESCRIPTION =
  "Muhammad Asim — Software Engineer at VentureDive and AI Engineer. I build RAG pipelines, AI agents and full-stack products, including Mohasib, a live FBR-compliant invoicing SaaS. Next.js · Node.js · Python · AWS. Open to remote and Lahore roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name} — Software Engineer & AI Engineer`,
    template: `%s · ${PROFILE.name}`,
  },
  description: DESCRIPTION,
  applicationName: `${PROFILE.name} — Portfolio`,
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  keywords: [
    "Muhammad Asim", "Software Engineer", "AI Engineer", "Agentic AI", "RAG",
    "Retrieval-Augmented Generation", "Next.js", "MERN Stack", "Full-Stack Developer",
    "React Developer", "Node.js", "Python", "AWS", "System Design", "Lahore",
    "Pakistan", "VentureDive", "Mohasib", "hire software engineer", "remote developer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${PROFILE.name} — Portfolio`,
    title: `${PROFILE.name} — Software Engineer & AI Engineer`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — Software Engineer & AI Engineer`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
  colorScheme: "light dark",
};

/* A @graph rather than a single node, so Google can connect the person to the
   site and to each case study instead of treating them as unrelated pages. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PROFILE.name,
      url: SITE_URL,
      jobTitle: PROFILE.title,
      email: `mailto:${PROFILE.email}`,
      telephone: PROFILE.phoneRaw,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      worksFor: { "@type": "Organization", name: "VentureDive", url: "https://venturedive.com" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: PROFILE.education.school,
      },
      knowsAbout: SKILL_GROUPS.flatMap((g) => g.tags),
      sameAs: [PROFILE.links.github, PROFILE.links.linkedin, PROFILE.links.live],
      seeks: {
        "@type": "Demand",
        name: PROFILE.availability.label,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${PROFILE.name} — Portfolio`,
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    ...PROJECTS.filter((p) => p.featured).map((p) => ({
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/work/${p.slug}#project`,
      name: p.title,
      headline: `${p.title} — ${p.tagline}`,
      description: p.desc,
      url: `${SITE_URL}/work/${p.slug}`,
      author: { "@id": `${SITE_URL}/#person` },
      keywords: p.pills.join(", "),
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        {/* Cookieless page analytics. Inert in development and outside Vercel,
            so local runs and other hosts stay unaffected. Enable it in the
            project's Analytics tab after the first deploy. */}
        <Analytics />
      </body>
    </html>
  );
}
