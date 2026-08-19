import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { LEGAL_PAGE_QUERY } from "../../../sanity/lib/queries";
import { Footer } from "../Footer";
import { SiteHeader } from "../SiteHeader";

type TextBlock = {
  _key: string;
  _type: "legalTitle" | "legalSubtitle" | "legalParagraph";
  text: string;
};

type ListBlock = {
  _key: string;
  _type: "legalBulletList" | "legalNumberedList";
  items: string[];
};

type LegalContent = {
  pageTitle: string;
  intro?: string;
  blocks: Array<TextBlock | ListBlock>;
};

export async function LegalPage({ documentId }: { documentId: string }) {
  let content: LegalContent | null = null;
  try {
    content = await client.fetch<LegalContent | null>(LEGAL_PAGE_QUERY, {
      id: documentId,
    });
  } catch {
    notFound();
  }
  if (!content) notFound();

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      <SiteHeader />
      <main>
        <header className="bg-sirra-taupe-light px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow">Juridisch</p>
            <h1 className="text-sirra-green mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.045em] text-balance sm:text-5xl">
              {content.pageTitle}
            </h1>
            {content.intro ? (
              <p className="mt-7 max-w-[70ch] text-xl leading-9 text-stone-600">
                {content.intro}
              </p>
            ) : null}
          </div>
        </header>

        <section className="bg-background px-6 py-16 sm:py-24">
          <article className="mx-auto max-w-4xl">
            {content.blocks.map((block) => {
              if (block._type === "legalTitle") {
                return (
                  <h2
                    key={block._key}
                    className="text-sirra-green mt-14 text-3xl font-semibold tracking-[-0.04em] text-balance first:mt-0 sm:text-4xl"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block._type === "legalSubtitle") {
                return (
                  <h3
                    key={block._key}
                    className="text-sirra-green mt-10 text-2xl font-semibold tracking-[-0.03em] text-balance"
                  >
                    {block.text}
                  </h3>
                );
              }
              if (block._type === "legalParagraph") {
                return (
                  <p
                    key={block._key}
                    className="mt-5 max-w-[70ch] text-lg leading-8 whitespace-pre-line text-stone-600"
                  >
                    {block.text}
                  </p>
                );
              }

              if (
                block._type !== "legalBulletList" &&
                block._type !== "legalNumberedList"
              ) {
                return null;
              }

              const List = block._type === "legalNumberedList" ? "ol" : "ul";
              return (
                <List
                  key={block._key}
                  className={`${block._type === "legalNumberedList" ? "list-decimal" : "list-disc"} mt-5 max-w-[70ch] space-y-2 pl-6 text-lg leading-8 text-stone-600`}
                >
                  {block.items.map((item, index) => (
                    <li key={`${block._key}-${index}`}>{item}</li>
                  ))}
                </List>
              );
            })}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
