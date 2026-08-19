import type { ServiceAreaContent } from "./types";
import { splitServiceText } from "./splitServiceText";

export function ServiceArea({
  content,
  tinted = false,
}: {
  content: ServiceAreaContent;
  tinted?: boolean;
}) {
  const paragraphs = splitServiceText(content.text);

  return (
    <section
      id={`focusgebied-${content.number}`}
      data-animate-section
      className={`${tinted ? "bg-sirra-taupe-light" : "bg-transparent"} scroll-mt-20 px-6 py-16 sm:py-24`}
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
        <div data-animate-item>
          <p className="text-sirra-gold text-sm font-semibold tracking-[.18em] uppercase">
            Focusgebied {content.number}
          </p>
          <h2 className="section-title text-sirra-green mt-5">
            {content.title}
          </h2>
        </div>
        <div
          data-animate-item
          className="max-w-[70ch] space-y-5 text-base leading-7 text-stone-600 lg:pt-10"
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
