import { defineArrayMember, defineField, defineType } from "sanity";

const projectTextBlock = defineArrayMember({
  name: "projectTextBlock",
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

export const project = defineType({
  name: "project",
  title: "Projecten",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Webadres",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Klantnaam (optioneel)",
      type: "string",
    }),
    defineField({
      name: "clientLogo",
      title: "Klantlogo (optioneel)",
      type: "image",
    }),
    defineField({
      name: "thumbnail",
      title: "Projectafbeelding (thumbnail)",
      description:
        "Deze afbeelding wordt bij het project op de homepage getoond.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "assignment",
      title: "Opgave",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rol van SIRRA",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "result",
      title: "Resultaat",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detailBlocks",
      title: "Verdiepend projectverhaal (optioneel)",
      description:
        "Bouw de detailpagina op in volgorde: voeg tekst toe om te schrijven en plaats afbeeldingen ertussen waar ze moeten verschijnen.",
      type: "array",
      of: [
        projectTextBlock,
        defineArrayMember({
          name: "projectImage",
          title: "Afbeelding",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternatieve tekst",
              description: "Beschrijf kort wat er op de foto te zien is.",
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
    }),
    defineField({
      name: "detailContent",
      title: "Voormalige detailinhoud",
      type: "array",
      hidden: true,
      readOnly: true,
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "description",
      title: "Voormalige beschrijving",
      type: "text",
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "clientName", media: "thumbnail" },
  },
});
