import { defineArrayMember, defineField, defineType } from "sanity";
const pages = {
  list: [
    { title: "Homepage", value: "/" },
    { title: "Diensten", value: "/diensten" },
    {
      title: "Diensten · Strategische vraagstukken",
      value: "/diensten#focusgebied-01",
    },
    {
      title: "Diensten · Projectontwikkeling",
      value: "/diensten#focusgebied-02",
    },
    {
      title: "Diensten · Technische ontwikkeling",
      value: "/diensten#focusgebied-03",
    },
    {
      title: "Diensten · Organisatie",
      value: "/diensten#focusgebied-04",
    },
    { title: "Onze filosofie", value: "/onze-filosofie" },
    { title: "Over ons", value: "/over-ons" },
    { title: "Contact", value: "/contact" },
  ],
};
const preview = (title: string) => ({ prepare: () => ({ title }) });
const version = defineField({
  name: "contentVersion",
  title: "Contentversie",
  type: "string",
  initialValue: "1.6",
  readOnly: true,
  hidden: true,
});
const string = (name: string, title: string) =>
  defineField({ name, title, type: "string", validation: (r) => r.required() });
const text = (name: string, title: string, rows = 5) =>
  defineField({
    name,
    title,
    type: "text",
    rows,
    validation: (r) => r.required(),
  });
const url = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    options: pages,
    validation: (r) => r.required(),
  });

export const homeIntro = defineType({
  name: "homeIntro",
  title: "Introductie",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    eyebrow: "Van strategie naar resultaat",
    heading: "Warmteprojecten stranden zelden op ambitie.",
    problemText:
      "Ze stranden op uitgestelde keuzes. Op onvoldoende kennis van de keten. Op een gebrekkige verbinding tussen strategie en uitvoering.",
  },
  fields: [
    version,
    string("eyebrow", "Bovenkop"),
    string("heading", "H1"),
    text("problemText", "Probleemtekst"),
  ],
  preview: preview("Introductie"),
});
export const homeSolution = defineType({
  name: "homeSolution",
  title: "Daarom is er SIRRA",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    solutionHeading: "Daarom is er SIRRA.",
    solutionText:
      "Een adviesbureau voor organisaties die warmteprojecten niet alleen willen bedenken, maar ook daadwerkelijk willen ontwikkelen en realiseren.",
    principles: "Strategie · Impact · Realisatie · Regie · Actie",
    primaryAction: "Zo werken wij",
    primaryActionUrl: "/onze-filosofie",
    secondaryAction: "Neem contact op",
    secondaryActionUrl: "/contact",
  },
  fields: [
    version,
    string("solutionHeading", "Titel"),
    text("solutionText", "Tekst"),
    string("principles", "SIRRA-principes"),
    string("primaryAction", "Eerste knoptekst"),
    url("primaryActionUrl", "Bestemming eerste knop"),
    string("secondaryAction", "Tweede knoptekst"),
    url("secondaryActionUrl", "Bestemming tweede knop"),
  ],
  preview: preview("Daarom is er SIRRA"),
});
export const homeFocusAreas = defineType({
  name: "homeFocusAreas",
  title: "Focusgebieden",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
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
      _key: `focus-${index + 1}`,
      _type: "object",
      number: `0${index + 1}`,
      title,
      url: `/diensten#focusgebied-0${index + 1}`,
    })),
  },
  fields: [
    version,
    string("expertiseEyebrow", "Bovenkop"),
    string("expertiseHeading", "Titel"),
    text("expertiseText", "Tekst", 6),
    defineField({
      name: "expertiseItems",
      title: "Doorklikblokken",
      type: "array",
      validation: (r) => r.length(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            string("number", "Nummer"),
            string("title", "Titel"),
            url("url", "Bestemming"),
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        }),
      ],
    }),
  ],
  preview: preview("Focusgebieden"),
});
export const homeChainKnowledge = defineType({
  name: "homeChainKnowledge",
  title: "Ketenkennis",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    chainEyebrow: "Ketenkennis",
    chainHeading:
      "Onze kracht? Wij zien de gevolgen van een keuze voordat ze zich voordoen.",
    chainText:
      "De beslissingen aan het begin van een warmteproject bepalen of alles bij elkaar komt in de vorm van een investeringsbeslissing, en daarmee of het project er ooit komt. Diezelfde beslissingen bepalen de exploitatie voor decennia.\n\nWij overzien die keten en het hele speelveld: van bron tot aansluiting, van ambitie tot financierbaar project, van ontwerp tot exploitatie.\n\nDat is wat wij ketenkennis noemen: niet elke schakel kennen, maar weten hoe ze op elkaar inwerken.",
    chainHighlight:
      "Een aanvoertemperatuur, een tracékeuze, een contractvorm, een afnamegarantie. Het lijkt techniek. Het is rendement.",
  },
  fields: [
    version,
    string("chainEyebrow", "Bovenkop"),
    string("chainHeading", "Titel"),
    text("chainText", "Tekst", 10),
    text("chainHighlight", "Uitgelichte zin", 3),
  ],
  preview: preview("Ketenkennis"),
});
export const homeCollaboration = defineType({
  name: "homeCollaboration",
  title: "Samenspel",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    collaborationEyebrow: "Samenspel",
    collaborationHeading:
      "Projecten stranden niet op een gebrek aan plannen, maar op een gebrek aan samenspel",
    collaborationText:
      "Een investeringsbesluit vraagt dat techniek, financiering, governance en uitvoering op hetzelfde moment kloppen. In de meeste projecten zitten die competenties bij verschillende partijen, met verschillende belangen en een eigen tempo.",
    collaborationHighlight:
      "Wij brengen ze samen. En waar ze ontbreken, bouwen wij ze op, tot de organisatie het zelf kan.",
  },
  fields: [
    version,
    string("collaborationEyebrow", "Bovenkop"),
    string("collaborationHeading", "Titel"),
    text("collaborationText", "Tekst", 6),
    text("collaborationHighlight", "Uitgelichte zin", 3),
  ],
  preview: preview("Samenspel"),
});
export const homeScan = defineType({
  name: "homeScan",
  title: "SIRRA-scan",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    scanEyebrow: "De SIRRA-scan",
    scanHeading: "Wil je weten waar je project staat?",
    scanText:
      "Binnen een week weet je waar je project staat.\n\nDat is wat de SIRRA-scan oplevert. Een beproefde systematiek, toegepast door mensen die zulke trajecten zelf hebben geleid.",
    scanAction: "Meer over de SIRRA-scan",
    scanActionUrl: "/diensten",
  },
  fields: [
    version,
    string("scanEyebrow", "Bovenkop"),
    string("scanHeading", "Titel"),
    text("scanText", "Tekst", 6),
    string("scanAction", "Knoptekst"),
    url("scanActionUrl", "Bestemming knop"),
  ],
  preview: preview("SIRRA-scan"),
});
export const homeAudience = defineType({
  name: "homeAudience",
  title: "Voor wie wij werken",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    audienceHeading: "Voor wie wij werken",
    audienceText:
      "Wij werken voor organisaties die een warmteproject van papier naar realisatie moeten brengen. Meestal komen ze bij ons als het project stilstaat, als de businesscase niet rond komt, of als de organisatie de opgave is ontgroeid.",
  },
  fields: [
    version,
    string("audienceHeading", "Titel"),
    text("audienceText", "Tekst", 6),
  ],
  preview: preview("Voor wie wij werken"),
});
export const homeClosingCta = defineType({
  name: "homeClosingCta",
  title: "Afsluiting",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    ctaHeading:
      "Geen standaardadvies. Geen rapport voor de la. Wel scherpte, richting en betrokkenheid tot het werkt.",
    ctaAction: "Plan een gesprek",
    ctaActionUrl: "/contact",
  },
  fields: [
    version,
    text("ctaHeading", "Afsluitende claim", 4),
    string("ctaAction", "Knoptekst"),
    url("ctaActionUrl", "Bestemming knop"),
  ],
  preview: preview("Afsluiting"),
});
export const homeSectionTypes = [
  homeIntro,
  homeSolution,
  homeFocusAreas,
  homeChainKnowledge,
  homeCollaboration,
  homeScan,
  homeAudience,
  homeClosingCta,
];
