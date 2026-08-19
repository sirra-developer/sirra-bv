import type { PhilosophyContent } from "./types";

export function PhilosophyHero({ content }: { content: PhilosophyContent }) {
  return (
    <section
      data-animate-section
      className="px-6 pt-16 pb-14 sm:pt-24 sm:pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <p data-animate-item className="eyebrow">
          Onze filosofie
        </p>
        <h1
          data-animate-item
          className="text-sirra-green mt-7 max-w-[15ch] text-5xl leading-[1.02] font-semibold tracking-[-.05em] text-balance sm:text-6xl lg:text-[4rem]"
        >
          {content.heading}
        </h1>
        <p
          data-animate-item
          className="mt-9 max-w-[70ch] text-lg leading-8 whitespace-pre-line text-stone-600"
        >
          {content.introduction}
        </p>
      </div>
    </section>
  );
}
