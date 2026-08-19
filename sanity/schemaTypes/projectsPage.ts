import { defineField, defineType } from "sanity";

export const projectsPage = defineType({
  name: "projectsPage",
  title: "Pagina-instellingen",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    visible: true,
    heading: "Wat wij hebben neergezet.",
    trajectoryHeading: "Hoe een traject er bij ons uitziet",
    trajectoryText:
      "Elk project begint met dezelfde vraag: waar zit de beslissing die nu genomen moet worden, en wat is daarvoor nodig?\n\nDaarna verschilt het per project. De ene opdrachtgever heeft een businesscase die nog niet sluit. De andere een organisatie die met de opgave mee moet groeien. De derde een tenderstrategie die de juiste partijen nog niet aantrekt.\n\nWij beginnen bij wat er vastzit, niet bij een stappenplan.",
    casesHeading: "Cases",
  },
  fields: [
    defineField({
      name: "contentVersion",
      title: "Contentversie",
      type: "string",
      initialValue: "1.6",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "visible",
      title: "Projectenpagina zichtbaar",
      description:
        "Zet dit aan om Projecten in het menu te tonen en de pagina openbaar bereikbaar te maken.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "heading",
      title: "H1",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "trajectoryHeading",
      title: "Titel trajectsectie",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "trajectoryText",
      title: "Tekst trajectsectie",
      type: "text",
      rows: 10,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "casesHeading",
      title: "Titel cases",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Pagina-instellingen" }) },
});
