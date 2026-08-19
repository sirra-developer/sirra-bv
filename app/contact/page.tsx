import type { Metadata } from "next";
import { isSanityConfigured } from "../../sanity/env";
import { client } from "../../sanity/lib/client";
import { CONTACT_PAGE_QUERY } from "../../sanity/lib/queries";
import { ContactForm } from "../components/contact/ContactForm";
import type { ContactFormContent } from "../components/contact/ContactForm";
import { ContactHero } from "../components/contact/ContactHero";
import { ContactMap } from "../components/contact/ContactMap";
import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";
import { SectionAnimations } from "../components/SectionAnimations";

export const metadata: Metadata = {
  title: "Contact | SIRRA",
  description: "Begin bij het gesprek met SIRRA.",
};
export const revalidate = 60;

const defaultFormFields: ContactFormContent["fields"] = [
  { _key: "name", label: "Naam", inputType: "text", required: true },
  {
    _key: "organisation",
    label: "Organisatie",
    inputType: "text",
    required: false,
  },
  { _key: "email", label: "E-mailadres", inputType: "email", required: true },
  { _key: "subject", label: "Onderwerp", inputType: "text", required: true },
  {
    _key: "message",
    label: "Waar gaat het over?",
    inputType: "textarea",
    required: true,
  },
];

const fallback = {
  intro: {
    heading: "Begin bij het gesprek.",
    introduction:
      "De meeste trajecten beginnen met een uur aan tafel. Geen offerte, geen verkoopverhaal. Even samen kijken wat er speelt en of wij daar iets aan toevoegen.",
  },
  details: {
    heading: "Contactgegevens",
    email: "info@sirra.nl",
    whatsappPhone: "+31 (0)6 00000000",
    address: {
      street: "Naritaweg",
      houseNumber: "127-137",
      postalCode: "1043 BS",
      city: "Amsterdam",
    },
    chamberOfCommerce: "42079736",
    linkedinUrl: "https://www.linkedin.com/company/sirra-bv",
  },
  form: {
    heading: "Waar gaat het over?",
    action: "Versturen",
    responseText: "Wij reageren binnen twee werkdagen.",
    fields: defaultFormFields,
  },
  map: {
    heading: "Ons kantoor",
  },
};

async function getContent() {
  if (!isSanityConfigured) return fallback;
  try {
    const data = await client.fetch<typeof fallback>(CONTACT_PAGE_QUERY);
    return {
      intro: { ...fallback.intro, ...data?.intro },
      details: { ...fallback.details, ...data?.details },
      form: { ...fallback.form, ...data?.form },
      map: { ...fallback.map, ...data?.map },
    };
  } catch {
    return fallback;
  }
}

export default async function ContactPage() {
  const content = await getContent();
  const address = content.details.address;
  const formattedAddress = address
    ? `${address.street} ${address.houseNumber}, ${address.postalCode} ${address.city}`
    : "";
  return (
    <div className="bg-background text-foreground min-h-screen overflow-hidden">
      <SiteHeader />
      <main>
        <SectionAnimations>
          <ContactHero
            intro={content.intro}
            details={{ ...content.details, address: formattedAddress }}
          />
          <ContactForm content={content.form} />
          {formattedAddress ? (
            <ContactMap
              address={formattedAddress}
              heading={content.map.heading}
            />
          ) : null}
        </SectionAnimations>
      </main>
      <Footer />
    </div>
  );
}
