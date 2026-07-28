"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INTERESTS = ["Buying", "Selling", "Private Sale", "Just Exploring"];

/**
 * Oversized, editorial contact form. Inline-underline fields keep the visual
 * language of the site. Submission is front-end only (logs + success state) —
 * a real deployment would POST to a CRM / email service.
 */
export default function ContactForm() {
  const [interest, setInterest] = useState<string>("Buying");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    // Front-end only — swap for a real endpoint in production.
    console.log("Enquiry:", { interest, ...form });
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-6 py-10"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brown text-offwhite">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="text-4xl font-bold tracking-tight text-navy">
          Thank you, {form.name.split(" ")[0]}.
        </h3>
        <p className="max-w-md text-lg text-navy/60">
          Your enquiry is with us. An advisor will be in touch within one
          business day — often sooner.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12">
      {/* Interest selector */}
      <div>
        <p className="eyebrow mb-5 text-navy/50">I&apos;m interested in</p>
        <div className="flex flex-wrap gap-3">
          {INTERESTS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setInterest(opt)}
              className={cn(
                "border px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors",
                interest === opt
                  ? "border-brown bg-brown text-offwhite"
                  : "border-navy/20 text-navy/60 hover:border-navy"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div className="grid gap-10 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Jane Appleton"
            className="w-full border-b border-navy/25 bg-transparent pb-3 text-xl text-navy placeholder:text-navy/25 focus:border-brown focus:outline-none"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="jane@email.com"
            className="w-full border-b border-navy/25 bg-transparent pb-3 text-xl text-navy placeholder:text-navy/25 focus:border-brown focus:outline-none"
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+1 (000) 000-0000"
            className="w-full border-b border-navy/25 bg-transparent pb-3 text-xl text-navy placeholder:text-navy/25 focus:border-brown focus:outline-none"
          />
        </Field>
        <Field label="Budget / Timeline">
          <input
            type="text"
            value={form.message}
            onChange={update("message")}
            placeholder="e.g. $5M, within 6 months"
            className="w-full border-b border-navy/25 bg-transparent pb-3 text-xl text-navy placeholder:text-navy/25 focus:border-brown focus:outline-none"
          />
        </Field>
      </div>

      <div className="pt-2">
        <Button type="submit" variant="solid" size="lg" data-cursor="Send">
          Send Enquiry
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-4 block text-navy/50">
        {label} {required && <span className="text-brown">*</span>}
      </span>
      {children}
    </label>
  );
}
