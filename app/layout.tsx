import { Syne, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SITE_URL = "https://dev-asim-portfolio.vercel.app";
const DESCRIPTION =
  "Portfolio of Muhammad Asim — Software Engineer at VentureDive & AI Engineer building RAG pipelines, AI agents, and full-stack products like Mohasib (mohasib.online). Next.js · MERN · Python · AWS. Open to remote & Lahore roles.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammad Asim — Software Engineer & AI Engineer",
    template: "%s · Muhammad Asim",
  },
  description: DESCRIPTION,
  applicationName: "Muhammad Asim — Portfolio",
  authors: [{ name: "Muhammad Asim", url: SITE_URL }],
  creator: "Muhammad Asim",
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
    siteName: "Muhammad Asim — Portfolio",
    title: "Muhammad Asim — Software Engineer & AI Engineer",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Asim — Software Engineer & AI Engineer",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Asim",
  url: SITE_URL,
  jobTitle: "Software Engineer & AI Engineer",
  email: "mailto:mazammasim@gmail.com",
  telephone: "+92-343-1611587",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  worksFor: { "@type": "Organization", name: "VentureDive" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Central Punjab (UCP)",
  },
  knowsAbout: [
    "Retrieval-Augmented Generation", "Agentic AI", "System Design", "Next.js",
    "React", "Node.js", "MongoDB", "Python", "AWS", "Docker", "CI/CD",
  ],
  sameAs: [
    "https://github.com/Asim12312",
    "https://www.linkedin.com/in/muhammad-asim-b011852b5",
    "https://mohasib.online",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
