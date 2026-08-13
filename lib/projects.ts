/* ── Projects & case studies ──────────────────────────────────
   `featured: true` projects get a full /work/[slug] case study.
   Each one follows the structure hiring managers actually scan:
   Context → Problem → Approach → Architecture → Trade-offs → Impact.

   The four featured studies are deliberately comparable in depth. A
   portfolio that writes three pages about one project and one line about
   the rest reads as a portfolio with one project.

   ⚠️ SOURCING NOTE
   Everything below is drawn from the deployed products and their
   repositories. Two cautions before you publish:
   · IntelliBid's marketing site displays figures such as "120,000+
     members" and "$48M+ bid volume". Those are seeded demo data, not
     achievements, and they are deliberately excluded here. Never let
     them onto a résumé — a single follow-up question would expose them.
   · `impact` entries describe capabilities that demonstrably exist.
     Where you can substitute a measured number you can defend in an
     interview, do — a measurement always outranks a capability.
   ───────────────────────────────────────────────────────────── */

export type CaseStudySection = { heading: string; body: string[] };

/** A layered block diagram. Each tier is a column on desktop and a row on
 *  mobile, with flow implied left-to-right (or top-to-bottom) between them.
 *  Deliberately simple: a diagram that always renders tidily beats an
 *  auto-laid-out graph that sometimes doesn't. */
export type Diagram = {
  caption: string;
  tiers: { label: string; nodes: string[]; accent?: boolean }[];
  /** Side concerns that touch several tiers rather than sitting in one. */
  crosscutting?: string[];
};

/** Screenshots. Files live in /public/assets/shots/.
 *  The case-study template renders this block only when `media` is present,
 *  so a project with no screenshots shows nothing rather than an empty frame. */
export type Media = {
  src: string;
  alt: string;
  caption: string;
  /** Intrinsic pixel dimensions — required to reserve space and avoid CLS. */
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  n: string;
  title: string;
  tagline: string;
  desc: string;
  role: string;
  timeline: string;
  team: string;
  status: "Live in production" | "Deployed demo" | "Shipped" | "Open source";
  pills: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  /* case study */
  context?: string;
  problem?: string[];
  approach?: CaseStudySection[];
  architecture?: { label: string; value: string }[];
  diagram?: Diagram;
  media?: Media[];
  decisions?: { choice: string; why: string }[];
  impact?: { value: string; label: string }[];
  learned?: string[];
};

export const PROJECTS: Project[] = [
  /* ─────────────────────────── 01 ─────────────────────────── */
  {
    slug: "mohasib",
    n: "01",
    title: "Mohasib",
    tagline: "Statutory e-invoicing platform for Pakistani businesses and tax consultants",
    desc:
      "A production SaaS platform that reduces Pakistan's mandatory FBR digital-invoicing obligation to a two-click workflow. Invoices are transmitted to PRAL in real time and return a government-issued 22-digit invoice number and QR payload; bulk Excel and CSV imports are validated in full before a single row reaches the regulator.",
    role: "Sole engineer — product definition, architecture, implementation, deployment",
    timeline: "2025 — present · actively maintained",
    team: "Solo",
    status: "Live in production",
    pills: ["Next.js", "TypeScript", "Node.js", "MongoDB", "PRAL / FBR API", "Multi-tenant", "PWA", "i18n"],
    githubUrl: "https://github.com/Asim12312/Mohasib",
    liveUrl: "https://mohasib.online",
    media: [
      {
        src: "/assets/shots/mohasib_penalty_calc.png",
        alt:
          "Penalty calculator showing a PKR 250,000 sales-tax input producing a PKR 50,000 estimated exposure, with the flat fine and the two-percent calculation itemised side by side.",
        caption:
          "The penalty calculator encodes the statute directly: Section 33 of the Sales Tax Act 1990 read with Chapter XIV of the Sales Tax Rules 2006 and the 2025 SROs. It shows both the flat fine and the percentage calculation, then applies whichever is higher — so the number is auditable rather than asserted. No account required.",
        width: 1887,
        height: 903,
      },
      {
        src: "/assets/shots/mmohasub_dashboard.png",
        alt:
          "Consultant command centre listing clients by health status, today's urgent filings, and a week-ahead table of obligations with due dates.",
        caption:
          "The consultant view is organised around deadlines rather than documents. Clients carry a health state — healthy, watch, at risk — derived from what is due and how close it is, so a firm managing many businesses sees exposure before it becomes a penalty.",
        width: 1892,
        height: 891,
      },
      {
        src: "/assets/shots/mohasib_pwa.png",
        alt: "Browser prompt offering to install Mohasib as an application.",
        caption:
          "Installable as a PWA. Tax work happens on whatever device is to hand during a client visit, so the product needed to leave the browser tab without a second codebase.",
        width: 572,
        height: 225,
      },
    ],
    featured: true,
    context:
      "Chapter XIV of Pakistan's Sales Tax Rules 2006 obliges sales-tax-registered businesses to transmit every sales invoice electronically to PRAL and to carry the government-issued invoice number and QR code on the document. Non-compliance carries penalties under Section 33 of the Sales Tax Act 1990. In practice, most small businesses were meeting the obligation by re-keying invoices into a government portal one at a time.",
    problem: [
      "An invoice has no legal standing until the regulator acknowledges it, so the integration cannot be treated as fire-and-forget. A silently failed transmission produces a document the business is not permitted to issue.",
      "The PRAL schema is strict and its rejection messages are written for integrators rather than end users. A single malformed tax field invalidates the entire payload.",
      "Businesses issue invoices in batches out of existing spreadsheets. A one-at-a-time form was never going to meet the actual workload.",
      "Tax consultants administer many client businesses from a single login, which makes tenant isolation a launch requirement rather than something to retrofit later.",
    ],
    approach: [
      {
        heading: "Treat the regulator as an observable system boundary",
        body: [
          "All PRAL communication passes through a single integration layer rather than being distributed across controllers. Every request and response is persisted against its invoice, so a rejection six months old remains fully reconstructible — which matters because the underlying records are subject to audit.",
          "Invoices advance through an explicit state machine — draft, validated, transmitted, acknowledged, failed. A partially submitted invoice can therefore never be mistaken for a legally issued one, and failed transmissions remain recoverable rather than disappearing.",
        ],
      },
      {
        heading: "Validate ahead of the network, not after it",
        body: [
          "The regulator's schema is mirrored as a local validation layer, so structural and tax-calculation errors surface before any request is made. Opaque government error codes become field-level messages a business owner can act on directly.",
          "Bulk Excel and CSV import applies that same validation across every row and reports all failures together, so a 500-row upload is corrected in one pass rather than through 500 sequential rejections.",
        ],
      },
      {
        heading: "Provide a sandbox so nobody rehearses on live tax records",
        body: [
          "A sandbox environment mirrors production against the regulator's test endpoints. New users — and every new feature — are exercised against realistic responses before touching a real filing.",
          "The same principle produced two public utilities that require no account at all: a penalty calculator and an invoice-format validator. Both let a prospective user verify their data against the rules before committing to the product.",
        ],
      },
      {
        heading: "Model tenancy around the consultant, not only the business",
        body: [
          "The data model treats the business as the tenant and the user as a member holding a role, which allows a consultant to move between client businesses without ever crossing a tenant boundary.",
          "Scoping is enforced where queries are constructed rather than in the interface, so a missing filter fails closed instead of leaking one client's tax records into another's view.",
          "Firms are not single-operator businesses, so staff carry roles of their own — principal, manager, associate — and managers and associates see only the clients assigned to them. Delegation inside a firm is therefore a permission boundary rather than a shared password.",
        ],
      },
      {
        heading: "Organise the consultant's view around deadlines, not documents",
        body: [
          "A consultant's actual job is not issuing invoices; it is not missing filings. The command centre inverts the usual document-centric layout and leads with what is due — today's urgent items first, then the week ahead, with each obligation named and dated.",
          "Every client carries a derived health state — healthy, watch, at risk — computed from outstanding obligations and their proximity. That turns a list of clients into a triage queue, which is what a firm carrying dozens of them actually needs.",
        ],
      },
    ],
    architecture: [
      { label: "Frontend", value: "Next.js App Router · TypeScript · server components for invoice listings" },
      { label: "Backend", value: "Node.js REST API · role-based authorisation · full request/response audit log" },
      { label: "Database", value: "MongoDB · tenant-scoped collections · indexed on business and invoice date" },
      { label: "Regulator", value: "PRAL / FBR e-invoicing API across separate sandbox and production endpoints" },
      { label: "Primary flow", value: "Create → local validation → PRAL transmission → 22-digit IRN and QR payload" },
      { label: "Bulk flow", value: "Excel/CSV upload → row-level validation report → batched transmission" },
      { label: "Firm roles", value: "Principal, manager, associate — client visibility scoped per member, invitation by email" },
      { label: "Obligations", value: "Deadline calendar per client with derived health states — healthy, watch, at risk" },
      { label: "Public tools", value: "Penalty calculator and invoice-format validator, no account required" },
      { label: "Delivery", value: "Installable PWA · English and Urdu interface" },
      { label: "Pricing model", value: "Three published tiers — free allowance, per-business subscription, per-client consultant plan" },
    ],
    diagram: {
      caption:
        "Every path to the regulator passes through one integration layer, so validation, retry and the audit trail exist in exactly one place.",
      tiers: [
        { label: "Clients", nodes: ["Invoice form", "Excel / CSV import", "Consultant command centre", "Public tools (no account)"] },
        { label: "Application", nodes: ["Next.js App Router", "Tenant scoping", "Firm roles & assignment", "Obligation calendar"] },
        { label: "Compliance core", nodes: ["Local schema validation", "Invoice state machine", "PRAL integration layer"], accent: true },
        { label: "Persistence", nodes: ["MongoDB (tenant-scoped)", "Request/response audit log"] },
        { label: "Regulator", nodes: ["PRAL sandbox", "PRAL production"] },
      ],
      crosscutting: ["Authentication & authorisation", "Structured error reporting"],
    },
    decisions: [
      {
        choice: "Persist the complete regulator exchange rather than only its outcome",
        why:
          "Tax records are auditable. When a client asks why an invoice was rejected months earlier, an answer has to exist. Storage is inexpensive; an unanswerable compliance question is not.",
      },
      {
        choice: "Mirror the government schema locally instead of relying on remote validation",
        why:
          "A network round trip per validation error would have made bulk import unusable and would have surfaced raw regulator error codes to non-technical users.",
      },
      {
        choice: "An explicit state machine in place of an `isSubmitted` boolean",
        why:
          "A boolean cannot express 'transmitted but not yet acknowledged'. In a compliance product that ambiguity is a legal exposure, not a user-experience detail.",
      },
      {
        choice: "Publish free, unauthenticated compliance tools",
        why:
          "The penalty calculator and format validator answer the question a prospective customer actually has before they will trust the product with a filing. They also cost almost nothing to run.",
      },
    ],
    impact: [
      { value: "Live", label: "in production, pre-revenue" },
      { value: "Bulk", label: "spreadsheet import replaces sequential entry" },
      { value: "Multi-client", label: "one consultant login across many businesses" },
      { value: "Sandbox", label: "rehearsal path before any real filing" },
    ],
    learned: [
      "Integrating with a regulator is predominantly a reliability and auditability problem rather than a coding one. Almost all of the substantive work sat in what happens when the other side declines.",
      "Compliance software operates under a different failure budget from ordinary CRUD. 'Mostly working' is not a passing grade when the output is a legal instrument.",
      "Validating locally against a mirrored schema was the single change that made bulk import viable at all.",
    ],
  },

  /* ─────────────────────────── 02 ─────────────────────────── */
  {
    slug: "chefos",
    n: "02",
    title: "ChefOS",
    tagline: "Restaurant operating system — QR ordering, kitchen display, inventory and payments",
    desc:
      "An all-in-one platform that replaces the paper ticket. Diners order from a scan-to-order QR menu with interactive 3D dish previews; orders reach a Kitchen Display System over WebSockets; inventory decrements as dishes are fired; and payments settle through Stripe or Safepay without staff leaving the till.",
    role: "Sole engineer — real-time architecture, authorisation model, payments, frontend",
    timeline: "2025 — 2026",
    team: "Solo",
    status: "Live in production",
    pills: ["React 19", "Node.js", "Socket.io", "MongoDB", "Redis", "Stripe", "React Three Fiber"],
    githubUrl: "https://github.com/Asim12312/ChefOS",
    liveUrl: "https://chefos.pro",
    media: [
      {
        src: "/assets/shots/chefos_live_orders.png",
        alt:
          "Live orders board with pending, preparing and requests columns, above counters for active orders, estimated revenue, items needing attention and pending requests.",
        caption:
          "The live orders board is the screen the kitchen actually watches. Tickets move between columns as staff act on them, pushed over Socket.io rather than polled — shown here on a quiet account, so the columns are empty.",
        width: 1906,
        height: 892,
      },
      {
        src: "/assets/shots/chefos_menu.png",
        alt:
          "Menu management screen showing a dish card with price, preparation time, calorie count, stock level and a visibility toggle, above category filters.",
        caption:
          "Menu items carry the operational data the kitchen needs — prep time, stock level, visibility — not just a price. Hiding a dish is one toggle, which matters when an ingredient runs out mid-service.",
        width: 1898,
        height: 906,
      },
      {
        src: "/assets/shots/chefos_qr.png",
        alt:
          "QR code management screen showing a generated code for an indoor table with a four-person capacity and a download action.",
        caption:
          "Each table gets its own QR code, so a scan carries table identity into the order. That is what lets a diner order without an account while the kitchen still knows where the food goes.",
        width: 1918,
        height: 898,
      },
    ],
    featured: true,
    context:
      "A restaurant service runs on paper tickets and shouted corrections. The counter takes an order, someone carries it to the pass, and stock is reconciled at closing — if at all. The predictable results are duplicated orders, dishes sold after their ingredients ran out, and no dependable picture of the current state of service.",
    problem: [
      "Three audiences — diners, floor staff and the kitchen — need three different views of the same live data, and they are all looking at it simultaneously on separate devices.",
      "Request/response polling is the wrong shape for a kitchen. An order that surfaces thirty seconds late is an order that leaves the pass late.",
      "A diner ordering from their own phone is an untrusted client on an unmanaged device, which makes server-side authorisation the only meaningful control.",
      "A restaurant is not a DevOps team. Deployment, secrets and third-party credentials all had to be someone else's problem once installed.",
    ],
    approach: [
      {
        heading: "WebSockets for state that changes underneath the user",
        body: [
          "Order, kitchen and inventory state is pushed over Socket.io rather than polled, with clients subscribing only to the channels their role requires — the Kitchen Display System does not pay to receive billing traffic.",
          "The server remains the single source of truth. Clients render what they are told rather than computing authoritative state locally, which is what keeps several simultaneously open screens from drifting apart during a rush.",
        ],
      },
      {
        heading: "Scan-to-order, with the menu as the product surface",
        body: [
          "Each table carries a QR code resolving to a mobile-first menu, so the diner's own device becomes the ordering terminal and no hardware has to be bought or maintained.",
          "Dishes can carry interactive 3D previews rendered with React Three Fiber. It is the one piece of deliberate spectacle in the product, and it exists because a photograph cannot convey plating the way a rotatable model can.",
          "Google's Generative AI SDK backs dish recommendations, using what is already in the cart and what is actually in stock rather than a static 'popular items' list.",
        ],
      },
      {
        heading: "Authorisation on the server, caching in Redis",
        body: [
          "Sessions are issued as JWTs, with Google OAuth through Passport.js as an alternative sign-in path for staff. Every protected route and socket event re-checks the role server-side; the interface hides what a role cannot do purely as a courtesy.",
          "Redis absorbs the read-heavy paths — menu, stock levels, session lookups — so that a dinner rush does not translate directly into database load.",
        ],
      },
      {
        heading: "Two payment processors, because one is not enough locally",
        body: [
          "Stripe covers international cards; Safepay covers domestic Pakistani rails. Both sit behind one internal payments interface, so the ordering flow neither knows nor cares which processor settles a given transaction.",
          "Subscription billing for the restaurants themselves runs through the same abstraction, which meant the recurring-revenue path did not require a second integration.",
        ],
      },
    ],
    architecture: [
      { label: "Frontend", value: "React 19 · Tailwind CSS v4 · React Router v6 · Socket.io client · React Three Fiber" },
      { label: "Backend", value: "Node.js + Express (MVC) · Helmet · CORS · JWT · Passport.js" },
      { label: "Realtime", value: "Socket.io channels scoped per role — kitchen, floor, administration" },
      { label: "Data", value: "MongoDB with Mongoose for persistence · Redis for caching and sessions" },
      { label: "Payments", value: "Stripe and Safepay behind a single internal payments interface" },
      { label: "Services", value: "Cloudinary for media · Google Generative AI for recommendations · WhatsApp and voice APIs" },
      { label: "Roles", value: "Owner/admin · restaurant staff · diner (unauthenticated, QR-scoped)" },
    ],
    diagram: {
      caption:
        "Reads are absorbed by Redis; writes go through Express and fan back out over Socket.io, so every open screen converges on server state rather than its own.",
      tiers: [
        { label: "Clients", nodes: ["Diner (QR menu)", "Floor staff", "Kitchen display", "Owner dashboard"] },
        { label: "Transport", nodes: ["REST (transactions)", "Socket.io (live state)"], accent: true },
        { label: "Application", nodes: ["Express MVC", "JWT / Passport OAuth", "Payments interface"] },
        { label: "Data", nodes: ["Redis (hot reads, sessions)", "MongoDB (system of record)"] },
        { label: "External", nodes: ["Stripe", "Safepay", "Cloudinary", "Google Generative AI"] },
      ],
      crosscutting: ["Server-side role checks on every route and socket event"],
    },
    decisions: [
      {
        choice: "WebSockets over polling for the order lifecycle",
        why:
          "The value of a kitchen update decays within seconds. No polling interval is simultaneously cheap enough and fast enough; picking one just chooses which failure to accept.",
      },
      {
        choice: "The server computes state, clients only render it",
        why:
          "With three roles mutating concurrently, any client-side authoritative state guarantees divergence. Pushing computed state trades a little bandwidth for correctness during exactly the period the restaurant cannot afford to be wrong.",
      },
      {
        choice: "Redis in front of MongoDB rather than scaling the database",
        why:
          "Restaurant traffic is extremely peaked and overwhelmingly read-heavy. Caching the hot paths addressed the actual load shape at a fraction of the cost of provisioning for peak.",
      },
      {
        choice: "Abstracting two payment processors behind one interface",
        why:
          "Stripe alone does not serve Pakistani customers well and Safepay alone does not serve international ones. Encoding that choice at the boundary kept it out of the ordering flow entirely.",
      },
    ],
    impact: [
      { value: "Live", label: "deployed and operating at chefos.pro" },
      { value: "Zero", label: "paper tickets between counter and pass" },
      { value: "QR", label: "ordering on the diner's own device — no hardware" },
      { value: "Dual", label: "domestic and international payment rails" },
    ],
    learned: [
      "Real-time is an architectural decision rather than a library choice. Attaching Socket.io to a request/response design would have reproduced every race condition with more moving parts.",
      "Role-based access is only real when the server enforces it. Every hidden control I added was a convenience and never once a security boundary.",
      "Integrating a second payment processor was substantially easier than the first, entirely because the first one forced the abstraction into existence.",
    ],
  },

  /* ─────────────────────────── 03 ─────────────────────────── */
  {
    slug: "intellibid",
    n: "03",
    title: "IntelliBid",
    tagline: "Auction platform with a conversational bidding agent",
    desc:
      "A live auction marketplace where the notable component is the agent. Users describe an intent in natural language — a budget, a category, a ceiling — and BidMind, an assistant built on Google Gemini, searches, filters and places incremental bids on their behalf, explaining each action it takes. Bidding itself runs over WebSockets with interactive 3D previews of the lots.",
    role: "Sole engineer — agent design, real-time bidding, frontend",
    timeline: "2026",
    team: "Solo",
    status: "Deployed demo",
    pills: ["React", "Node.js", "WebSockets", "LLM agent", "3D previews", "MongoDB"],
    githubUrl: "https://github.com/Asim12312/intellibid-AI-based-bidding-system",
    liveUrl: "https://intellibid-ai-based-bidding-system.vercel.app",
    media: [
      {
        src: "/assets/shots/intellibid_bidmind_chatbot.png",
        alt:
          "BidMind assistant answering the question \"Should I raise my bid?\" by directing the user to auction insights and a bid simulator rather than naming a figure.",
        caption:
          "BidMind, the assistant, sits in the same inbox as seller messages and system alerts. Asked whether to raise a bid, it points at the evidence — auction insights, the bid simulator — instead of inventing a number, which is the behaviour a bidding assistant has to have to be trustworthy.",
        width: 1847,
        height: 947,
      },
    ],
    featured: true,
    context:
      "Auction interfaces assume a user who is watching. Anyone not watching at the moment a lot closes simply loses it, which is why sniping tools exist at all. The project began from a straightforward question: if an agent can be told an intent and a ceiling, why should a person have to sit at the screen?",
    problem: [
      "An agent that spends a user's money is a materially different proposition from a chatbot. Its authority has to be bounded before it acts, not apologised for afterwards.",
      "An agent whose reasoning is opaque is unusable in this setting. A user who cannot see why a bid was placed cannot decide whether to keep delegating.",
      "Auction state is contested by construction: several bidders and their agents act on the same lot within the same second, and the ordering has to be authoritative.",
      "Natural-language intent is ambiguous, while a bid is exact. Something has to convert one into the other without quietly inventing the parts the user did not specify.",
    ],
    approach: [
      {
        heading: "Give the agent a ceiling before giving it authority",
        body: [
          "Delegation always begins with an explicit maximum. The agent operates strictly inside that envelope and is structurally incapable of exceeding it, which makes the worst case something the user chose in advance rather than something the model decided.",
          "Within that envelope the agent bids incrementally rather than immediately committing the ceiling, so a user's maximum is a limit rather than a starting price.",
        ],
      },
      {
        heading: "Require the agent to narrate every action",
        body: [
          "Each bid the agent places carries a plain-language explanation of why it was placed. The intent is not decoration: an agent that must justify an action is far easier to evaluate, and a user who disagrees with the reasoning can withdraw delegation before the next round.",
          "Treating explanation as a product requirement rather than a debugging aid was the decision that made the feature trustworthy enough to use.",
        ],
      },
      {
        heading: "Constrain the language interface to a resolved query",
        body: [
          "Free-text intent is resolved into an explicit, structured query — category, ceiling, constraints — which the user can see and correct before anything is committed. Ambiguity is surfaced rather than silently resolved by the model.",
          "The same structured representation drives both search and the agent's subsequent behaviour, so what the user reviewed is exactly what executes.",
        ],
      },
      {
        heading: "Serve the bid path over WebSockets",
        body: [
          "Bids, outbid notifications and closing timers are pushed rather than polled, so a competing bid reaches every participant — human or agent — as one ordered stream of events.",
          "The server sequences bids authoritatively. Contested lots resolve against server ordering rather than client clocks, which is the only defensible answer when money is attached to the outcome.",
        ],
      },
    ],
    architecture: [
      { label: "Frontend", value: "React · interactive 3D lot previews · live bid stream" },
      { label: "Realtime", value: "WebSocket channels per lot — bids, outbid alerts, closing timers" },
      { label: "Agent", value: "BidMind — Google Gemini, bounded by a user-set ceiling, emitting an explanation per action" },
      { label: "Backend", value: "Node.js REST API · authoritative server-side bid sequencing" },
      { label: "Data", value: "MongoDB — lots, bids, users, agent delegation records" },
      { label: "Roles", value: "Bidder · pro bidder (agent access) · seller" },
    ],
    diagram: {
      caption:
        "The agent never reaches the bid engine directly. Intent is resolved into a reviewable query, bounded by a ceiling, and only then submitted through the same ordered path a human bid takes.",
      tiers: [
        { label: "Intent", nodes: ["Natural-language request", "Ceiling & constraints"] },
        { label: "Agent (Gemini)", nodes: ["Query resolver", "Bounded bid policy", "Action explainer"], accent: true },
        { label: "Bid engine", nodes: ["Server-ordered bid sequencing", "Lot state & closing timers"] },
        { label: "Transport", nodes: ["WebSocket channel per lot"] },
        { label: "Participants", nodes: ["Human bidders", "Delegated agents", "Sellers"] },
      ],
      crosscutting: ["Delegation records — every automated action stored with its rationale"],
    },
    decisions: [
      {
        choice: "A hard user-set ceiling as a precondition of delegation",
        why:
          "The failure mode of an autonomous agent with a wallet is unbounded. Making the bound a precondition rather than a guardrail means the worst outcome is one the user authored themselves.",
      },
      {
        choice: "Mandatory per-action explanations",
        why:
          "Trust in an agent is not established by accuracy alone. If a user cannot audit a decision, they will stop delegating regardless of whether the agent was right.",
      },
      {
        choice: "Resolving natural language into a reviewable structured query",
        why:
          "Interpreting intent silently is where conversational interfaces lose people. Showing the resolved query converts a guess into something the user can confirm or correct.",
      },
      {
        choice: "Server-authoritative bid ordering",
        why:
          "Client timestamps are unreliable and, in an auction, adversarial. The only sequencing anyone will accept is the one the server produces.",
      },
    ],
    impact: [
      { value: "Agent", label: "bids autonomously within a user-set ceiling" },
      { value: "Explained", label: "every automated action carries its rationale" },
      { value: "Live", label: "WebSocket bidding with server-ordered writes" },
      { value: "3D", label: "interactive lot inspection before bidding" },
    ],
    learned: [
      "The engineering difficulty in an agent product is not the model. It is deciding precisely what authority the agent holds and making that boundary structural rather than advisory.",
      "Requiring the agent to explain itself improved the system twice over: users could evaluate it, and so could I — most of the behaviours I corrected were ones the explanations exposed.",
      "Anything involving money converges on the same conclusion as ChefOS did: the server orders events, and the client renders the result.",
    ],
  },

  /* ─────────────────────────── 04 ─────────────────────────── */
  {
    slug: "studentsphere",
    n: "04",
    title: "StudentSphere",
    tagline: "Campus platform unifying a marketplace, study materials and a social feed",
    desc:
      "A single portal replacing the scattered group chats, notice boards and resale posts a university actually runs on. It combines a peer-to-peer marketplace settled through Stripe, shared study materials and courses, and a social feed — all behind one identity and one moderation surface.",
    role: "Sole engineer — data model, payments integration, real-time features",
    timeline: "2025 — 2026",
    team: "Solo",
    status: "Shipped",
    pills: ["React", "Express", "Node.js", "MongoDB", "Socket.io", "Stripe"],
    githubUrl: "https://github.com/Asim12312/student-sphere-app",
    featured: true,
    context:
      "Campus life is distributed across a dozen tools that do not speak to one another: coordination in group chats, academic questions on notice boards, and second-hand textbook sales wherever someone happened to post. Nothing is searchable, nothing is moderated, and everything is lost at the end of term.",
    problem: [
      "Three genuinely distinct products — a marketplace, a study-material library and a social feed — have to share one identity and permission model without fragmenting into three disconnected applications.",
      "Real money moves between students who have no prior relationship, so the platform needs a trusted intermediary rather than an honour system.",
      "Anything user-generated on a campus requires moderation tooling from the outset rather than after the first incident.",
      "Participation is seasonal and highly peaked around term dates, so the system has to degrade gracefully rather than assume steady traffic.",
    ],
    approach: [
      {
        heading: "One identity across three surfaces",
        body: [
          "A single user model carries membership, reputation and role across the marketplace, the material library and the feed, so a student signs in once and permissions compose rather than duplicate.",
          "Administrative capability is expressed as a role on that same model, which means moderation tooling operates uniformly across all three surfaces instead of requiring a separate back office per feature.",
        ],
      },
      {
        heading: "Stripe as the trust layer for peer-to-peer sale",
        body: [
          "Rather than building payment handling — and thereby holding card data — the marketplace delegates settlement to Stripe. Students transact through a processor they already recognise, and the application never touches raw payment details.",
          "That decision removed PCI scope entirely and, more importantly, removed the question of whether two strangers should trust a student project with their card.",
        ],
      },
      {
        heading: "Real-time where it changes behaviour, and nowhere else",
        body: [
          "Socket.io backs the interactions where latency actually alters what a user does — conversations and feed activity — while the material library and marketplace listings remain ordinary cached reads.",
          "Deciding that per-surface rather than globally kept the connection count proportional to genuine need instead of to page count.",
        ],
      },
      {
        heading: "Moderation as a first-class surface",
        body: [
          "Reporting, review and removal are built against the shared content model rather than per feature, so a new content type inherits moderation instead of requiring its own.",
          "Administrative actions are recorded, which matters on a campus where a removal decision may later need to be explained.",
        ],
      },
    ],
    architecture: [
      { label: "Frontend", value: "React SPA · shared authentication context across all three modules" },
      { label: "Backend", value: "Node.js + Express REST API · role-based middleware" },
      { label: "Realtime", value: "Socket.io, membership-gated, scoped to conversations and feed activity" },
      { label: "Database", value: "MongoDB — users, listings, materials, posts, orders, reports" },
      { label: "Payments", value: "Stripe Checkout — the application stores no card data" },
      { label: "Moderation", value: "Administrative role with cross-module oversight and an action log" },
    ],
    diagram: {
      caption:
        "Three product surfaces sit on one identity and one content model, which is what allows moderation to be written once rather than three times.",
      tiers: [
        { label: "Surfaces", nodes: ["Marketplace", "Study materials", "Social feed"] },
        { label: "Shared spine", nodes: ["One user & role model", "Shared content model"], accent: true },
        { label: "Application", nodes: ["Express REST API", "Role-based middleware", "Socket.io (selective)"] },
        { label: "Data", nodes: ["MongoDB — users, listings, materials, posts, reports"] },
        { label: "External", nodes: ["Stripe Checkout"] },
      ],
      crosscutting: ["Moderation & administrative action log across every content type"],
    },
    decisions: [
      {
        choice: "Delegating payments to Stripe rather than building them",
        why:
          "Handling card data would have introduced PCI scope and a trust problem no student project can credibly solve. This was the clearest build-versus-buy call in the project.",
      },
      {
        choice: "One shared user model instead of per-module accounts",
        why:
          "Three separate account systems would have tripled the authentication surface and made consistent moderation effectively impossible.",
      },
      {
        choice: "Real-time applied selectively rather than universally",
        why:
          "A live connection per surface is a cost paid continuously. Restricting it to interactions where latency genuinely changes behaviour kept that cost proportionate.",
      },
    ],
    impact: [
      { value: "3-in-1", label: "marketplace, materials and feed behind one login" },
      { value: "Stripe", label: "settled peer-to-peer transactions, no card data held" },
      { value: "Unified", label: "moderation across every content type" },
      { value: "MERN", label: "end-to-end ownership of the full stack" },
    ],
    learned: [
      "The difficult part of a multi-module product is the shared spine — identity and permissions — rather than any individual feature.",
      "Choosing not to build payments was the highest-leverage decision in the project, and it took the least time.",
      "Building moderation against a shared content model meant later content types cost almost nothing to govern.",
    ],
  },

  /* ── Supporting work — listed, not dramatised ── */
  {
    slug: "ucp-devops",
    n: "05",
    title: "Containerised CI/CD Pipeline",
    tagline: "Multi-environment delivery pipeline with Git Flow and staged deployment",
    desc:
      "A fully containerised, multi-environment static site where the deliverable is the pipeline rather than the page: Git Flow branching, Dockerised builds, automated GitHub Actions checks and multi-stage deployment behind Nginx, with no manual step between commit and live.",
    role: "Solo — application and delivery pipeline",
    timeline: "2025",
    team: "Solo",
    status: "Open source",
    pills: ["GitHub Actions", "Docker", "Nginx", "Git Flow", "Parcel"],
    githubUrl: "https://github.com/Asim12312/ucp-devops-project",
    featured: false,
  },
  {
    slug: "mission-control",
    n: "06",
    title: "Mission Control",
    tagline: "Local-first personal engineering dashboard",
    desc:
      "A self-contained dashboard tracking learning roadmaps, algorithm patterns and progress, built local-first so it holds no server state and works offline.",
    role: "Solo",
    timeline: "2026",
    team: "Solo",
    status: "Open source",
    pills: ["HTML", "JavaScript", "Local-first"],
    githubUrl: "https://github.com/Asim12312/mission-control",
    featured: false,
  },
  {
    slug: "dsa-patterns",
    n: "07",
    title: "Algorithm Pattern Library",
    tagline: "Worked solutions organised by pattern rather than by problem",
    desc:
      "An ongoing catalogue of algorithm and data-structure solutions in C++, each filed under the pattern it belongs to with written notes on when that pattern applies — organised for recall rather than as a submission archive.",
    role: "Solo",
    timeline: "Ongoing",
    team: "Solo",
    status: "Open source",
    pills: ["C++", "Algorithms", "Data structures"],
    githubUrl: "https://github.com/Asim12312/DSA-leetcode",
    featured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
export const OTHER_PROJECTS = PROJECTS.filter((p) => !p.featured);

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
