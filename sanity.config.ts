"use client";

import { visionTool } from "@sanity/vision";
import { nlNLLocale } from "@sanity/locale-nl-nl";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

const homeSections = [
  ["Introductie", "homeIntro", "homeIntro"],
  ["Daarom is er SIRRA", "homeSolution", "homeSolution"],
  ["Focusgebieden", "homeFocusAreas", "homeFocusAreas"],
  ["Ketenkennis", "homeChainKnowledge", "homeChainKnowledge"],
  ["Samenspel", "homeCollaboration", "homeCollaboration"],
  ["SIRRA-scan", "homeScan", "homeScan"],
  ["Voor wie wij werken", "homeAudience", "homeAudience"],
  ["Afsluiting", "homeClosingCta", "homeClosingCta"],
] as const;

const philosophySections = [
  ["Introductie", "philosophyIntro", "philosophyIntroV16"],
  ["SIRRA-principes", "philosophyPrinciples", "philosophyPrinciplesV16"],
  ["Afsluiting", "philosophyClosing", "philosophyClosingV16"],
] as const;
const servicesSections = [
  ["Introductie", "servicesIntro", "servicesIntro"],
  ["Strategische vraagstukken", "servicesStrategic", "servicesStrategic"],
  ["Projectontwikkeling", "servicesDevelopment", "servicesDevelopment"],
  ["Technische ontwikkeling", "servicesTechnical", "servicesTechnical"],
  ["Organisatie", "servicesOrganisation", "servicesOrganisation"],
  ["SIRRA-scan", "servicesScan", "servicesScan"],
] as const;
const aboutSections = [
  ["Introductie", "aboutIntro", "aboutIntro"],
  ["Waar wij voor staan", "aboutValues", "aboutValues"],
  ["Het team", "aboutTeam", "aboutTeamV16Members"],
] as const;
const contactSections = [
  ["Introductie", "contactIntro", "contactIntro"],
  ["Contactgegevens", "contactDetails", "contactDetailsV4"],
  ["Formulier", "contactForm", "contactFormV2"],
  ["Kaart", "contactMap", "contactMap"],
] as const;
const projectsSections = [
  ["Pagina-instellingen", "projectsPage", "projectsPage"],
] as const;
const legalPages = [
  ["Privacyverklaring", "legalPage", "privacyPage"],
  ["Algemene voorwaarden", "legalPage", "termsPage"],
] as const;
const hiddenSingletonTypes = new Set<string>([
  ...homeSections.map(([, schemaType]) => schemaType),
  ...philosophySections.map(([, schemaType]) => schemaType),
  ...servicesSections.map(([, schemaType]) => schemaType),
  ...aboutSections.map(([, schemaType]) => schemaType),
  ...contactSections.map(([, schemaType]) => schemaType),
  ...projectsSections.map(([, schemaType]) => schemaType),
  ...legalPages.map(([, schemaType]) => schemaType),
  "employee",
]);

export default defineConfig({
  name: "default",
  title: "SIRRA CMS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Homepage")
              .child(
                S.list()
                  .title("Homepage")
                  .items(
                    homeSections.map(([title, schemaType, documentId]) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.document()
                            .title(title)
                            .schemaType(schemaType)
                            .documentId(documentId),
                        ),
                    ),
                  ),
              ),
            S.divider(),
            S.listItem()
              .title("Diensten")
              .child(
                S.list()
                  .title("Diensten")
                  .items(
                    servicesSections.map(([title, schemaType, documentId]) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.document()
                            .title(title)
                            .schemaType(schemaType)
                            .documentId(documentId),
                        ),
                    ),
                  ),
              ),
            S.divider(),
            S.listItem()
              .title("Onze filosofie")
              .child(
                S.list()
                  .title("Onze filosofie")
                  .items(
                    philosophySections.map(([title, schemaType, documentId]) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.document()
                            .title(title)
                            .schemaType(schemaType)
                            .documentId(documentId),
                        ),
                    ),
                  ),
              ),
            S.divider(),
            S.listItem()
              .title("Over ons")
              .child(
                S.list()
                  .title("Over ons")
                  .items(
                    aboutSections.map(([title, schemaType, documentId]) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.document()
                            .title(title)
                            .schemaType(schemaType)
                            .documentId(documentId),
                        ),
                    ),
                  ),
              ),
            S.divider(),
            S.listItem()
              .title("Contact")
              .child(
                S.list()
                  .title("Contact")
                  .items(
                    contactSections.map(([title, schemaType, documentId]) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.document()
                            .title(title)
                            .schemaType(schemaType)
                            .documentId(documentId),
                        ),
                    ),
                  ),
              ),
            S.divider(),
            S.listItem()
              .title("Projecten")
              .child(
                S.list()
                  .title("Projecten")
                  .items([
                    ...projectsSections.map(([title, schemaType, documentId]) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.document()
                            .title(title)
                            .schemaType(schemaType)
                            .documentId(documentId),
                        ),
                    ),
                    S.divider(),
                    S.documentTypeListItem("project").title("Cases"),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Juridisch")
              .child(
                S.list()
                  .title("Juridisch")
                  .items(
                    legalPages.map(([title, schemaType, documentId]) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.document()
                            .title(title)
                            .schemaType(schemaType)
                            .documentId(documentId),
                        ),
                    ),
                  ),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                item.getId() !== "project" &&
                !hiddenSingletonTypes.has(item.getId() ?? ""),
            ),
          ]),
    }),
    visionTool({ title: "Gegevens bekijken" }),
    nlNLLocale(),
  ],
  document: {
    newDocumentOptions: (templates) =>
      templates.filter(
        (template) => !hiddenSingletonTypes.has(template.templateId),
      ),
  },
  schema: { types: schemaTypes },
});
