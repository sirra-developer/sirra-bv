import { defineArrayMember, defineField, defineType } from "sanity";

const textBlock = (
  name: string,
  title: string,
  fieldTitle: string,
  type: "string" | "text" = "string",
) =>
  defineArrayMember({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "text",
        title: fieldTitle,
        type,
        rows: type === "text" ? 7 : undefined,
        validation: (rule) => rule.required(),
      }),
    ],
    preview: {
      select: { title: "text" },
      prepare: ({ title: previewTitle }) => ({
        title: previewTitle,
        subtitle: title,
      }),
    },
  });

const listBlock = (name: string, title: string) =>
  defineArrayMember({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "items",
        title: "Punten",
        type: "array",
        of: [{ type: "string" }],
        validation: (rule) => rule.required().min(1),
      }),
    ],
    preview: {
      select: { items: "items" },
      prepare: ({ items }) => ({
        title: Array.isArray(items) ? `${items.length} punten` : title,
        subtitle: title,
      }),
    },
  });

export const legalPage = defineType({
  name: "legalPage",
  title: "Juridische pagina",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Paginatitel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introductie (optioneel)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "blocks",
      title: "Inhoud",
      description: "Voeg blokken toe en sleep ze naar de gewenste volgorde.",
      type: "array",
      of: [
        textBlock("legalTitle", "Titel", "Titel"),
        textBlock("legalSubtitle", "Subtitel", "Subtitel"),
        textBlock("legalParagraph", "Paragraaf", "Tekst", "text"),
        listBlock("legalBulletList", "Bulletlijst"),
        listBlock("legalNumberedList", "Genummerde lijst"),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: { select: { title: "pageTitle" } },
});
