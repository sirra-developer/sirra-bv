import { defineArrayMember, defineField, defineType } from "sanity";
import { DetailBlocksInput } from "../components/DetailBlocksArrayFunctions";

const legalTextBlock = defineArrayMember({
  name: "legalTextBlock",
  title: "Tekst",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Tekst",
      type: "array",
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normale tekst", value: "normal" },
            { title: "Titel", value: "h2" },
            { title: "Subtitel", value: "h3" },
          ],
          lists: [
            { title: "Bulletpoints", value: "bullet" },
            { title: "Genummerde lijst", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Vet", value: "strong" },
              { title: "Cursief", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { blocks: "content" },
    prepare: ({ blocks }) => {
      const firstBlock = Array.isArray(blocks)
        ? blocks.find((block) => block?._type === "block")
        : undefined;
      const title =
        firstBlock?.children
          ?.map((child: { text?: string }) => child.text)
          .join("")
          .slice(0, 80) || "Tekst";

      return { title, subtitle: "Tekst" };
    },
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
      description:
        "Bouw de pagina op in volgorde: voeg tekst toe om te schrijven en plaats afbeeldingen ertussen waar ze moeten verschijnen.",
      type: "array",
      components: {
        input: DetailBlocksInput,
      },
      of: [
        legalTextBlock,
        defineArrayMember({
          name: "legalImage",
          title: "Afbeelding",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternatieve tekst",
              description: "Beschrijf kort wat er op de afbeelding te zien is.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Bijschrift (optioneel)",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: { select: { title: "pageTitle" } },
});
