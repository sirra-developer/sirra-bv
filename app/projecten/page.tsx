import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "../../sanity/lib/client";
import { PROJECTS_PAGE_QUERY, PROJECTS_QUERY } from "../../sanity/lib/queries";
import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Projecten | SIRRA",
  description: "Wat wij hebben neergezet.",
};
export const revalidate = 60;

type PageContent = {
  visible: boolean;
  heading: string;
  trajectoryHeading: string;
  trajectoryText: string;
  casesHeading: string;
};
type ProjectSummary = {
  _id: string;
  title: string;
  clientName?: string;
  slug: string;
  assignment: string;
  clientLogo?: string;
  thumbnail?: string;
};

export default async function ProjectsPage() {
  let content: PageContent | null = null;
  let projects: ProjectSummary[] = [];
  try {
    [content, projects] = await Promise.all([
      client.fetch<PageContent | null>(PROJECTS_PAGE_QUERY),
      client.fetch<ProjectSummary[]>(PROJECTS_QUERY),
    ]);
  } catch {
    notFound();
  }
  if (!content?.visible) notFound();
  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      <SiteHeader />
      <main>
        <section className="px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow">Projecten</p>
            <h1 className="text-sirra-green mt-7 max-w-[16ch] text-5xl leading-[1.02] font-semibold tracking-[-.05em] text-balance sm:text-6xl lg:text-[4rem]">
              {content.heading}
            </h1>
          </div>
        </section>

        <section className="bg-sirra-taupe-light px-6 py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <h2 className="section-title text-sirra-green max-w-[14ch]">
              {content.trajectoryHeading}
            </h2>
            <div className="max-w-[70ch] text-lg leading-8 whitespace-pre-line text-stone-600">
              {content.trajectoryText}
            </div>
          </div>
        </section>

        {projects.length ? (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <h2 className="section-title text-sirra-green">
                {content.casesHeading}
              </h2>
              <ul className="mt-12 grid gap-6 sm:grid-cols-2">
                {projects.map((project, index) => (
                  <li key={project._id}>
                    <Link
                      href={`/projecten/${project.slug}`}
                      className="bg-sirra-taupe-light group block overflow-hidden rounded-[2rem] transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                        <Image
                          src={
                            project.thumbnail ??
                            `https://placehold.co/1000x750/${index % 2 ? "c7b49d" : "b9c5bb"}/173b2b/png?text=Project+${index + 1}`
                          }
                          alt={
                            project.thumbnail
                              ? `Projectafbeelding voor ${project.title}`
                              : `Tijdelijke projectafbeelding voor ${project.title}`
                          }
                          fill
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                          sizes="(min-width: 640px) 45vw, 90vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <p className="text-sirra-gold absolute top-6 left-6 text-sm font-semibold">
                          0{index + 1}
                        </p>
                        {project.clientLogo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.clientLogo}
                            alt={
                              project.clientName
                                ? `Logo van ${project.clientName}`
                                : "Klantlogo"
                            }
                            className="absolute right-5 bottom-5 h-14 max-w-40 rounded-2xl bg-white/95 object-contain object-right p-3 shadow-sm"
                          />
                        ) : null}
                      </div>
                      <div className="p-8 sm:p-10">
                        {project.clientName ? (
                          <p className="eyebrow">{project.clientName}</p>
                        ) : null}
                        <h3 className="text-sirra-green group-hover:text-sirra-gold mt-3 text-3xl font-semibold tracking-[-0.04em]">
                          {project.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
