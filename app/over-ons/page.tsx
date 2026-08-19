import type { Metadata } from "next";
import Link from "next/link";
import { isSanityConfigured } from "../../sanity/env";
import { client } from "../../sanity/lib/client";
import { ABOUT_PAGE_QUERY } from "../../sanity/lib/queries";
import {
  EmployeeProfiles,
  type EmployeeProfile,
} from "../components/employees/EmployeeProfiles";
import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";
import { SectionAnimations } from "../components/SectionAnimations";

export const metadata: Metadata = {
  title: "Over ons | SIRRA",
  description: "Wij hebben op elke stoel aan tafel gezeten.",
};
export const revalidate = 60;

type Value = { _key?: string; title: string; text: string };
type AboutContent = {
  intro: { heading: string; introduction: string };
  values: { heading: string; values: Value[] };
  team: {
    heading: string;
    action: string;
    actionUrl: string;
    members: Array<Omit<EmployeeProfile, "_id"> & { _key: string }>;
  };
};

const fallbackContent: AboutContent = {
  intro: {
    heading: "Wij hebben op elke stoel aan tafel gezeten.",
    introduction:
      "Als opdrachtgever die de opgave uitzet. Als ontwikkelaar die de oplossing bedenkt en realiseerbaar maakt. Als opdrachtnemer die het moet waarmaken. Als adviseur die ertussen zit. Als bestuurder die er verantwoording over aflegt.\n\nDaardoor weten wij hoe een vraag aan de ene kant van de tafel aankomt aan de andere. Waar de belangen liggen, en wat er nodig is om partijen dezelfde kant op te krijgen.\n\nDie ervaring hebben wij samengebracht in SIRRA.",
  },
  values: {
    heading: "Waar wij voor staan",
    values: [
      {
        title: "Wie het adviseert, draagt het.",
        text: "Bij ons is degene die het advies geeft ook degene die het besluit mee moet verdedigen.",
      },
      {
        title: "In de organisatie, niet ernaast.",
        text: "Wij schrijven niet op hoe een warmteorganisatie eruit moet zien. Wij nemen de rol zelf, tot iemand anders hem kan overnemen.",
      },
      {
        title: "Onafhankelijk.",
        text: "Wij hebben geen belang bij een bepaalde techniek of leverancier. Dat maakt ons advies bruikbaar.",
      },
      {
        title: "Gericht op de lange termijn.",
        text: "De warmtetransitie is een opgave van decennia. Wij bouwen een bureau dat er over tien jaar nog staat, en leiden de volgende generatie warmteprofessionals op.",
      },
    ],
  },
  team: {
    heading: "Het team",
    action: "Kom kennismaken",
    actionUrl: "/contact",
    members: [],
  },
};

const profileCopy: Record<
  string,
  Pick<EmployeeProfile, "role" | "biography">
> = {
  "jamal ghabri": {
    role: "Managing Director",
    biography:
      "Jamal zorgt voor structuur waar overzicht ontbreekt, en houdt partijen bij elkaar als het schuurt. Hij stuurt op mensen, omdat projecten zelden vastlopen op inhoud.",
  },
  "marco van soerland": {
    role: "Managing Partner",
    biography:
      "Marco kijkt verder vooruit dan de opgave van vandaag en vertaalt dat naar wat er nu moet gebeuren. Hij komt zelden terug met een probleem, meestal met een route.",
  },
  "arjan ten elshof": {
    role: "Partner",
    biography:
      "Arjan kent de bestuurskamer van binnenuit. Hij toetst wat er ligt en stuurt door tot het juiste besluit genomen wordt. Niet het makkelijkste.",
  },
};

const defaultTeam: EmployeeProfile[] = [
  {
    _id: "employee-jamal-ghabri",
    firstName: "Jamal",
    lastName: "Ghabri",
    ...profileCopy["jamal ghabri"],
  },
  {
    _id: "employee-marco-van-soerland",
    firstName: "Marco",
    lastName: "van Soerland",
    ...profileCopy["marco van soerland"],
  },
  {
    _id: "employee-arjan-ten-elshof",
    firstName: "Arjan",
    lastName: "ten Elshof",
    ...profileCopy["arjan ten elshof"],
  },
];

async function getContent() {
  if (!isSanityConfigured) return fallbackContent;
  try {
    const data = await client.fetch<Partial<AboutContent>>(ABOUT_PAGE_QUERY);
    return {
      intro: { ...fallbackContent.intro, ...data?.intro },
      values: { ...fallbackContent.values, ...data?.values },
      team: { ...fallbackContent.team, ...data?.team },
    };
  } catch {
    return fallbackContent;
  }
}

export default async function AboutPage() {
  const content = await getContent();
  const employees = content.team.members.length
    ? content.team.members.map((member) => ({ ...member, _id: member._key }))
    : defaultTeam;
  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      <SiteHeader />
      <main>
        <SectionAnimations>
          <section
            data-animate-section
            className="px-6 pt-16 pb-20 sm:pt-24 sm:pb-28"
          >
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow">Over ons</p>
              <h1
                data-animate-item
                className="text-sirra-green mt-7 max-w-[17ch] text-5xl leading-[1.02] font-semibold tracking-[-.05em] text-balance sm:text-6xl lg:text-[4rem]"
              >
                {content.intro.heading}
              </h1>
              <div
                data-animate-item
                className="mt-10 max-w-[70ch] text-lg leading-8 whitespace-pre-line text-stone-600"
              >
                {content.intro.introduction}
              </div>
            </div>
          </section>

          <section
            data-animate-section
            className="bg-sirra-taupe-light px-6 py-20 sm:py-28"
          >
            <div className="mx-auto max-w-6xl">
              <h2 data-animate-item className="section-title text-sirra-green">
                {content.values.heading}
              </h2>
              <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
                {content.values.values.map((value, index) => (
                  <article
                    data-animate-item
                    key={value._key ?? value.title}
                    className="border-sirra-taupe/30 border-t pt-7"
                  >
                    <span className="text-sirra-gold text-sm font-semibold">
                      0{index + 1}
                    </span>
                    <h3 className="text-sirra-green mt-5 text-2xl font-semibold tracking-[-0.035em]">
                      {value.title}
                    </h3>
                    <p className="mt-4 max-w-[58ch] leading-7 text-stone-600">
                      {value.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section data-animate-section className="px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow">SIRRA</p>
              <h2
                data-animate-item
                className="section-title text-sirra-green mt-5"
              >
                {content.team.heading}
              </h2>
              {employees.length > 0 ? (
                <EmployeeProfiles employees={employees} />
              ) : null}
              <Link
                href={content.team.actionUrl}
                className="bg-sirra-gold text-sirra-green hover:bg-sirra-green mt-14 inline-flex rounded-full px-8 py-4 font-semibold transition-colors duration-300 hover:text-white"
              >
                {content.team.action}
              </Link>
            </div>
          </section>
        </SectionAnimations>
      </main>
      <Footer />
    </div>
  );
}
