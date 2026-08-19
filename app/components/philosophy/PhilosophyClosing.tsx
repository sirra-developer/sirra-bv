import Link from "next/link";
import type { PhilosophyContent } from "./types";

export function PhilosophyClosing({ content }: { content: PhilosophyContent }) {
  return (
    <section data-animate-section className="px-4 py-16 sm:px-6 sm:py-24">
      <div
        data-animate-item
        className="bg-sirra-green mx-auto max-w-6xl rounded-[1.5rem] px-7 py-12 text-white sm:rounded-[2.25rem] sm:px-12 sm:py-16"
      >
        <h2 className="max-w-4xl text-3xl leading-tight font-semibold tracking-[-.04em] sm:text-4xl">
          {content.closingText}
        </h2>
        <div className="mt-8 flex">
          <Link
            href={content.closingActionUrl}
            className="bg-sirra-gold text-sirra-ink hover:text-sirra-green inline-flex rounded-full px-6 py-3.5 font-semibold transition-colors duration-300 hover:bg-white"
          >
            {content.closingAction}
          </Link>
        </div>
      </div>
    </section>
  );
}
