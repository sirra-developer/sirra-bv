type ContactIntro = { heading: string; introduction: string };
type ContactDetails = {
  heading: string;
  email?: string;
  whatsappPhone?: string;
  address?: string;
  chamberOfCommerce?: string;
  linkedinUrl?: string;
};

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sirra-gold flex size-5 shrink-0 items-center justify-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

export function ContactHero({
  intro,
  details,
}: {
  intro: ContactIntro;
  details: ContactDetails;
}) {
  const whatsappNumber = details.whatsappPhone
    ?.replace(/\(0\)/g, "")
    .replace(/\D/g, "");

  return (
    <section
      data-animate-section
      className="px-6 pt-16 pb-14 sm:pt-24 sm:pb-20"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
        <div>
          <p data-animate-item className="eyebrow">
            Contact
          </p>
          <h1
            data-animate-item
            className="text-sirra-green mt-7 max-w-[15ch] text-5xl leading-[1.02] font-semibold tracking-[-.05em] text-balance sm:text-6xl lg:text-[4rem]"
          >
            {intro.heading}
          </h1>
          <p
            data-animate-item
            className="mt-9 max-w-[65ch] text-lg leading-8 text-stone-600 sm:text-xl"
          >
            {intro.introduction}
          </p>
        </div>

        <aside
          data-animate-item
          className="bg-sirra-green rounded-[2rem] p-7 text-white sm:p-9"
        >
          <p className="text-sirra-gold text-xs font-semibold tracking-[0.2em] uppercase">
            {details.heading}
          </p>
          <div className="mt-7 flex flex-col gap-3 text-base leading-6 text-white/80">
            {details.email ? (
              <a
                className="flex items-center gap-3 transition-colors hover:text-white"
                href={`mailto:${details.email}`}
              >
                <ContactIcon>
                  <path d="m3 6 9 7 9-7" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                </ContactIcon>
                {details.email}
              </a>
            ) : null}
            {details.address ? (
              <address className="flex items-center gap-3 not-italic">
                <ContactIcon>
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </ContactIcon>
                <span>{details.address.replace(/\s*\n+\s*/g, ", ")}</span>
              </address>
            ) : null}
            {details.chamberOfCommerce ? (
              <p className="flex items-center gap-3">
                <ContactIcon>
                  <path d="M4 21V7l8-4 8 4v14" />
                  <path d="M9 21v-5h6v5M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01" />
                </ContactIcon>
                <span>KvK {details.chamberOfCommerce}</span>
              </p>
            ) : null}
            {details.linkedinUrl || whatsappNumber ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {details.linkedinUrl ? (
                  <a
                    className="bg-sirra-gold text-sirra-green inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition-colors duration-300 hover:bg-white"
                    href={details.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-4 fill-current"
                    >
                      <path d="M6.5 8.2H3V19h3.5V8.2ZM4.8 3A2 2 0 1 0 4.8 7a2 2 0 0 0 0-4ZM21 12.8c0-3.3-1.8-4.9-4.2-4.9-2 0-2.8 1.1-3.3 1.8V8.2H10V19h3.5v-5.3c0-1.4.3-2.8 2.1-2.8 1.8 0 1.8 1.7 1.8 2.9V19H21v-6.2Z" />
                    </svg>
                    LinkedIn
                  </a>
                ) : null}
                {whatsappNumber ? (
                  <a
                    className="text-sirra-green hover:bg-sirra-gold inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold transition-colors duration-300"
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-4 fill-current"
                    >
                      <path d="M20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.3 23.6l6-1.6a11.7 11.7 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.5 3.5Zm-8.6 17.9c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.5.9.9-3.4-.2-.4A9.8 9.8 0 1 1 12 21.4Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-1.7-.8-2.8-1.5-4-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 2.2 1 3.1 1.1 4.2.9.7-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.4-.3-.7-.4Z" />
                    </svg>
                    WhatsApp
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}
