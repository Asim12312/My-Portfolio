"use client";

import { useState } from "react";
import { ContactForm } from "./ContactForm";
import { PROFILE } from "@/lib/content";
import { CheckIcon, CopyIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";

export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  const copy = async (kind: "email" | "phone", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked — the mailto/tel link beside this still works */
    }
  };

  return (
    <section id="contact" className="relative px-6 sm:px-10 py-20 sm:py-28 max-w-6xl mx-auto">
      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      <p className="label mb-4">05 — contact</p>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
        <div className="min-w-0">
          <h2 className="font-display font-extrabold text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.05] mb-5 max-w-[16ch]">
            Let&apos;s build something.
          </h2>
          <p className="lead mb-8">
            {PROFILE.availability.label} — {PROFILE.availability.detail}.{" "}
            <span className="text-foreground font-medium">{PROFILE.availability.responseTime}.</span>
          </p>

          <div className="flex flex-wrap gap-2.5">
            <button type="button" onClick={() => setIsFormOpen(true)} className="btn btn-primary cursor-pointer">
              <MailIcon />
              Send a message
            </button>
            <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <DownloadIcon />
              Résumé
            </a>
            <a href={PROFILE.links.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost">
              WhatsApp
            </a>
          </div>
        </div>

        {/* Contact details in plain, copyable text. A recruiter should never
            have to open a modal to get an email address. */}
        <dl className="divide-y divide-border border-y border-border w-full min-w-0">
          <ContactRow
            href={`mailto:${PROFILE.email}`}
            icon={<MailIcon />}
            label="Email"
            value={PROFILE.email}
            onCopy={() => copy("email", PROFILE.email)}
            copied={copied === "email"}
          />
          <ContactRow
            href={`tel:${PROFILE.phoneRaw}`}
            icon={<span aria-hidden className="text-[13px]">☎</span>}
            label="Phone / WhatsApp"
            value={PROFILE.phone}
            onCopy={() => copy("phone", PROFILE.phone)}
            copied={copied === "phone"}
          />
          <div className="flex items-center gap-3 py-4">
            <span className="text-muted-foreground shrink-0"><GithubIcon /></span>
            <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="min-w-0 grow">
              <span className="label block">GitHub</span>
              <span className="block font-mono text-[13px] text-foreground truncate">Asim12312</span>
            </a>
          </div>
          <div className="flex items-center gap-3 py-4">
            <span className="text-muted-foreground shrink-0"><LinkedinIcon /></span>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="min-w-0 grow">
              <span className="label block">LinkedIn</span>
              <span className="block font-mono text-[13px] text-foreground truncate">muhammad-asim</span>
            </a>
          </div>
          <div className="flex items-center gap-3 py-4">
            <span aria-hidden className="text-muted-foreground shrink-0 text-[13px]">◎</span>
            <span className="min-w-0">
              <span className="label block">Location</span>
              <span className="block font-mono text-[13px] text-foreground truncate">{PROFILE.location}</span>
            </span>
          </div>
        </dl>
      </div>
    </section>
  );
}

function ContactRow({
  href, icon, label, value, onCopy, copied,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-4 min-w-0">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <a href={href} className="min-w-0 grow">
        <span className="label block">{label}</span>
        <span className="block font-mono text-[13px] text-foreground truncate">{value}</span>
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label.toLowerCase()}`}
        className="shrink-0 h-8 w-8 rounded-lg hairline flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
      >
        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </div>
  );
}
