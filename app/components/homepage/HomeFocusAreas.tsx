import Link from "next/link";
import type { HomePageContent } from "./types";

export function HomeFocusAreas({ content }: { content: HomePageContent }) {
  return (
    <section
      data-animate-section
      className="mx-auto max-w-6xl px-6 py-16 sm:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div data-animate-item>
          <p className="eyebrow">{content.expertiseEyebrow}</p>
          <h2 className="section-title mt-5">{content.expertiseHeading}</h2>
          <div className="mt-6 max-w-lg text-base leading-7 whitespace-pre-line text-stone-600">
            {content.expertiseText}
          </div>
        </div>
        <div className="border-sirra-taupe/45 border-t">
          {content.expertiseItems.map((item, index) => (
            <Link
              data-animate-item
              key={item._key || item.title}
              href={item.url}
              className="group border-sirra-taupe/45 hover:text-sirra-green hover:bg-sirra-taupe-light/45 grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b py-5 transition-colors duration-300 ease-out"
            >
              <span className="text-sirra-taupe text-sm">
                {item.number || `0${index + 1}`}
              </span>
              <h3 className="text-lg font-semibold transition-transform duration-300 ease-out group-hover:translate-x-2 sm:text-xl">
                {item.title}
              </h3>
              <span
                aria-hidden
                className="text-xl transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
