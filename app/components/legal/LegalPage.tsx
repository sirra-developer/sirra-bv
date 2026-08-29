import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
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

type LegalRichTextBlock = {
  _key: string;
  _type: "legalTextBlock";
  content: PortableTextBlock[];
};

type ImageBlock = {
  _key: string;
  _type: "legalImage";
  url?: string;
  alt?: string;
  caption?: string;
};

type PortableTextChild = {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
};

type PortableTextBlock = {
  _key: string;
  _type: "block";
  style?: "normal" | "h2" | "h3";
  listItem?: "bullet" | "number";
  level?: number;
  markDefs?: Array<{
    _key: string;
    _type: "link";
    href?: string;
  }>;
  children?: PortableTextChild[];
};

type LegalContent = {
  pageTitle: string;
  intro?: string;
  blocks: Array<TextBlock | ListBlock | LegalRichTextBlock | ImageBlock>;
};

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-sirra-green mt-14 text-3xl font-semibold tracking-[-0.04em] text-balance first:mt-0 sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-sirra-green mt-10 text-2xl font-semibold tracking-[-0.03em] text-balance">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mt-5 max-w-[70ch] text-lg leading-8 text-stone-600">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-5 max-w-[70ch] list-disc space-y-2 pl-6 text-lg leading-8 text-stone-600">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mt-5 max-w-[70ch] list-decimal space-y-2 pl-6 text-lg leading-8 text-stone-600">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="pl-1">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="pl-1">{children}</li>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="text-sirra-green decoration-sirra-gold hover:text-sirra-gold font-semibold underline decoration-2 underline-offset-4 transition"
        >
          {children}
        </a>
      );
    },
  },
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
              if (block._type === "legalTextBlock") {
                return (
                  <div key={block._key}>
                    <PortableText
                      value={block.content}
                      components={portableTextComponents}
                    />
                  </div>
                );
              }
              if (block._type === "legalImage") {
                if (!block.url) return null;

                return (
                  <figure key={block._key} className="my-12 max-w-[70ch]">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-stone-200">
                      <Image
                        src={block.url}
                        alt={block.alt ?? "Afbeelding"}
                        fill
                        sizes="(min-width: 1024px) 56rem, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {block.caption ? (
                      <figcaption className="mt-3 text-sm text-stone-500">
                        {block.caption}
                      </figcaption>
                    ) : null}
                  </figure>
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
