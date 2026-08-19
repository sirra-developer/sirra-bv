import { defineField, defineType } from "sanity";

export const employee = defineType({
  name: "employee",
  title: "Werknemers",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "Voornaam",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Achternaam",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneNumber",
      title: "Telefoonnummer",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-mailadres",
      type: "email",
    }),
    defineField({
      name: "employeePicture",
      title: "Portret",
      type: "image",
    }),
    defineField({
      name: "role",
      title: "Functie",
      type: "string",
    }),
    defineField({
      name: "biography",
      title: "Profieltekst",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn-profiel",
      type: "url",
    }),
  ],
  preview: {
    select: { firstName: "firstName", lastName: "lastName" },
    prepare: ({ firstName, lastName }) => ({
      title: `${firstName} ${lastName}`,
    }),
  },
});
