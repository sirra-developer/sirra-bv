import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "../home/ArrowIcon";

export type HomeProject = {
  _id: string;
  title: string;
  clientName?: string;
  slug: string;
  assignment: string;
  thumbnail?: string;
};

export function HomeProjects({ projects }: { projects: HomeProject[] }) {
  if (!projects.length) return null;

  return (
    <section data-animate-section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          data-animate-item
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="eyebrow">Uit de praktijk</p>
            <h2 className="text-sirra-green mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Laatste projecten
            </h2>
          </div>
          <Link
            href="/projecten"
            className="text-sirra-green group inline-flex items-center gap-3 font-semibold"
          >
            Alle projecten
            <ArrowIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              data-animate-image
              key={project._id}
              href={`/projecten/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-stone-200">
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
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="text-sirra-green group-hover:bg-sirra-gold absolute right-5 bottom-5 flex size-12 items-center justify-center rounded-full bg-white transition-colors duration-300">
                  <ArrowIcon className="size-5" />
                </span>
              </div>
              {project.clientName ? (
                <p className="eyebrow mt-6">{project.clientName}</p>
              ) : null}
              <h3 className="text-sirra-green mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 line-clamp-3 max-w-lg leading-7 text-stone-600">
                {project.assignment}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
