import type { PhilosophyContent } from "./types";

export function SirraPrinciples({ content }: { content: PhilosophyContent }) {
  return (
    <section
      data-animate-section
      className="bg-sirra-taupe-light px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <h2
            data-animate-item
            className="text-sirra-green text-5xl leading-none font-semibold tracking-[-.05em] sm:text-6xl"
          >
            {content.sirraHeading}
          </h2>
          <p
            data-animate-item
            className="mt-6 max-w-[70ch] text-lg leading-8 text-stone-600"
          >
            {content.sirraIntroduction}
          </p>
        </div>
        <ol className="border-sirra-taupe/35 mt-12 border-t sm:mt-16">
          {content.principles.map((principle, index) => (
            <li
              data-animate-item
              key={
                principle._key ||
                `${principle.letter}-${principle.title}-${index}`
              }
              className="border-sirra-taupe/35 grid gap-4 border-b py-7 sm:grid-cols-[4rem_12rem_1fr] sm:items-start sm:gap-6"
            >
              <span className="text-sirra-gold text-4xl leading-none font-semibold">
                {principle.letter}
              </span>
              <h3 className="text-sirra-green text-xl font-semibold">
                {principle.title}
              </h3>
              <p className="max-w-[70ch] text-base leading-7 text-stone-600">
                {principle.text}
              </p>
              <span className="sr-only">Stap {index + 1}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
