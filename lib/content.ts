/* ─────────────────────────────────────────────────────────────
   SINGLE SOURCE OF TRUTH for every fact on this site.
   Edit here — the homepage, case-study pages, sitemap, JSON-LD
   and OG images all read from this file.

   ⚠️ BEFORE SHARING WITH RECRUITERS
   Two things here still need your input:
   1. ROLES[1].period — set the real start/end months for the mentored
      client work. It currently reads "Aug 2024 — Jan 2026 · 1.5 years".
   2. Every value in PROJECTS[].impact should be a number you can defend
      in an interview. Anything you can't back up is worse than silence.
   ───────────────────────────────────────────────────────────── */

export const SITE_URL = "https://dev-asim-portfolio.vercel.app";

export const PROFILE = {
  name: "Muhammad Asim",
  initials: "MA",
  title: "Software Engineer & AI Engineer",
  shortTitle: "Software Engineer · AI Engineer",
  location: "Lahore, Pakistan",
  email: "mazammasim@gmail.com",
  phone: "+92 343 1611587",
  phoneRaw: "+923431611587",
  resume: "/assets/resume.pdf",
  resumeFilename: "MuhammadAsim_Resume.pdf",
  availability: {
    open: true,
    label: "Open to Software / AI Engineer roles",
    detail: "Remote worldwide · on-site Lahore · full-time or contract",
    responseTime: "Replies within 24 hours",
  },
  links: {
    github: "https://github.com/Asim12312",
    linkedin: "https://www.linkedin.com/in/muhammad-asim-b011852b5",
    whatsapp: "https://wa.me/923431611587",
    live: "https://mohasib.online",
  },
  education: {
    degree: "BS Software Engineering",
    school: "University of Central Punjab (UCP)",
    grade: "3.61 / 4.00 CGPA",
    gradeShort: "3.61 CGPA",
    location: "Lahore",
  },
} as const;

/* ── The 20-second scan. Four numbers, each one defensible in an interview. ── */
export const STATS = [
  {
    value: "2",
    label: "years building",
    sub: "client work + industry",
  },
  {
    value: "3",
    label: "apps deployed",
    sub: "mohasib · chefos · intellibid",
  },
  {
    value: "4",
    label: "case studies",
    sub: "written up in full",
  },
  {
    value: "3.61",
    label: "cgpa / 4.0",
    sub: "bs software eng · ucp",
  },
] as const;

/* ── Experience ── */
export type Role = {
  n: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  badge?: string;
  summary: string;
  points: string[];
  pills: string[];
};

export const ROLES: Role[] = [
  {
    n: "01",
    role: "Software Engineer Intern",
    company: "VentureDive",
    companyUrl: "https://venturedive.com",
    period: "Feb 2026 — Present",
    location: "Lahore, PK",
    badge: "current",
    summary:
      "Shipping AI-powered features inside production codebases alongside senior engineers.",
    points: [
      "Build and ship full-stack features in production Next.js/Node services, from ticket to code review to release.",
      "Implement retrieval-augmented generation (RAG) pipelines — chunking, embedding, vector search and grounded prompting — so LLM answers cite real source documents instead of hallucinating.",
      "Work inside CI/CD workflows: automated checks on every pull request, reviewed commits, and staged deploys.",
      "Contribute to system-design discussions on data modelling, service boundaries and API contracts.",
    ],
    pills: ["RAG", "System Design", "CI/CD", "Next.js", "Node.js", "Code Review"],
  },
  {
    n: "02",
    /* Duration rather than a month range, by choice. This is the merged, honest
       version of what were previously two overlapping "3+ years freelance"
       entries: one role, eighteen months, working on a mentor's client projects.
       If you later want exact months here, set them in both `period` and your
       LinkedIn at the same time — recruiters compare the two. */
    role: "Full-Stack & AI Developer — client projects",
    company: "Contract work under an independent mentor",
    period: "1.5 years",
    location: "Remote, Lahore",
    summary:
      "Built and delivered web and AI work on real client projects, mentored by an experienced developer who owned the client relationships.",
    points: [
      "Shipped responsive full-stack web apps with React, Next.js, Node, Express and MongoDB against real client requirements and deadlines.",
      "Built AI automation with Python and LLM APIs — chatbots and agents that take actions in a workflow rather than only answering questions.",
      "Handled the parts that decide whether software survives contact with users: REST API design, auth and role-based access, third-party integrations, SEO and performance work.",
      "Deployed backend services on AWS and connected them to client systems through APIs and webhooks.",
      "Worked to review: my mentor set the requirements, checked the code, and held the delivery bar — which is where most of what I know about writing maintainable code came from.",
    ],
    pills: ["React", "Next.js", "Node.js", "MongoDB", "Python", "LLM APIs", "AWS"],
  },
];

/* Projects and their case studies live in their own file — that data is
   long enough that keeping it here buried everything else. */
export * from "./projects";

/* ── Stack ──
   Only technologies that appear in shipped work on this site. A stack list
   that outruns the case studies is the first thing an interviewer probes. */
export const SKILL_GROUPS = [
  {
    key: "ai",
    title: "AI engineering",
    tags: ["RAG pipelines", "Autonomous agents", "LLM APIs", "Vector search", "Prompt design", "Python"],
  },
  {
    key: "fe",
    title: "Frontend",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Three Fiber", "Accessibility"],
  },
  {
    key: "be",
    title: "Backend",
    tags: ["Node.js", "Express", "REST API design", "Socket.io", "JWT & OAuth", "Webhooks"],
  },
  {
    key: "db",
    title: "Data",
    tags: ["MongoDB", "Mongoose", "Redis", "MySQL", "Indexing", "Schema design"],
  },
  {
    key: "ops",
    title: "Delivery & cloud",
    tags: ["Docker", "GitHub Actions", "CI/CD", "AWS", "Nginx", "Git Flow"],
  },
  {
    key: "int",
    title: "Integrations",
    tags: ["Stripe", "Safepay", "PRAL / FBR API", "Cloudinary", "Google Generative AI", "WhatsApp API"],
  },
] as const;

/* ── How I work ──────────────────────────────────────────────
   The mature version of an "inspirational quote" section. Decorative
   quotations from famous engineers say nothing about the candidate;
   stated positions are checkable, and an interviewer can push on them.
   Every line below is defensible from the case studies.
   ───────────────────────────────────────────────────────────── */
export const PRINCIPLES = [
  {
    title: "Correctness lives on the server",
    body:
      "Hidden buttons are a courtesy; authorisation is a server concern. Every interface I have shipped re-checks permissions where the query is built, because a boundary enforced in the client is not a boundary.",
  },
  {
    title: "Name the trade-off, then take it",
    body:
      "Every architectural choice costs something. I would rather write down what a decision buys and what it forfeits than pretend a design has no downside — the case studies on this site are organised around exactly that.",
  },
  {
    title: "Design for the failure, not the demo",
    body:
      "The interesting work in a regulated or money-handling system is what happens when the other side declines. Recoverable states, persisted exchanges and explicit status beat an optimistic path that only reads well in a screenshot.",
  },
  {
    title: "Build second, buy first",
    body:
      "Payments, identity and compliance primitives are solved problems with real consequences for getting them wrong. The strongest decision in two of these projects was choosing not to build something.",
  },
  {
    title: "Write it down",
    body:
      "If a decision cannot be explained in a paragraph, it is not yet understood. Documenting the reasoning has caught more of my own mistakes than any tool I have used.",
  },
] as const;

/* ── Colophon ──
   How this site is built. Small, but it answers the question an engineer
   reading another engineer's site always has. */
export const COLOPHON = {
  stack: "Next.js 16 · React 19 · TypeScript · Tailwind CSS v4",
  type: "Inter Tight · Inter · JetBrains Mono",
  hosting: "Statically prerendered, deployed on Vercel",
  source: "https://github.com/Asim12312/My-Portfolio",
} as const;

/* ── Nav ── */
export const NAV_LINKS = [
  { href: "/#about", hash: "about", label: "About" },
  { href: "/#experience", hash: "experience", label: "Experience" },
  { href: "/#work", hash: "work", label: "Work" },
  { href: "/#approach", hash: "approach", label: "Approach" },
  { href: "/#contact", hash: "contact", label: "Contact" },
] as const;
