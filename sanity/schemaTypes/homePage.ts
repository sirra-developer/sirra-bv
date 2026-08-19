import { defineArrayMember, defineField, defineType } from "sanity";

const expertiseDefaults = [
  {
    _key: "warmtenetten",
    number: "01",
    title: "Warmtenetten",
    text: "Placeholder voor een korte toelichting op deze expertise.",
  },
  {
    _key: "geothermie",
    number: "02",
    title: "Geothermie",
    text: "Placeholder voor een korte toelichting op deze expertise.",
  },
  {
    _key: "projectontwikkeling",
    number: "03",
    title: "Projectontwikkeling",
    text: "Placeholder voor een korte toelichting op deze expertise.",
  },
];

const internalPageOptions = {
  list: [
    { title: "Homepage", value: "/" },
    { title: "Diensten", value: "/diensten" },
    { title: "Projecten", value: "/projecten" },
    { title: "Onze filosofie", value: "/onze-filosofie" },
    { title: "Over ons", value: "/over-ons" },
    { title: "Contact", value: "/contact" },
  ],
};

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  initialValue: {
    eyebrow: "Van ambitie naar uitvoering",
    heading: "Warmteprojecten die vooruitkomen.",
    introduction:
      "SIRRA brengt richting, overzicht en beweging in de warmtetransitie, van de eerste strategie tot een project dat buiten echt werkt.",
    primaryAction: "Ontdek onze aanpak",
    primaryActionUrl: "/diensten",
    expertiseEyebrow: "Waar we aan werken",
    expertiseHeading: "Complexe warmte, helder gemaakt.",
    expertiseAction: "Bekijk onze diensten",
    expertiseActionUrl: "/diensten",
    expertiseItems: expertiseDefaults,
    approachEyebrow: "Onze rol",
    approachHeading: "We brengen mensen, belangen en uitvoering bij elkaar.",
    approachText:
      "Placeholdertekst over de pragmatische manier waarop SIRRA complexe projecten begeleidt, knelpunten oplost en partijen samen laat werken.",
    approachBadge: "Van vastgelopen naar vooruit.",
    approachSteps: [
      { _key: "analyse", letter: "A", label: "Analyse" },
      { _key: "beweging", letter: "B", label: "Beweging" },
      { _key: "concreet", letter: "C", label: "Concrete stap" },
    ],
    projectsEyebrow: "Uit de praktijk",
    projectsHeading: "Laatste projecten",
    projectsAction: "Alle projecten",
    ctaEyebrow: "Een project in beweging brengen?",
    ctaHeading: "Laten we kijken waar de doorbraak zit.",
    ctaAction: "Neem contact op",
    ctaActionUrl: "/contact",
  },
  groups: [
    { name: "hero", title: "Introductie" },
    { name: "expertise", title: "Diensten en vakgebieden" },
    { name: "approach", title: "Onze aanpak" },
    { name: "blocks", title: "Extra inhoudsblokken" },
    { name: "projects", title: "Uitgelichte projecten" },
    { name: "cta", title: "Contactoproep" },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "Bovenkop",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heading",
      title: "Titel",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Tekst",
      type: "text",
      rows: 4,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryAction",
      title: "Knoptekst",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "primaryActionUrl",
      title: "Bestemming van knop",
      type: "string",
      group: "hero",
      options: internalPageOptions,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Afbeelding",
      type: "image",
      options: { hotspot: true },
      group: "hero",
      fields: [
        defineField({ name: "alt", title: "Alt-tekst", type: "string" }),
      ],
    }),

    defineField({
      name: "expertiseEyebrow",
      title: "Bovenkop",
      type: "string",
      group: "expertise",
    }),
    defineField({
      name: "expertiseHeading",
      title: "Titel",
      type: "string",
      group: "expertise",
    }),
    defineField({
      name: "expertiseAction",
      title: "Knoptekst",
      type: "string",
      group: "expertise",
    }),
    defineField({
      name: "expertiseActionUrl",
      title: "Bestemming van knop",
      type: "string",
      group: "expertise",
      options: internalPageOptions,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "expertiseItems",
      title: "Vakgebieden",
      type: "array",
      group: "expertise",
      of: [
        defineArrayMember({
          type: "object",
          name: "expertiseItem",
          fields: [
            defineField({ name: "number", title: "Nummer", type: "string" }),
            defineField({
              name: "title",
              title: "Titel",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Tekst",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),

    defineField({
      name: "approachEyebrow",
      title: "Bovenkop",
      type: "string",
      group: "approach",
    }),
    defineField({
      name: "approachHeading",
      title: "Titel",
      type: "string",
      group: "approach",
    }),
    defineField({
      name: "approachText",
      title: "Tekst",
      type: "text",
      rows: 4,
      group: "approach",
    }),
    defineField({
      name: "approachBadge",
      title: "Tekst in cirkel",
      type: "string",
      group: "approach",
    }),
    defineField({
      name: "approachImage",
      title: "Afbeelding",
      type: "image",
      options: { hotspot: true },
      group: "approach",
      fields: [
        defineField({ name: "alt", title: "Alt-tekst", type: "string" }),
      ],
    }),
    defineField({
      name: "approachSteps",
      title: "Stappen",
      type: "array",
      group: "approach",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "letter", title: "Letter", type: "string" }),
            defineField({ name: "label", title: "Tekst", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "letter" } },
        }),
      ],
    }),

    defineField({
      name: "contentBlocks",
      title: "Blokken na ‘Onze aanpak’",
      description:
        "Sleep om de volgorde te wijzigen. Op mobiel staan afbeelding en tekst altijd onder elkaar.",
      type: "array",
      group: "blocks",
      of: [
        defineArrayMember({
          type: "object",
          name: "contentBlock",
          title: "Tekst- en afbeeldingsblok",
          fields: [
            defineField({ name: "eyebrow", title: "Bovenkop", type: "string" }),
            defineField({
              name: "title",
              title: "Titel",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Tekst",
              type: "text",
              rows: 6,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "textPosition",
              title: "Positie tekstvlak op groot scherm",
              description:
                "Verplaatst de volledige tekstcontainer naar de linker- of rechterhelft.",
              type: "string",
              initialValue: "left",
              options: {
                layout: "radio",
                list: [
                  { title: "Links", value: "left" },
                  { title: "Rechts", value: "right" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "titleColor",
              title: "Kleur van de titel",
              type: "string",
              initialValue: "black",
              options: {
                list: [
                  { title: "Taupe", value: "taupe" },
                  { title: "Groen", value: "green" },
                  { title: "Goud", value: "gold" },
                  { title: "Zwart", value: "black" },
                ],
              },
            }),
            defineField({
              name: "backgroundColor",
              title: "Achtergrondkleur",
              description:
                "Laat dit veld leeg voor een transparante achtergrond.",
              type: "string",
              options: {
                list: [
                  { title: "Taupe", value: "taupe" },
                  { title: "Groen", value: "green" },
                  { title: "Goud", value: "gold" },
                  { title: "Zwart", value: "black" },
                ],
              },
            }),
            defineField({
              name: "image",
              title: "Afbeelding (optioneel)",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt-tekst",
                  description: "Beschrijf wat op de afbeelding te zien is.",
                  type: "string",
                  validation: (rule) =>
                    rule.custom((alt, context) =>
                      context.parent && alt
                        ? true
                        : "Vul bij een afbeelding een alt-tekst in",
                    ),
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "textPosition",
              media: "image",
            },
            prepare: ({ title, subtitle, media }) => ({
              title,
              subtitle: subtitle === "right" ? "Tekst rechts" : "Tekst links",
              media,
            }),
          },
        }),
      ],
    }),

    defineField({
      name: "projectsEyebrow",
      title: "Bovenkop",
      type: "string",
      group: "projects",
    }),
    defineField({
      name: "projectsHeading",
      title: "Titel",
      type: "string",
      group: "projects",
    }),
    defineField({
      name: "projectsAction",
      title: "Knoptekst",
      type: "string",
      group: "projects",
    }),
    defineField({
      name: "ctaEyebrow",
      title: "Bovenkop",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaHeading",
      title: "Titel",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaAction",
      title: "Knoptekst",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaActionUrl",
      title: "Bestemming van knop",
      type: "string",
      group: "cta",
      options: internalPageOptions,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
