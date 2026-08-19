import type { Metadata } from "next";
import { client } from "../../sanity/lib/client";
import { isSanityConfigured } from "../../sanity/env";
import { PHILOSOPHY_PAGE_QUERY } from "../../sanity/lib/queries";
import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";
import { SectionAnimations } from "../components/SectionAnimations";
import { PhilosophyClosing } from "../components/philosophy/PhilosophyClosing";
import { PhilosophyHero } from "../components/philosophy/PhilosophyHero";
import { SirraPrinciples } from "../components/philosophy/SirraPrinciples";
import type { PhilosophyContent } from "../components/philosophy/types";

export const metadata: Metadata = {
  title: "Onze filosofie | SIRRA",
  description: "Betrokken tot het werkt. Ontdek de filosofie achter SIRRA.",
};
export const revalidate = 60;

const fallbackContent: PhilosophyContent = {
  heading: "Betrokken tot het werkt.",
  introduction:
    "De warmtetransitie vraagt om creativiteit en doorzettingsvermogen.\n\nOm iemand die blijft zitten als het ingewikkeld wordt. Die de keuze agendeert die iedereen liever vooruitschuift. Die geen rapporten schrijft, maar projecten besluitvormingsgereed aflevert.\n\nDat is de rol die wij pakken.",
  sirraHeading: "SIRRA",
  sirraIntroduction:
    "Onze naam is geen toevallige klank. Het zijn de vijf stappen van elk traject dat werkt.",
  principles: [
    {
      letter: "S",
      title: "Strategie",
      text: "Eerst de vraag achter de vraag. Wat wil je bereiken, en wat is daarvoor nodig?",
    },
    {
      letter: "I",
      title: "Impact",
      text: "Niet elk project verdient doorgang. Wij helpen kiezen waar het verschil zit.",
    },
    {
      letter: "R",
      title: "Realisatie",
      text: "Een plan is pas iets waard als het beweegt.",
    },
    {
      letter: "R",
      title: "Regie",
      text: "Overzicht houden waar veel partijen, belangen en tempo’s samenkomen.",
    },
    {
      letter: "A",
      title: "Actie",
      text: "Doorpakken. Ook als het ongemakkelijk wordt.",
    },
  ],
  closingText:
    "Betrokkenheid stopt bij ons niet bij de oplevering van een document. Wij blijven tot het besluit genomen is en het project loopt.",
  closingAction: "Bekijk onze focusgebieden",
  closingActionUrl: "/diensten",
};

async function getContent(): Promise<PhilosophyContent> {
  if (!isSanityConfigured) return fallbackContent;
  try {
    const sections = await client.fetch<
      Record<string, Partial<PhilosophyContent> | null>
    >(PHILOSOPHY_PAGE_QUERY);
    const content = Object.assign(
      {},
      ...Object.values(sections ?? {}).map((section) =>
        Object.fromEntries(
          Object.entries(section ?? {}).filter(([, value]) => value != null),
        ),
      ),
    );
    return { ...fallbackContent, ...content };
  } catch {
    return fallbackContent;
  }
}

export default async function PhilosophyPage() {
  const content = await getContent();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteHeader />
      <main>
        <SectionAnimations>
          <PhilosophyHero content={content} />
          <SirraPrinciples content={content} />
          <PhilosophyClosing content={content} />
        </SectionAnimations>
      </main>
      <Footer />
    </div>
  );
}
