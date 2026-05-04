"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate sending or use a service like Web3Forms
    // For now, we'll use a mailto fallback or just simulate success
    const formData = new FormData(e.currentTarget);
    
    // We use Web3Forms for direct email delivery (No mailto needed)
    // You can get your own Access Key at https://web3forms.com/ (it's free)
    formData.append("access_key", "88206cb3-ff70-4b07-8a98-9c6f591ca4bd"); 
    formData.append("subject", `New Message from Portfolio: ${formData.get("name")}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
      } else {
        console.error("Error", data);
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
    
    setTimeout(() => {
      setStatus("idle");
      if (status === "success") onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border-4 border-foreground bg-card p-8 shadow-[12px 12px 0 0 var(--color-foreground)]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 h-8 w-8 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-muted transition-colors"
            >
              ✕
            </button>
            
            <h3 className="font-display font-extrabold text-3xl mb-2 text-foreground">drop a message.</h3>
            <p className="text-sm text-muted-foreground mb-6 font-mono uppercase tracking-wider">I'll get back to you ASAP</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold mb-1.5 ml-1">Your Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border-2 border-foreground bg-background focus:ring-2 focus:ring-cyan outline-none transition-all text-foreground"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase font-bold mb-1.5 ml-1">Your Email</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-foreground bg-background focus:ring-2 focus:ring-cyan outline-none transition-all text-foreground"
                />
              </div>
              
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold mb-1.5 ml-1">Message</label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Hey, let's talk about a project..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-foreground bg-background focus:ring-2 focus:ring-cyan outline-none transition-all resize-none"
                />
              </div>
              
              <button
                disabled={status !== "idle"}
                type="submit"
                className="w-full py-4 rounded-xl border-2 border-foreground bg-[var(--cyan)] text-foreground font-display font-extrabold text-xl shadow-[4px 4px 0 0 var(--color-foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px 6px 0 0 var(--color-foreground)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px 2px 0 0 var(--color-foreground)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "idle" && "Send It! →"}
                {status === "sending" && "Sending..."}
                {status === "success" && "Sent! ✨"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
