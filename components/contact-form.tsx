"use client";

import { useState } from "react";

type Props = {
  destination: string;
  label: string;
};

export default function ContactForm({ destination, label }: Props) {
  const [values, setValues] = useState({ name: "", email: "", subject: "", content: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [message, setMessage] = useState("");

  function update(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    if (!values.content.trim()) next.content = "Please enter a message.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, dest: destination }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message ?? "something went wrong");
      setStatus("sent");
      setMessage("Message sent.");
      setValues({ name: "", email: "", subject: "", content: "" });
    } catch (error) {
      setStatus("idle");
      setMessage(error instanceof Error ? error.message : "something went wrong");
    }
  }

  const fields: { key: keyof typeof values; label: string; type?: string; multiline?: boolean }[] = [
    { key: "name", label: "your name" },
    { key: "email", label: "your email", type: "email" },
    { key: "subject", label: "subject (optional)" },
    { key: "content", label: "message", multiline: true },
  ];

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <p className="font-display text-xl lowercase">{label}</p>
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-2">
          <label htmlFor={`field-${field.key}`} className="text-sm lowercase text-muted">
            {field.label}
          </label>
          {field.multiline ? (
            <textarea
              id={`field-${field.key}`}
              name={field.key}
              rows={5}
              value={values[field.key]}
              onChange={(event) => update(field.key, event.target.value)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={errors[field.key] ? `error-${field.key}` : undefined}
              className="w-full resize-y border-2 border-ink bg-paper px-3 py-3 text-sm shadow-[3px_3px_0_0_var(--color-line)] focus:border-accent focus:outline-none"
            />
          ) : (
            <input
              id={`field-${field.key}`}
              name={field.key}
              type={field.type ?? "text"}
              value={values[field.key]}
              onChange={(event) => update(field.key, event.target.value)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={errors[field.key] ? `error-${field.key}` : undefined}
              className="w-full border-2 border-ink bg-paper px-3 py-3 text-sm shadow-[3px_3px_0_0_var(--color-line)] focus:border-accent focus:outline-none"
            />
          )}
          {errors[field.key] && (
            <p id={`error-${field.key}`} role="alert" className="text-xs text-accent-ink">
              {errors[field.key]}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start border-2 border-ink bg-accent px-6 py-3 font-display text-base text-ink shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "sending..." : "send message"}
      </button>
      {message && (
        <p role="status" aria-live="polite" className="text-sm text-mint">
          {message}
        </p>
      )}
    </form>
  );
}
