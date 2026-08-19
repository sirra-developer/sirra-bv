import type { HomePageContent } from "./types";
export function HomeChainKnowledge({ content }: { content: HomePageContent }) {
  return (
    <section
      data-animate-section
      className="bg-sirra-taupe-light px-6 py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div data-animate-item>
          <p className="eyebrow">{content.chainEyebrow}</p>
          <h2 className="section-title mt-5">{content.chainHeading}</h2>
        </div>
        <div
          data-animate-item
          className="max-w-[70ch] text-base leading-7 whitespace-pre-line text-stone-700 lg:pt-6"
        >
          <p>{content.chainText}</p>
          <p className="border-sirra-gold text-sirra-green my-5 border-l-2 pl-5 font-semibold">
            {content.chainHighlight}
          </p>
        </div>
      </div>
    </section>
  );
}
