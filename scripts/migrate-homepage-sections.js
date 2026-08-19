import { getCliClient } from "sanity/cli";
const client = getCliClient({ apiVersion: "2026-08-06" });
const base = { contentVersion: "1.6" };
const documents = [
  {
    _id: "drafts.homeIntro",
    _type: "homeIntro",
    ...base,
    eyebrow: "Van strategie naar resultaat",
    heading: "Warmteprojecten stranden zelden op ambitie.",
    problemText:
      "Ze stranden op uitgestelde keuzes. Op onvoldoende kennis van de keten. Op een gebrekkige verbinding tussen strategie en uitvoering.",
  },
  {
    _id: "drafts.homeSolution",
    _type: "homeSolution",
    ...base,
    solutionHeading: "Daarom is er SIRRA.",
    solutionText:
      "Een adviesbureau voor organisaties die warmteprojecten niet alleen willen bedenken, maar ook daadwerkelijk willen ontwikkelen en realiseren.",
    principles: "Strategie · Impact · Realisatie · Regie · Actie",
    primaryAction: "Zo werken wij",
    primaryActionUrl: "/onze-filosofie",
    secondaryAction: "Neem contact op",
    secondaryActionUrl: "/contact",
  },
  {
    _id: "drafts.homeFocusAreas",
    _type: "homeFocusAreas",
    ...base,
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
  {
    _id: "drafts.homeChainKnowledge",
    _type: "homeChainKnowledge",
    ...base,
    chainEyebrow: "Ketenkennis",
    chainHeading:
      "Onze kracht? Wij zien de gevolgen van een keuze voordat ze zich voordoen.",
    chainText:
      "De beslissingen aan het begin van een warmteproject bepalen of alles bij elkaar komt in de vorm van een investeringsbeslissing, en daarmee of het project er ooit komt. Diezelfde beslissingen bepalen de exploitatie voor decennia.\n\nWij overzien die keten en het hele speelveld: van bron tot aansluiting, van ambitie tot financierbaar project, van ontwerp tot exploitatie.\n\nDat is wat wij ketenkennis noemen: niet elke schakel kennen, maar weten hoe ze op elkaar inwerken.",
    chainHighlight:
      "Een aanvoertemperatuur, een tracékeuze, een contractvorm, een afnamegarantie. Het lijkt techniek. Het is rendement.",
  },
  {
    _id: "drafts.homeCollaboration",
    _type: "homeCollaboration",
    ...base,
    collaborationEyebrow: "Samenspel",
    collaborationHeading:
      "Projecten stranden niet op een gebrek aan plannen, maar op een gebrek aan samenspel",
    collaborationText:
      "Een investeringsbesluit vraagt dat techniek, financiering, governance en uitvoering op hetzelfde moment kloppen. In de meeste projecten zitten die competenties bij verschillende partijen, met verschillende belangen en een eigen tempo.",
    collaborationHighlight:
      "Wij brengen ze samen. En waar ze ontbreken, bouwen wij ze op, tot de organisatie het zelf kan.",
  },
  {
    _id: "drafts.homeScan",
    _type: "homeScan",
    ...base,
    scanEyebrow: "De SIRRA-scan",
    scanHeading: "Wil je weten waar je project staat?",
    scanText:
      "Binnen een week weet je waar je project staat.\n\nDat is wat de SIRRA-scan oplevert. Een beproefde systematiek, toegepast door mensen die zulke trajecten zelf hebben geleid.",
    scanAction: "Meer over de SIRRA-scan",
    scanActionUrl: "/diensten",
  },
  {
    _id: "drafts.homeAudience",
    _type: "homeAudience",
    ...base,
    audienceHeading: "Voor wie wij werken",
    audienceText:
      "Wij werken voor organisaties die een warmteproject van papier naar realisatie moeten brengen. Meestal komen ze bij ons als het project stilstaat, als de businesscase niet rond komt, of als de organisatie de opgave is ontgroeid.",
  },
  {
    _id: "drafts.homeClosingCta",
    _type: "homeClosingCta",
    ...base,
    ctaHeading:
      "Geen standaardadvies. Geen rapport voor de la. Wel scherpte, richting en betrokkenheid tot het werkt.",
    ctaAction: "Plan een gesprek",
    ctaActionUrl: "/contact",
  },
];
const transaction = client.transaction();
documents.forEach((document) => transaction.createOrReplace(document));
await transaction.commit();
console.log(
  `Homepage v1.6 opgeslagen in ${documents.length} losse Sanity-secties.`,
);
