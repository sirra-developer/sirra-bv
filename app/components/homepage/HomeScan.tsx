import Link from "next/link";
import type { HomePageContent } from "./types";
export function HomeScan({ content }: { content: HomePageContent }) {
  return (
    <section data-animate-section className="px-4 sm:px-6">
      <div
        data-animate-item
        className="bg-sirra-gold text-sirra-ink mx-auto max-w-6xl rounded-[1.5rem] px-7 py-12 sm:rounded-[2rem] sm:px-12 sm:py-16"
      >
        <p className="text-sirra-green text-xs font-semibold tracking-[.22em] uppercase">
          {content.scanEyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-semibold tracking-[-.04em] sm:text-4xl">
          {content.scanHeading}
        </h2>
        <p className="mt-5 max-w-[70ch] text-base leading-7 whitespace-pre-line">
          {content.scanText}
        </p>
        <div className="mt-8 flex justify-start">
          <Link
            href={content.scanActionUrl}
            className="bg-sirra-green hover:text-sirra-green inline-flex w-fit rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:bg-white"
          >
            {content.scanAction}
          </Link>
        </div>
      </div>
    </section>
  );
}
