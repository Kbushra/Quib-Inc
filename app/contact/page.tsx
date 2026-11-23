import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { emails, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out through social channels or send a direct message using the contact form.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-12 border-b-2 border-ink pb-9">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl">Contact Quib Inc.</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Reach out through social channels or send a direct message using the contact form.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="border-2 border-ink bg-paper p-6 shadow-pixel sm:p-8">
          <ContactForm destination={emails.quib} label="Contact Quib Inc." />
        </div>
        <div className="border-2 border-ink bg-paper p-6 shadow-pixel sm:p-8">
          <ContactForm destination={emails.mediaocre} label="Contact Mediaocre Games" />
        </div>
      </div>

      <div className="mt-12 grid gap-8 border-t-2 border-ink pt-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl">Email</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-muted">
            <li>
              quib inc.: <a href={`mailto:${emails.quib}`} className="text-ink underline decoration-accent decoration-2 underline-offset-4">{emails.quib}</a>
            </li>
            <li>
              mediaocre games: <a href={`mailto:${emails.mediaocre}`} className="text-ink underline decoration-accent decoration-2 underline-offset-4">{emails.mediaocre}</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl">Social channels</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center gap-3 text-sm lowercase text-muted no-underline transition-colors duration-150 hover:text-accent-ink"
                >
                  <img src={social.icon} alt="" width={20} height={20} />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
