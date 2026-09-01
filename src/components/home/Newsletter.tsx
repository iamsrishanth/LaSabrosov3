"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EnvelopeSimple, CheckCircle, ArrowRight, Coffee } from "@phosphor-icons/react";
import { Section } from "@/components/site/section";
import { usePrefersReducedMotion } from "@/hooks/use-media";

/** Newsletter signup — email capture with inline validation + success state. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const reduce = usePrefersReducedMotion();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <Section id="newsletter" className="py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-forest/12 bg-gradient-to-br from-forest to-forest-deep px-6 py-10 text-cream shadow-[0_20px_50px_-30px_rgba(22,101,52,0.6)] sm:px-12 sm:py-14">
        {/* ambient glow */}
        <div className="events-aurora pointer-events-none absolute inset-0 opacity-15" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream/10 text-gold">
            <Coffee size={24} weight="duotone" />
          </span>
          <div className="space-y-2">
            <h2 className="text-balance text-2xl font-extrabold text-cream sm:text-3xl lg:text-4xl">
              Get the first sip of new drops
            </h2>
            <p className="max-w-md text-sm text-cream/75 sm:text-base">
              Seasonal menus, secret specials and event invites. No spam, just
              the good stuff. Unsubscribe anytime.
            </p>
          </div>

          {done ? (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-full bg-mint/20 px-5 py-3 text-sm font-bold text-mint backdrop-blur-sm"
            >
              <CheckCircle size={18} weight="fill" />
              You are on the list. Check your inbox to confirm.
            </motion.div>
          ) : (
            <form onSubmit={submit} className="w-full max-w-md" noValidate>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <EnvelopeSimple
                    size={18}
                    weight="duotone"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className={`h-12 w-full rounded-full border bg-cream pl-11 pr-4 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 ${
                      error
                        ? "border-terracotta-deep focus:ring-terracotta-deep/30"
                        : "border-forest/20 focus:border-forest focus:ring-forest/20"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-forest-deep transition-transform hover:-translate-y-0.5"
                >
                  Subscribe
                  <ArrowRight size={15} weight="bold" />
                </button>
              </div>
              {error && (
                <p className="mt-2 text-left text-xs font-medium text-gold">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
