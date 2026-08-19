import type { HomePageContent } from "./types";
export function HomeAudience({ content }: { content: HomePageContent }) {
  return (
    <section
      data-animate-section
      className="mx-auto max-w-6xl px-6 py-16 sm:py-24"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <h2 data-animate-item className="section-title">
          {content.audienceHeading}
        </h2>
        <p
          data-animate-item
          className="max-w-[70ch] text-base leading-7 text-stone-600 lg:pt-3"
        >
          {content.audienceText}
        </p>
      </div>
    </section>
  );
}
