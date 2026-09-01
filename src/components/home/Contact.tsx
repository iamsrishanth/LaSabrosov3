"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Phone, MapPin, Clock, InstagramLogo as Instagram, PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";
import { Section, SectionEyebrow } from "@/components/site/section";
import { brand } from "@/data/brand";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please share your name"),
  date: z.string().min(1, "Pick a preferred date"),
  guests: z.coerce.number().int().min(1, "At least 1 guest").max(60, "Up to 60 guests"),
  note: z.string().max(200, "Keep it under 200 characters").optional(),
});

type FormState = { name: string; date: string; guests: string; note: string };

/** Contact — map + details + enquiry form with inline zod validation. */
export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", date: "", guests: "2", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        if (!next[issue.path[0] as string]) next[issue.path[0] as string] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  }

  const field = (k: keyof FormState, label: string, type = "text") => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </label>
      <input
        type={type}
        value={form[k]}
        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
        className={`h-11 rounded-xl border bg-cream px-3.5 text-sm text-ink focus:outline-none focus:ring-2 ${
          errors[k]
            ? "border-terracotta-deep focus:ring-terracotta-deep/30"
            : "border-forest/20 focus:border-forest focus:ring-forest/20"
        }`}
      />
      {errors[k] && (
        <span className="text-xs font-medium text-terracotta-deep">{errors[k]}</span>
      )}
    </div>
  );

  return (
    <Section id="contact" className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 space-y-3">
        <SectionEyebrow>Find us</SectionEyebrow>
        <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-forest sm:text-4xl lg:text-5xl">
          Drop by in Madhapur
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* details + map */}
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoCard icon={<MapPin size={18} weight="duotone" />} title="Address" lines={[brand.address]} />
            <InfoCard icon={<Clock size={18} weight="duotone" />} title="Hours" lines={[brand.hours, brand.hoursNote]} />
            <InfoCard
              icon={<Phone size={18} weight="duotone" />}
              title="Call us"
              lines={[brand.phoneDisplay]}
              href={`tel:${brand.phone}`}
            />
            <InfoCard
              icon={<Instagram size={18} weight="duotone" />}
              title="Instagram"
              lines={[brand.instagramHandle]}
              href={brand.instagram}
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-forest/15 shadow-sm">
            <iframe
              title="LaSabroso location on Google Maps"
              src={`https://www.google.com/maps?q=${encodeURIComponent(brand.mapQuery)}&output=embed`}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* enquiry form */}
        <div className="rounded-3xl border border-forest/12 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(22,101,52,0.4)] sm:p-8">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center"
            >
              <CheckCircle size={48} weight="duotone" className="text-forest" />
              <p className="font-display text-2xl italic text-forest">Almost there.</p>
              <p className="max-w-sm text-sm text-muted">
                To confirm your table, send the same details to us on Instagram. We
                reply within minutes during open hours.
              </p>
              <a
                href={brand.reserveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-cream"
              >
                <Instagram size={16} weight="fill" />
                {brand.reserveLabel}
              </a>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-forest">Reserve your table</h3>
                <p className="text-sm text-muted">
                  Quick enquiry. We confirm on Instagram DM.
                </p>
              </div>
              {field("name", "Your name")}
              <div className="grid gap-4 sm:grid-cols-2">
                {field("date", "Preferred date", "date")}
                {field("guests", "Guests", "number")}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Note (optional)
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={3}
                  className="rounded-xl border border-forest/20 bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                  placeholder="Window seat, birthday surprise…"
                />
                {errors.note && (
                  <span className="text-xs font-medium text-terracotta-deep">
                    {errors.note}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-cream transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <PaperPlaneTilt size={16} weight="fill" />
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function InfoCard({
  icon,
  title,
  lines,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  href?: string;
}) {
  const inner = (
    <div className="flex h-full items-start gap-3 rounded-2xl border border-forest/10 bg-cream-soft p-4 transition-colors hover:bg-forest/5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint/50 text-forest-deep">
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted">{title}</p>
        {lines.map((l, i) => (
          <p key={i} className="text-sm font-semibold text-ink">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}
