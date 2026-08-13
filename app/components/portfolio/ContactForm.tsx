"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "@/lib/content";

/* Web3Forms access keys are public by design (they only allow submissions to
   the owner's inbox). Kept in an env var so it can be rotated without a code
   change; the literal is the existing key so the form keeps working as-is. */
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "88206cb3-ff70-4b07-8a98-9c6f591ca4bd";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const firstField = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  /* Escape to close, focus the first field on open, restore focus on close. */
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => firstField.current?.focus(), 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog.current) return;
      const focusable = dialog.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    /* Honeypot: real users never fill a hidden field. Silently succeed for bots. */
    if (formData.get("company")) {
      setStatus("success");
      setTimeout(onClose, 1200);
      return;
    }

    setStatus("sending");
    formData.delete("company");
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", `Portfolio message from ${formData.get("name")}`);
    formData.append("from_name", "Portfolio contact form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 1800);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          <motion.div
            ref={dialog}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
            className="surface fixed left-1/2 top-1/2 z-[101] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 p-7 sm:p-8 max-h-[90svh] overflow-y-auto text-left"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact form"
              className="absolute right-4 top-4 h-8 w-8 rounded-full hairline flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground cursor-pointer"
            >
              ✕
            </button>

            <h3 id="contact-form-title" className="font-display font-bold text-2xl mb-1.5 text-foreground">
              Send a message
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {PROFILE.availability.responseTime}.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
              <Field label="Your name" name="name" type="text" placeholder="Jane Doe" ref={firstField} autoComplete="name" />
              <Field label="Your email" name="email" type="email" placeholder="jane@company.com" autoComplete="email" />

              <div>
                <label htmlFor="cf-message" className="label block mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  id="cf-message"
                  name="message"
                  rows={4}
                  minLength={10}
                  placeholder="Hi Asim — we're hiring for…"
                  className="w-full px-3.5 py-2.5 rounded-xl hairline bg-background text-foreground text-[15px] outline-none resize-none focus-visible:border-brand"
                />
              </div>

              {/* honeypot — hidden from users and screen readers */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="btn btn-primary w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {(status === "idle" || status === "error") && "Send message"}
                {status === "sending" && "Sending…"}
                {status === "success" && "Sent"}
              </button>

              <p role="status" aria-live="polite" className="text-center font-mono text-xs">
                {status === "success" && <span className="text-foreground">Thanks — I&apos;ll reply within 24 hours.</span>}
                {status === "error" && (
                  <span className="text-destructive">
                    Something went wrong. Email me directly at{" "}
                    <a href={`mailto:${PROFILE.email}`} className="underline font-bold">
                      {PROFILE.email}
                    </a>
                  </span>
                )}
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label, name, type, placeholder, autoComplete, ref,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  ref?: React.Ref<HTMLInputElement>;
}) {
  const id = `cf-${name}`;
  return (
    <div>
      <label htmlFor={id} className="label block mb-1.5">
        {label}
      </label>
      <input
        required
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full px-3.5 py-2.5 rounded-xl hairline bg-background text-foreground text-[15px] outline-none focus-visible:border-brand"
      />
    </div>
  );
}
