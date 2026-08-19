import { defineArrayMember, defineField, defineType } from "sanity";

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
        "Bouw de detailpagina op met losse titels, subtitels, paragrafen en foto’s.",
      type: "array",
      of: [
        defineArrayMember({
          name: "projectTitle",
          title: "Titel",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Titel",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({ title, subtitle: "Titel" }),
          },
        }),
        defineArrayMember({
          name: "projectSubtitle",
          title: "Subtitel",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Subtitel",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({ title, subtitle: "Subtitel" }),
          },
        }),
        defineArrayMember({
          name: "projectParagraph",
          title: "Paragraaf",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Tekst",
              type: "text",
              rows: 6,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({ title, subtitle: "Paragraaf" }),
          },
        }),
        defineArrayMember({
          name: "projectImage",
          title: "Foto",
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
