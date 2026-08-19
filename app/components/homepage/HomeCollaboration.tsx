import type { HomePageContent } from "./types";
export function HomeCollaboration({ content }: { content: HomePageContent }) {
  return (
    <section data-animate-section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p data-animate-item className="eyebrow">
          {content.collaborationEyebrow}
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
          <h2 data-animate-item className="section-title">
            {content.collaborationHeading}
          </h2>
          <div
            data-animate-item
            className="text-base leading-7 text-stone-600 lg:pt-3"
          >
            <p>{content.collaborationText}</p>
            <p className="text-sirra-green mt-5 font-semibold">
              {content.collaborationHighlight}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
