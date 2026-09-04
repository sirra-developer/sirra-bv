import { defineArrayMember, defineField, defineType } from "sanity";

const version = defineField({
  name: "contentVersion",
  title: "Contentversie",
  type: "string",
  initialValue: "1.6",
  readOnly: true,
  hidden: true,
});

const requiredString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (rule) => rule.required(),
  });

export const contactIntro = defineType({
  name: "contactIntro",
  title: "Introductie",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    heading: "Begin bij het gesprek.",
    introduction:
      "De meeste trajecten beginnen met een uur aan tafel. Geen offerte, geen verkoopverhaal. Even samen kijken wat er speelt en of wij daar iets aan toevoegen.",
  },
  fields: [
    version,
    requiredString("heading", "H1"),
    defineField({
      name: "introduction",
      title: "Introductie",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Introductie" }) },
});

export const contactDetails = defineType({
  name: "contactDetails",
  title: "Contactgegevens",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    heading: "Contactgegevens",
    email: "info@sirra.nl",
    whatsappPhone: "+31 (0)6 00000000",
    address: {
      _type: "contactAddress",
      street: "Naritaweg",
      houseNumber: "127-137",
      postalCode: "1043 BS",
      city: "Amsterdam",
    },
    chamberOfCommerce: "42079736",
    linkedinUrl: "https://www.linkedin.com/company/sirra-bv",
  },
  fields: [
    version,
    requiredString("heading", "Titel"),
    defineField({ name: "email", title: "E-mailadres", type: "email" }),
    defineField({
      name: "address",
      title: "Bezoekadres",
      type: "object",
      fields: [
        requiredString("street", "Straatnaam"),
        requiredString("houseNumber", "Huisnummer"),
        defineField({
          name: "postalCode",
          title: "Postcode",
          type: "string",
          validation: (rule) =>
            rule.required().regex(/^\d{4}\s?[A-Za-z]{2}$/, {
              name: "Nederlandse postcode",
              invert: false,
            }),
        }),
        requiredString("city", "Stad"),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "chamberOfCommerce",
      title: "KvK-nummer",
      type: "string",
    }),
    defineField({ name: "linkedinUrl", title: "LinkedIn", type: "url" }),
    defineField({
      name: "whatsappPhone",
      title: "WhatsApp-nummer",
      description:
        "Gebruik een volledig internationaal nummer, bijvoorbeeld +31612345678.",
      type: "string",
    }),
  ],
  preview: { prepare: () => ({ title: "Contactgegevens" }) },
});

export const contactForm = defineType({
  name: "contactForm",
  title: "Formulier",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    heading: "Waar gaat het over?",
    action: "Versturen",
    responseText: "Wij reageren binnen twee werkdagen.",
    fields: [
      {
        _key: "name",
        _type: "object",
        label: "Naam",
        inputType: "text",
        required: true,
      },
      {
        _key: "organisation",
        _type: "object",
        label: "Organisatie",
        inputType: "text",
        required: false,
      },
      {
        _key: "email",
        _type: "object",
        label: "E-mailadres",
        inputType: "email",
        required: true,
      },
      {
        _key: "subject",
        _type: "object",
        label: "Onderwerp",
        inputType: "text",
        required: true,
      },
      {
        _key: "message",
        _type: "object",
        label: "Waar gaat het over?",
        inputType: "textarea",
        required: true,
      },
    ],
  },
  fields: [
    version,
    requiredString("heading", "Titel"),
    defineField({
      name: "fields",
      title: "Formuliervelden",
      description:
        "Sleep om de volgorde te wijzigen. Voeg velden toe of verwijder ze.",
      type: "array",
      validation: (rule) => rule.required().min(1).max(15),
      of: [
        defineArrayMember({
          type: "object",
          name: "contactFormField",
          fields: [
            requiredString("label", "Naam van het veld"),
            defineField({
              name: "inputType",
              title: "Type veld",
              type: "string",
              options: {
                list: [
                  { title: "Korte tekst", value: "text" },
                  { title: "E-mailadres", value: "email" },
                  { title: "Telefoonnummer", value: "tel" },
                  { title: "Lange tekst", value: "textarea" },
                ],
                layout: "radio",
              },
              initialValue: "text",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "required",
              title: "Verplicht veld",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "placeholder",
              title: "Placeholder (optioneel)",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label",
              inputType: "inputType",
              required: "required",
            },
            prepare: ({ title, inputType, required }) => ({
              title: title || "Nieuw veld",
              subtitle: `${inputType || "text"}${required ? " · verplicht" : " · optioneel"}`,
            }),
          },
        }),
      ],
    }),
    requiredString("action", "Knoptekst"),
    requiredString("responseText", "Tekst onder het formulier"),
  ],
  preview: { prepare: () => ({ title: "Formulier" }) },
});

export const contactMap = defineType({
  name: "contactMap",
  title: "Kaart",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    heading: "Ons kantoor",
    address: {
      _type: "contactMapAddress",
      street: "Naritaweg",
      houseNumber: "127-137",
      postalCode: "1043 BS",
      city: "Amsterdam",
    },
  },
  fields: [
    version,
    requiredString("heading", "Titel voor de kaart"),
    defineField({
      name: "address",
      title: "Kaartadres",
      description:
        "Laat leeg om het bezoekadres uit Contactgegevens te gebruiken.",
      type: "object",
      initialValue: {
        street: "Naritaweg",
        houseNumber: "127-137",
        postalCode: "1043 BS",
        city: "Amsterdam",
      },
      fields: [
        requiredString("street", "Straatnaam"),
        requiredString("houseNumber", "Huisnummer"),
        defineField({
          name: "postalCode",
          title: "Postcode",
          type: "string",
          validation: (rule) =>
            rule.regex(/^\d{4}\s?[A-Za-z]{2}$/, {
              name: "Nederlandse postcode",
              invert: false,
            }),
        }),
        requiredString("city", "Stad"),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Kaart" }) },
});

export const contactSectionTypes = [
  contactIntro,
  contactDetails,
  contactForm,
  contactMap,
];
