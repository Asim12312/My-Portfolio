import Link from "next/link";
import { PROFILE } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
      <p className="label mb-6">Error 404</p>
      <h1 className="font-display font-extrabold text-[clamp(3rem,12vw,7rem)] leading-none mb-6">
        Not found
      </h1>
      <p className="lead mb-10 mx-auto">
        That page doesn&apos;t exist. The work, however, does.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <Link href="/" className="btn btn-primary">Back home</Link>
        <Link href="/work" className="btn btn-ghost">Case studies</Link>
        <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost">Email me</a>
      </div>
    </main>
  );
}
