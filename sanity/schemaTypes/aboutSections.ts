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
const requiredText = (name: string, title: string, rows = 6) =>
  defineField({
    name,
    title,
    type: "text",
    rows,
    validation: (rule) => rule.required(),
  });

export const aboutIntro = defineType({
  name: "aboutIntro",
  title: "Introductie",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    heading: "Wij hebben op elke stoel aan tafel gezeten.",
    introduction:
      "Als opdrachtgever die de opgave uitzet. Als ontwikkelaar die de oplossing bedenkt en realiseerbaar maakt. Als opdrachtnemer die het moet waarmaken. Als adviseur die ertussen zit. Als bestuurder die er verantwoording over aflegt.\n\nDaardoor weten wij hoe een vraag aan de ene kant van de tafel aankomt aan de andere. Waar de belangen liggen, en wat er nodig is om partijen dezelfde kant op te krijgen.\n\nDie ervaring hebben wij samengebracht in SIRRA.",
  },
  fields: [
    version,
    requiredString("heading", "H1"),
    requiredText("introduction", "Introductie", 10),
  ],
  preview: { prepare: () => ({ title: "Introductie" }) },
});

export const aboutValues = defineType({
  name: "aboutValues",
  title: "Waar wij voor staan",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    heading: "Waar wij voor staan",
    values: [
      {
        _key: "dragen",
        _type: "object",
        title: "Wie het adviseert, draagt het.",
        text: "Bij ons is degene die het advies geeft ook degene die het besluit mee moet verdedigen.",
      },
      {
        _key: "organisatie",
        _type: "object",
        title: "In de organisatie, niet ernaast.",
        text: "Wij schrijven niet op hoe een warmteorganisatie eruit moet zien. Wij nemen de rol zelf, tot iemand anders hem kan overnemen.",
      },
      {
        _key: "onafhankelijk",
        _type: "object",
        title: "Onafhankelijk.",
        text: "Wij hebben geen belang bij een bepaalde techniek of leverancier. Dat maakt ons advies bruikbaar.",
      },
      {
        _key: "lange-termijn",
        _type: "object",
        title: "Gericht op de lange termijn.",
        text: "De warmtetransitie is een opgave van decennia. Wij bouwen een bureau dat er over tien jaar nog staat, en leiden de volgende generatie warmteprofessionals op.",
      },
    ],
  },
  fields: [
    version,
    requiredString("heading", "H2"),
    defineField({
      name: "values",
      title: "Principes",
      type: "array",
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            requiredString("title", "Uitgelichte zin"),
            requiredText("text", "Toelichting", 4),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Waar wij voor staan" }) },
});

export const aboutTeam = defineType({
  name: "aboutTeam",
  title: "Het team",
  type: "document",
  initialValue: {
    contentVersion: "1.6",
    heading: "Het team",
    action: "Kom kennismaken",
    actionUrl: "/contact",
    members: [
      {
        _key: "jamal-ghabri",
        _type: "object",
        firstName: "Jamal",
        lastName: "Ghabri",
        role: "Managing Director",
        biography:
          "Jamal zorgt voor structuur waar overzicht ontbreekt, en houdt partijen bij elkaar als het schuurt. Hij stuurt op mensen, omdat projecten zelden vastlopen op inhoud.",
      },
      {
        _key: "marco-van-soerland",
        _type: "object",
        firstName: "Marco",
        lastName: "van Soerland",
        role: "Managing Partner",
        biography:
          "Marco kijkt verder vooruit dan de opgave van vandaag en vertaalt dat naar wat er nu moet gebeuren. Hij komt zelden terug met een probleem, meestal met een route.",
      },
      {
        _key: "arjan-ten-elshof",
        _type: "object",
        firstName: "Arjan",
        lastName: "ten Elshof",
        role: "Partner",
        biography:
          "Arjan kent de bestuurskamer van binnenuit. Hij toetst wat er ligt en stuurt door tot het juiste besluit genomen wordt. Niet het makkelijkste.",
      },
    ],
  },
  fields: [
    version,
    requiredString("heading", "H2"),
    defineField({
      name: "members",
      title: "Teamleden",
      description:
        "Sleep om de volgorde te wijzigen. Voeg hier teamleden toe of verwijder ze.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            requiredString("firstName", "Voornaam"),
            requiredString("lastName", "Achternaam"),
            requiredString("role", "Functie"),
            requiredText("biography", "Profieltekst", 5),
            defineField({
              name: "employeePicture",
              title: "Portret (optioneel)",
              type: "image",
            }),
            defineField({ name: "email", title: "E-mailadres", type: "email" }),
            defineField({
              name: "phoneNumber",
              title: "Telefoonnummer",
              type: "string",
            }),
            defineField({
              name: "linkedinUrl",
              title: "LinkedIn-profiel",
              type: "url",
            }),
          ],
          preview: {
            select: {
              firstName: "firstName",
              lastName: "lastName",
              subtitle: "role",
              media: "employeePicture",
            },
            prepare: ({ firstName, lastName, subtitle, media }) => ({
              title:
                `${firstName ?? ""} ${lastName ?? ""}`.trim() ||
                "Nieuw teamlid",
              subtitle,
              media,
            }),
          },
        }),
      ],
    }),
    requiredString("action", "Knoptekst"),
    defineField({
      name: "actionUrl",
      title: "Bestemming knop",
      type: "string",
      options: { list: [{ title: "Contact", value: "/contact" }] },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Het team" }) },
});

export const aboutSectionTypes = [aboutIntro, aboutValues, aboutTeam];
