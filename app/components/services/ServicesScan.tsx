import Link from "next/link";
import type { ServicesScanContent } from "./types";
export function ServicesScan({ content }: { content: ServicesScanContent }) {
  const textParts = content.text
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const paragraphs = textParts;

  return (
    <section data-animate-section className="px-4 py-16 sm:px-6 sm:py-24">
      <div
        data-animate-item
        className="bg-sirra-green mx-auto max-w-6xl rounded-[1.5rem] px-7 py-12 text-white sm:rounded-[2rem] sm:px-12 sm:py-16"
      >
        <p className="text-sirra-gold text-xs font-semibold tracking-[.2em] uppercase">
          {content.eyebrow}
        </p>
        <h2 className="mt-5 max-w-3xl text-3xl leading-tight font-semibold tracking-[-.04em] sm:text-4xl">
          {content.heading}
        </h2>
        <div className="mt-6 max-w-[70ch] space-y-5 text-base leading-7 text-white/75">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href={content.actionUrl}
            className="bg-sirra-gold text-sirra-ink hover:text-sirra-green inline-flex rounded-full px-6 py-3.5 font-semibold transition-colors duration-300 hover:bg-white"
          >
            {content.action}
          </Link>
        </div>
      </div>
    </section>
  );
}
