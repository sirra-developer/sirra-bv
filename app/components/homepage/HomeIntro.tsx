import type { HomePageContent } from "./types";

export function HomeIntro({ content }: { content: HomePageContent }) {
  return (
    <section data-animate-section className="px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto max-w-6xl px-2 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-12">
        <p
          data-animate-item
          className="text-sirra-taupe flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.22em] uppercase"
        >
          <span className="bg-sirra-gold h-px w-9" />
          {content.eyebrow}
        </p>
        <h1
          data-animate-item
          className="text-sirra-green mt-8 max-w-[24ch] text-[clamp(2.35rem,3.5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance"
        >
          {content.heading}
        </h1>
        <p
          data-animate-item
          className="mt-8 max-w-2xl text-lg leading-8 whitespace-pre-line text-stone-600"
        >
          {content.problemText}
        </p>
      </div>
    </section>
  );
}
