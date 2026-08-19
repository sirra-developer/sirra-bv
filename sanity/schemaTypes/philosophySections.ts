import { defineArrayMember, defineField, defineType } from "sanity";
const version = defineField({
  name: "contentVersion",
  title: "Contentversie",
  type: "string",
  initialValue: "1.6",
  readOnly: true,
  hidden: true,
});
const legacyTitle = defineField({
  name: "title",
  title: "Interne titel",
  type: "string",
  hidden: true,
  readOnly: true,
});
const string = (name: string, title: string) =>
  defineField({ name, title, type: "string", validation: (r) => r.required() });
const text = (name: string, title: string, rows = 6) =>
  defineField({
    name,
    title,
    type: "text",
    rows,
    validation: (r) => r.required(),
  });
const preview = (title: string) => ({ prepare: () => ({ title }) });

export const philosophyIntro = defineType({
  name: "philosophyIntro",
  title: "Introductie",
  type: "document",
  initialValue: {
    title: "Introductie",
    contentVersion: "1.6",
    heading: "Betrokken tot het werkt.",
    introduction:
      "De warmtetransitie vraagt om creativiteit en doorzettingsvermogen.\n\nOm iemand die blijft zitten als het ingewikkeld wordt. Die de keuze agendeert die iedereen liever vooruitschuift. Die geen rapporten schrijft, maar projecten besluitvormingsgereed aflevert.\n\nDat is de rol die wij pakken.",
  },
  fields: [
    version,
    legacyTitle,
    string("heading", "H1"),
    text("introduction", "Introductie", 9),
  ],
  preview: preview("Introductie"),
});

const principles = [
  {
    _key: "strategie",
    _type: "object",
    letter: "S",
    title: "Strategie",
    text: "Eerst de vraag achter de vraag. Wat wil je bereiken, en wat is daarvoor nodig?",
  },
  {
    _key: "impact",
    _type: "object",
    letter: "I",
    title: "Impact",
    text: "Niet elk project verdient doorgang. Wij helpen kiezen waar het verschil zit.",
  },
  {
    _key: "realisatie",
    _type: "object",
    letter: "R",
    title: "Realisatie",
    text: "Een plan is pas iets waard als het beweegt.",
  },
  {
    _key: "regie",
    _type: "object",
    letter: "R",
    title: "Regie",
    text: "Overzicht houden waar veel partijen, belangen en tempo’s samenkomen.",
  },
  {
    _key: "actie",
    _type: "object",
    letter: "A",
    title: "Actie",
    text: "Doorpakken. Ook als het ongemakkelijk wordt.",
  },
];
export const philosophyPrinciples = defineType({
  name: "philosophyPrinciples",
  title: "SIRRA-principes",
  type: "document",
  initialValue: {
    title: "SIRRA-principes",
    contentVersion: "1.6",
    sirraHeading: "SIRRA",
    sirraIntroduction:
      "Onze naam is geen toevallige klank. Het zijn de vijf stappen van elk traject dat werkt.",
    principles,
  },
  fields: [
    version,
    legacyTitle,
    string("sirraHeading", "Titel"),
    text("sirraIntroduction", "Introductie", 3),
    defineField({
      name: "principles",
      title: "De vijf stappen",
      type: "array",
      validation: (r) => r.length(5),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            string("letter", "Letter"),
            string("title", "Titel"),
            text("text", "Tekst", 3),
          ],
          preview: { select: { title: "title", subtitle: "letter" } },
        }),
      ],
    }),
  ],
  preview: preview("SIRRA-principes"),
});

export const philosophyClosing = defineType({
  name: "philosophyClosing",
  title: "Afsluiting",
  type: "document",
  initialValue: {
    title: "Afsluiting",
    contentVersion: "1.6",
    closingText:
      "Betrokkenheid stopt bij ons niet bij de oplevering van een document. Wij blijven tot het besluit genomen is en het project loopt.",
    closingAction: "Bekijk onze focusgebieden",
    closingActionUrl: "/diensten",
  },
  fields: [
    version,
    legacyTitle,
    text("closingText", "Afsluitende tekst", 5),
    string("closingAction", "Knoptekst"),
    defineField({
      name: "closingActionUrl",
      title: "Bestemming knop",
      type: "string",
      options: {
        list: [
          { title: "Diensten", value: "/diensten" },
          { title: "Contact", value: "/contact" },
        ],
      },
      validation: (r) => r.required(),
    }),
  ],
  preview: preview("Afsluiting"),
});
export const philosophySectionTypes = [
  philosophyIntro,
  philosophyPrinciples,
  philosophyClosing,
];
