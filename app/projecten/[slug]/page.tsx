import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { fetchSanity } from "../../../sanity/lib/live";
import {
  PROJECT_QUERY,
  PROJECTS_VISIBILITY_QUERY,
} from "../../../sanity/lib/queries";
import { Footer } from "../../components/Footer";
import { SiteHeader } from "../../components/SiteHeader";

type Project = {
  title: string;
  clientName?: string;
  assignment: string;
  role: string;
  result: string;
  detailBlocks?: ProjectDetailBlock[];
};

type ProjectImage = {
  _key: string;
  _type: "projectImage";
  url?: string;
  alt?: string;
  caption?: string;
};

type ProjectTextBlock = {
  _key: string;
  _type: "projectTitle" | "projectSubtitle" | "projectParagraph";
  text: string;
};

type ProjectRichTextBlock = {
  _key: string;
  _type: "projectTextBlock";
  content: PortableTextBlock[];
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

type ProjectDetailBlock =
  ProjectTextBlock | ProjectRichTextBlock | ProjectImage;

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-sirra-green mt-14 text-4xl font-semibold tracking-[-0.04em] text-balance first:mt-0">
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
      <ul className="mt-5 max-w-[70ch] list-disc space-y-3 pl-6 text-lg leading-8 text-stone-600">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mt-5 max-w-[70ch] list-decimal space-y-3 pl-6 text-lg leading-8 text-stone-600">
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let project: Project | null = null;
  let visible = false;
  try {
    [visible, project] = await Promise.all([
      fetchSanity<boolean>(PROJECTS_VISIBILITY_QUERY),
      fetchSanity<Project | null>(PROJECT_QUERY, { slug }),
    ]);
  } catch {
    notFound();
  }
  if (!visible || !project) notFound();

  const sections = [
    { number: "01", heading: "Opgave", text: project.assignment },
    { number: "02", heading: "Rol", text: project.role },
    { number: "03", heading: "Resultaat", text: project.result },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      <SiteHeader />
      <main>
        <section className="px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/projecten"
              className="border-sirra-green text-sirra-green hover:bg-sirra-green inline-flex rounded-full border-2 px-5 py-2.5 font-semibold transition-colors hover:text-white"
            >
              Terug naar projecten
            </Link>
            <div className="mt-14">
              <div>
                {project.clientName ? (
                  <p className="eyebrow">{project.clientName}</p>
                ) : null}
                <h1 className="text-sirra-green mt-5 max-w-[17ch] text-5xl leading-[1.02] font-semibold tracking-[-.05em] text-balance sm:text-6xl">
                  {project.title}
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-sirra-taupe-light px-6 py-20 sm:py-28">
          <div className="divide-sirra-taupe/30 mx-auto max-w-6xl divide-y">
            {sections.map((section) => (
              <article
                key={section.number}
                className="grid gap-6 py-10 first:pt-0 last:pb-0 lg:grid-cols-[0.35fr_1.65fr] lg:gap-16"
              >
                <div>
                  <span className="text-sirra-gold text-sm font-semibold">
                    {section.number}
                  </span>
                  <h2 className="text-sirra-green mt-3 text-3xl font-semibold tracking-[-0.04em]">
                    {section.heading}
                  </h2>
                </div>
                <p className="max-w-[70ch] text-lg leading-8 whitespace-pre-line text-stone-600">
                  {section.text}
                </p>
              </article>
            ))}
          </div>
        </section>
        {project.detailBlocks?.length ? (
          <section className="px-6 py-20 sm:py-28">
            <article className="mx-auto max-w-6xl">
              {project.detailBlocks.map((block) => {
                if (block._type === "projectTitle") {
                  return (
                    <h2
                      key={block._key}
                      className="text-sirra-green mt-14 text-4xl font-semibold tracking-[-0.04em] text-balance first:mt-0"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block._type === "projectSubtitle") {
                  return (
                    <h3
                      key={block._key}
                      className="text-sirra-green mt-10 text-2xl font-semibold tracking-[-0.03em] text-balance"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block._type === "projectParagraph") {
                  return (
                    <p
                      key={block._key}
                      className="mt-5 max-w-[70ch] text-lg leading-8 whitespace-pre-line text-stone-600"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block._type === "projectTextBlock") {
                  return (
                    <div key={block._key}>
                      <PortableText
                        value={block.content}
                        components={portableTextComponents}
                      />
                    </div>
                  );
                }
                if (block._type !== "projectImage" || !block.url) return null;
                return (
                  <figure key={block._key} className="my-12">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-stone-200">
                      <Image
                        src={block.url}
                        alt={block.alt ?? "Projectfoto"}
                        fill
                        sizes="(min-width: 1024px) 72rem, 100vw"
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
              })}
            </article>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
