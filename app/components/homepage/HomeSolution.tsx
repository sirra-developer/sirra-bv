import Link from "next/link";
import type { HomePageContent } from "./types";

export function HomeSolution({ content }: { content: HomePageContent }) {
  return (
    <section data-animate-section className="px-4 sm:px-6">
      <div className="bg-sirra-taupe-light text-sirra-ink mx-auto max-w-6xl rounded-[1.5rem] sm:rounded-[2rem]">
        <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            data-animate-item
            className="max-w-3xl text-lg leading-8 text-stone-700"
          >
            <h2 className="text-sirra-green max-w-4xl text-3xl leading-[1.04] font-semibold tracking-[-0.04em] text-balance sm:text-4xl sm:tracking-[-0.05em] lg:text-[3rem]">
              {content.solutionHeading}
            </h2>
            <p className="mt-6 max-w-2xl whitespace-pre-line">
              {content.solutionText}
            </p>
          </div>
          <p className="text-sirra-taupe mt-9 text-sm font-semibold tracking-[0.17em] uppercase sm:text-base">
            {content.principles}
          </p>
          <div
            data-animate-item
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href={content.primaryActionUrl}
              className="bg-sirra-green hover:text-sirra-green inline-flex min-w-56 items-center justify-center rounded-full px-7 py-4 text-base font-semibold text-white transition hover:bg-white"
            >
              {content.primaryAction}
            </Link>
            <Link
              href={content.secondaryActionUrl}
              className="bg-sirra-gold text-sirra-ink hover:text-sirra-green inline-flex min-w-56 items-center justify-center rounded-full px-7 py-4 text-base font-semibold transition hover:bg-white"
            >
              {content.secondaryAction}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
