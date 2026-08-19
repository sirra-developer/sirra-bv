import { client } from "../sanity/lib/client";
import { isSanityConfigured } from "../sanity/env";
import {
  HOME_PAGE_QUERY,
  LATEST_PROJECTS_QUERY,
  PROJECTS_VISIBILITY_QUERY,
} from "../sanity/lib/queries";
import { Footer } from "./components/Footer";
import { SiteHeader } from "./components/SiteHeader";
import { SectionAnimations } from "./components/SectionAnimations";
import { HomeAudience } from "./components/homepage/HomeAudience";
import { HomeChainKnowledge } from "./components/homepage/HomeChainKnowledge";
import { HomeClosingCta } from "./components/homepage/HomeClosingCta";
import { HomeCollaboration } from "./components/homepage/HomeCollaboration";
import { HomeFocusAreas } from "./components/homepage/HomeFocusAreas";
import { HomeIntro } from "./components/homepage/HomeIntro";
import {
  HomeProjects,
  type HomeProject,
} from "./components/homepage/HomeProjects";
import { HomeScan } from "./components/homepage/HomeScan";
import { HomeSolution } from "./components/homepage/HomeSolution";
import type { HomePageContent } from "./components/homepage/types";

export const revalidate = 60;

const fallbackContent: HomePageContent = {
  eyebrow: "Van strategie naar resultaat",
  heading: "Warmteprojecten stranden zelden op ambitie.",
  problemText:
    "Ze stranden op uitgestelde keuzes. Op onvoldoende kennis van de keten. Op een gebrekkige verbinding tussen strategie en uitvoering.",
  solutionHeading: "Daarom is er SIRRA.",
  solutionText:
    "Een adviesbureau voor organisaties die warmteprojecten niet alleen willen bedenken, maar ook daadwerkelijk willen ontwikkelen en realiseren.",
  primaryAction: "Zo werken wij",
  primaryActionUrl: "/onze-filosofie",
  secondaryAction: "Neem contact op",
  secondaryActionUrl: "/contact",
  principles: "Strategie · Impact · Realisatie · Regie · Actie",
  expertiseEyebrow: "Onze focusgebieden",
  expertiseHeading: "Wij verbinden wat los van elkaar staat",
  expertiseText:
    "Strategie. Businesscase. Techniek. Governance. Uitvoering.\n\nVan de eerste ontwikkelvraag tot het investeringsbesluit. Van projectorganisatie en aanbesteding tot realisatie.",
  expertiseItems: [
    "Strategische vraagstukken",
    "Projectontwikkeling",
    "Technische ontwikkeling",
    "Organisatie",
  ].map((title, index) => ({
    number: `0${index + 1}`,
    title,
    url: `/diensten#focusgebied-0${index + 1}`,
  })),
  chainEyebrow: "Ketenkennis",
  chainHeading:
    "Onze kracht? Wij zien de gevolgen van een keuze voordat ze zich voordoen.",
  chainText:
    "De beslissingen aan het begin van een warmteproject bepalen of alles bij elkaar komt in de vorm van een investeringsbeslissing, en daarmee of het project er ooit komt. Diezelfde beslissingen bepalen de exploitatie voor decennia.\n\nWij overzien die keten en het hele speelveld: van bron tot aansluiting, van ambitie tot financierbaar project, van ontwerp tot exploitatie.\n\nDat is wat wij ketenkennis noemen: niet elke schakel kennen, maar weten hoe ze op elkaar inwerken.",
  chainHighlight:
    "Een aanvoertemperatuur, een tracékeuze, een contractvorm, een afnamegarantie. Het lijkt techniek. Het is rendement.",
  collaborationEyebrow: "Samenspel",
  collaborationHeading:
    "Projecten stranden niet op een gebrek aan plannen, maar op een gebrek aan samenspel",
  collaborationText:
    "Een investeringsbesluit vraagt dat techniek, financiering, governance en uitvoering op hetzelfde moment kloppen. In de meeste projecten zitten die competenties bij verschillende partijen, met verschillende belangen en een eigen tempo.",
  collaborationHighlight:
    "Wij brengen ze samen. En waar ze ontbreken, bouwen wij ze op, tot de organisatie het zelf kan.",
  scanEyebrow: "De SIRRA-scan",
  scanHeading: "Wil je weten waar je project staat?",
  scanText:
    "Binnen een week weet je waar je project staat.\n\nDat is wat de SIRRA-scan oplevert. Een beproefde systematiek, toegepast door mensen die zulke trajecten zelf hebben geleid.",
  scanAction: "Meer over de SIRRA-scan",
  scanActionUrl: "/diensten",
  audienceHeading: "Voor wie wij werken",
  audienceText:
    "Wij werken voor organisaties die een warmteproject van papier naar realisatie moeten brengen. Meestal komen ze bij ons als het project stilstaat, als de businesscase niet rond komt, of als de organisatie de opgave is ontgroeid.",
  ctaHeading:
    "Geen standaardadvies. Geen rapport voor de la. Wel scherpte, richting en betrokkenheid tot het werkt.",
  ctaAction: "Plan een gesprek",
  ctaActionUrl: "/contact",
};

async function getHomePage(): Promise<HomePageContent> {
  if (!isSanityConfigured) return fallbackContent;
  try {
    const sections =
      await client.fetch<Record<string, Partial<HomePageContent> | null>>(
        HOME_PAGE_QUERY,
      );
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

async function getVisibleProjects(): Promise<HomeProject[]> {
  if (!isSanityConfigured) return [];
  try {
    const visible = await client.fetch<boolean>(PROJECTS_VISIBILITY_QUERY);
    if (!visible) return [];
    return await client.fetch<HomeProject[]>(LATEST_PROJECTS_QUERY);
  } catch {
    return [];
  }
}

export default async function Home() {
  const [content, projects] = await Promise.all([
    getHomePage(),
    getVisibleProjects(),
  ]);
  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      <SiteHeader />
      <main>
        <SectionAnimations>
          <HomeIntro content={content} />
          <HomeSolution content={content} />
          <HomeFocusAreas content={content} />
          <HomeChainKnowledge content={content} />
          <HomeCollaboration content={content} />
          <HomeProjects projects={projects} />
          <HomeScan content={content} />
          <HomeAudience content={content} />
          <HomeClosingCta content={content} />
        </SectionAnimations>
      </main>
      <Footer />
    </div>
  );
}
