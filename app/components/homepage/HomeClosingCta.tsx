import Link from "next/link";
import type { HomePageContent } from "./types";
export function HomeClosingCta({ content }: { content: HomePageContent }) {
  return (
    <section data-animate-section className="px-4 pb-4 sm:px-6 sm:pb-6">
      <div
        data-animate-item
        className="bg-sirra-green mx-auto max-w-6xl rounded-[1.5rem] px-7 py-12 text-white sm:rounded-[2.25rem] sm:px-12 sm:py-16"
      >
        <h2 className="max-w-3xl text-3xl leading-tight font-semibold tracking-[-.04em] sm:text-4xl">
          {content.ctaHeading}
        </h2>
        <div className="mt-8 flex justify-start">
          <Link
            href={content.ctaActionUrl}
            className="bg-sirra-gold text-sirra-ink inline-flex rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-white"
          >
            {content.ctaAction}
          </Link>
        </div>
      </div>
    </section>
  );
}
