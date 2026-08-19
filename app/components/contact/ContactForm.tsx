"use client";

import { FormEvent, useState } from "react";

export type FormField = {
  _key: string;
  label: string;
  inputType: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder?: string;
};
export type ContactFormContent = {
  heading: string;
  action: string;
  responseText: string;
  fields: FormField[];
};
type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "border-sirra-taupe/40 focus:border-sirra-green w-full border-b bg-transparent py-4 text-lg outline-none transition-colors duration-300 placeholder:text-stone-400";

export function ContactForm({ content }: { content: ContactFormContent }) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("sending");
    setFeedback("");

    const fields = content.fields.map((field) => ({
      label: field.label,
      inputType: field.inputType,
      required: Boolean(field.required),
      value: String(values.get(field._key) ?? ""),
    }));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields, website: values.get("website") }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message);
      form.reset();
      setStatus("success");
      setFeedback("Bedankt. Je bericht is verzonden.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && error.message
          ? error.message
          : "Het bericht kon niet worden verzonden. Probeer het later opnieuw.",
      );
    }
  }

  return (
    <section data-animate-section className="px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">Kennismaken</p>
          <h2
            data-animate-item
            className="section-title text-sirra-green mt-6 max-w-[12ch]"
          >
            {content.heading}
          </h2>
        </div>
        <form
          data-animate-item
          className="grid gap-x-8 sm:grid-cols-2"
          onSubmit={submit}
        >
          <label className="sr-only" aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          {content.fields.map((field) => {
            const placeholder =
              field.placeholder ||
              `${field.label}${field.required ? "" : " (optioneel)"}`;
            const shared = {
              className: fieldClass,
              name: field._key,
              placeholder,
              required: Boolean(field.required),
              maxLength: field.inputType === "textarea" ? 5000 : 254,
            };
            return (
              <label
                key={field._key}
                className={
                  field.inputType === "textarea" ? "sm:col-span-2" : ""
                }
              >
                <span className="sr-only">{field.label}</span>
                {field.inputType === "textarea" ? (
                  <textarea
                    {...shared}
                    className={`${fieldClass} min-h-36 resize-y`}
                  />
                ) : (
                  <input {...shared} type={field.inputType} />
                )}
              </label>
            );
          })}
          <div className="mt-8 flex flex-col items-start gap-5 sm:col-span-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-sirra-gold text-sirra-green hover:bg-sirra-green rounded-full px-8 py-4 font-semibold transition-colors duration-300 hover:text-white disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? "Verzenden..." : content.action}
            </button>
            <p className="text-sm text-stone-600">{content.responseText}</p>
          </div>
          {feedback ? (
            <p
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-5 text-sm font-semibold sm:col-span-2 ${status === "success" ? "text-sirra-green" : "text-red-700"}`}
            >
              {feedback}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
