import type { Metadata } from "next";
import { client } from "../../sanity/lib/client";
import { isSanityConfigured } from "../../sanity/env";
import { SERVICES_PAGE_QUERY } from "../../sanity/lib/queries";
import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";
import { SectionAnimations } from "../components/SectionAnimations";
import { ServicesCardStack } from "../components/services/ServicesCardStack";
import { ServicesHero } from "../components/services/ServicesHero";
import { ServicesScan } from "../components/services/ServicesScan";
import type {
  ServiceAreaContent,
  ServicesIntroContent,
  ServicesScanContent,
} from "../components/services/types";

export const metadata: Metadata = {
  title: "Diensten | SIRRA",
  description: "Van de eerste ontwikkelvraag tot realisatie.",
};
export const revalidate = 60;
const intro: ServicesIntroContent = {
  heading: "Van de eerste ontwikkelvraag tot realisatie.",
  introduction:
    "Vier focusgebieden. In de praktijk lopen ze door elkaar heen. Een businesscase die niet sluit is zelden alleen een rekenprobleem.\n\nWij werken niet met een standaardaanpak, omdat geen twee warmteprojecten dezelfde route lopen. Wat wel vastligt is waar wij naar kijken: de samenhang tussen strategie, techniek, organisatie en uitvoering.",
};
const areas: ServiceAreaContent[] = [
  {
    number: "01",
    title: "Strategische vraagstukken",
    text: "Wat wil je bereiken, wat is haalbaar, en welke route brengt je daar?\n\nWij bepalen de tender-, subsidie- en vergunningenstrategie in samenhang. Hoe je aanbesteedt bepaalt welke partijen zich melden. Welke subsidieroute je kiest bepaalt of de case rond komt. Hoe je het vergunningentraject inricht bepaalt of je over drie jaar begint of over zes. Die keuzes worden vaak los van elkaar gemaakt. Wij leggen ze naast elkaar, aan het begin.\n\nWij bouwen businesscases die financiering, bestuur en toezicht doorstaan.\n\nWij geven een project niet op omdat de eerste som niet uitkomt. Er is bijna altijd een route die wél werkt: een andere fasering, een ander contract, een andere combinatie van bronnen. Die zoeken wij, tot hij er is. Inclusief de besluiten die daarvoor nodig zijn.\n\nEn is die route er niet, dan weet je dat nu in plaats van over drie jaar.",
  },
  {
    number: "02",
    title: "Projectontwikkeling",
    text: "Van propositie naar project, en van project naar investeringsbesluit.\n\nWij brengen partners, financiering, contractvorm en fasering bij elkaar en structureren het geheel. Complexe warmteprojecten kennen tientallen afhankelijkheden. Wij maken ze expliciet en zorgen dat het investeringsbesluit voorbereid op tafel komt.\n\nNiet als verrassing. Besluitvormingsgereed.",
  },
  {
    number: "03",
    title: "Technische ontwikkeling",
    text: "Bronkeuze, temperatuurniveau, tracérichting, fasering. Het lijken technische vragen, maar het zijn strategische keuzes met een technische inhoud. Ze bepalen dertig jaar exploitatie.\n\nWij bepalen de technische richting en bewaken die door het hele traject. De engineering en detailberekeningen laten wij aan vaste technische partners, die dat beter kunnen dan wij. Wij spreken hun taal zonder er belang bij te hebben, en dat is precies waarom onze weging bruikbaar is.",
  },
  {
    number: "04",
    title: "Organisatie",
    text: "Een investeringsbesluit vraagt dat techniek, financiering, governance en uitvoering op hetzelfde moment kloppen. Dat vraagt om een organisatie die dat samenspel aankan.\n\nWij bouwen die op. Rollen en mandaten, besluitvormingsstructuur, processen voor inkoop en projectbeheersing, de eerste mensen op de juiste plek. Van een projectteam bij een gemeente tot een warmtebedrijf dat vanaf nul operationeel moet worden.\n\nWij doen dat van binnenuit, met de handen eraan. Geen blauwdruk, wel een organisatie die het zonder ons redt.",
  },
];
const scan: ServicesScanContent = {
  eyebrow: "De SIRRA-scan",
  heading: "Wil je weten waar je project staat?",
  text: "Binnen een week weet je waar je project staat.\n\nWij doorlichten lopende projecten met de SIRRA-scan. Vaste thema’s, vaste vragen, in een vaste volgorde. Drie dagen onderzoek: wij lezen de stukken en spreken de mensen die het weten. Daarna een oordeel op tafel.\n\nGeen lijst met bevindingen, maar een antwoord: wat er speelt, hoe zwaar dat weegt, en wat de eerstvolgende stap is.\n\nVoor een warmteorganisatie werkt de scan hetzelfde, maar duurt hij langer. Meer mensen, meer processen, meer geschiedenis.",
  action: "Vraag een SIRRA-scan aan",
  actionUrl: "/contact",
};
async function getContent() {
  if (!isSanityConfigured) return { intro, areas, scan };
  try {
    const data = await client.fetch<{
      intro?: ServicesIntroContent;
      area1?: ServiceAreaContent;
      area2?: ServiceAreaContent;
      area3?: ServiceAreaContent;
      area4?: ServiceAreaContent;
      scan?: ServicesScanContent;
    }>(SERVICES_PAGE_QUERY);
    return {
      intro: { ...intro, ...data?.intro },
      areas: [
        { ...areas[0], ...data?.area1 },
        { ...areas[1], ...data?.area2 },
        { ...areas[2], ...data?.area3 },
        { ...areas[3], ...data?.area4 },
      ],
      scan: { ...scan, ...data?.scan },
    };
  } catch {
    return { intro, areas, scan };
  }
}
export default async function ServicesPage() {
  const content = await getContent();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteHeader />
      <main>
        <SectionAnimations>
          <ServicesHero content={content.intro} />
          <ServicesCardStack areas={content.areas} />
          <ServicesScan content={content.scan} />
        </SectionAnimations>
      </main>
      <Footer />
    </div>
  );
}
