import { defineField, defineType } from "sanity";
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
const text = (name: string, title: string, rows = 8) =>
  defineField({
    name,
    title,
    type: "text",
    rows,
    validation: (r) => r.required(),
  });
const preview = (title: string) => ({ prepare: () => ({ title }) });
export const servicesIntro = defineType({
  name: "servicesIntro",
  title: "Introductie",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    heading: "Van de eerste ontwikkelvraag tot realisatie.",
    introduction:
      "Vier focusgebieden. In de praktijk lopen ze door elkaar heen. Een businesscase die niet sluit is zelden alleen een rekenprobleem.\n\nWij werken niet met een standaardaanpak, omdat geen twee warmteprojecten dezelfde route lopen. Wat wel vastligt is waar wij naar kijken: de samenhang tussen strategie, techniek, organisatie en uitvoering.",
  },
  fields: [
    version,
    string("heading", "H1"),
    text("introduction", "Introductie"),
  ],
  preview: preview("Introductie"),
});
const area = (
  name: string,
  label: string,
  initialValue: { number: string; title: string; text: string },
) =>
  defineType({
    name,
    title: label,
    type: "document",
    initialValue: { contentVersion: "1.6", ...initialValue },
    fields: [
      version,
      string("number", "Nummer"),
      string("title", "Titel"),
      text("text", "Tekst", 16),
    ],
    preview: preview(label),
  });
export const servicesStrategic = area(
  "servicesStrategic",
  "Strategische vraagstukken",
  {
    number: "01",
    title: "Strategische vraagstukken",
    text: "Wat wil je bereiken, wat is haalbaar, en welke route brengt je daar?\n\nWij bepalen de tender-, subsidie- en vergunningenstrategie in samenhang. Hoe je aanbesteedt bepaalt welke partijen zich melden. Welke subsidieroute je kiest bepaalt of de case rond komt. Hoe je het vergunningentraject inricht bepaalt of je over drie jaar begint of over zes. Die keuzes worden vaak los van elkaar gemaakt. Wij leggen ze naast elkaar, aan het begin.\n\nWij bouwen businesscases die financiering, bestuur en toezicht doorstaan.\n\nWij geven een project niet op omdat de eerste som niet uitkomt. Er is bijna altijd een route die wél werkt: een andere fasering, een ander contract, een andere combinatie van bronnen. Die zoeken wij, tot hij er is. Inclusief de besluiten die daarvoor nodig zijn.\n\nEn is die route er niet, dan weet je dat nu in plaats van over drie jaar.",
  },
);
export const servicesDevelopment = area(
  "servicesDevelopment",
  "Projectontwikkeling",
  {
    number: "02",
    title: "Projectontwikkeling",
    text: "Van propositie naar project, en van project naar investeringsbesluit.\n\nWij brengen partners, financiering, contractvorm en fasering bij elkaar en structureren het geheel. Complexe warmteprojecten kennen tientallen afhankelijkheden. Wij maken ze expliciet en zorgen dat het investeringsbesluit voorbereid op tafel komt.\n\nNiet als verrassing. Besluitvormingsgereed.",
  },
);
export const servicesTechnical = area(
  "servicesTechnical",
  "Technische ontwikkeling",
  {
    number: "03",
    title: "Technische ontwikkeling",
    text: "Bronkeuze, temperatuurniveau, tracérichting, fasering. Het lijken technische vragen, maar het zijn strategische keuzes met een technische inhoud. Ze bepalen dertig jaar exploitatie.\n\nWij bepalen de technische richting en bewaken die door het hele traject. De engineering en detailberekeningen laten wij aan vaste technische partners, die dat beter kunnen dan wij. Wij spreken hun taal zonder er belang bij te hebben, en dat is precies waarom onze weging bruikbaar is.",
  },
);
export const servicesOrganisation = area(
  "servicesOrganisation",
  "Organisatie",
  {
    number: "04",
    title: "Organisatie",
    text: "Een investeringsbesluit vraagt dat techniek, financiering, governance en uitvoering op hetzelfde moment kloppen. Dat vraagt om een organisatie die dat samenspel aankan.\n\nWij bouwen die op. Rollen en mandaten, besluitvormingsstructuur, processen voor inkoop en projectbeheersing, de eerste mensen op de juiste plek. Van een projectteam bij een gemeente tot een warmtebedrijf dat vanaf nul operationeel moet worden.\n\nWij doen dat van binnenuit, met de handen eraan. Geen blauwdruk, wel een organisatie die het zonder ons redt.",
  },
);
export const servicesScan = defineType({
  name: "servicesScan",
  title: "SIRRA-scan",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    eyebrow: "De SIRRA-scan",
    heading: "Wil je weten waar je project staat?",
    text: "Binnen een week weet je waar je project staat.\n\nWij doorlichten lopende projecten met de SIRRA-scan. Vaste thema’s, vaste vragen, in een vaste volgorde. Drie dagen onderzoek: wij lezen de stukken en spreken de mensen die het weten. Daarna een oordeel op tafel.\n\nGeen lijst met bevindingen, maar een antwoord: wat er speelt, hoe zwaar dat weegt, en wat de eerstvolgende stap is.\n\nVoor een warmteorganisatie werkt de scan hetzelfde, maar duurt hij langer. Meer mensen, meer processen, meer geschiedenis.",
    action: "Vraag een SIRRA-scan aan",
    actionUrl: "/contact",
  },
  fields: [
    version,
    string("eyebrow", "Bovenkop"),
    string("heading", "Titel"),
    text("text", "Tekst", 14),
    string("action", "Knoptekst"),
    defineField({
      name: "actionUrl",
      title: "Bestemming knop",
      type: "string",
      options: { list: [{ title: "Contact", value: "/contact" }] },
      validation: (r) => r.required(),
    }),
  ],
  preview: preview("SIRRA-scan"),
});
export const servicesSectionTypes = [
  servicesIntro,
  servicesStrategic,
  servicesDevelopment,
  servicesTechnical,
  servicesOrganisation,
  servicesScan,
];
