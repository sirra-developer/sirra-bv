import Link from "next/link";
import { isSanityConfigured } from "../../sanity/env";
import { client } from "../../sanity/lib/client";
import { PROJECTS_VISIBILITY_QUERY } from "../../sanity/lib/queries";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/onze-filosofie", label: "Onze filosofie" },
  { href: "/diensten", label: "Diensten" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  let showProjects = false;
  if (isSanityConfigured) {
    try {
      showProjects = await client.fetch<boolean>(PROJECTS_VISIBILITY_QUERY);
    } catch {
      showProjects = false;
    }
  }

  const visibleNavigation = showProjects
    ? [
        ...navigation.slice(0, 3),
        { href: "/projecten", label: "Projecten" },
        ...navigation.slice(3),
      ]
    : navigation;

  return (
    <footer className="mt-auto px-4 pt-8 text-stone-50 sm:px-6">
      <div className="bg-sirra-green mx-auto max-w-6xl rounded-t-[2.5rem] border border-b-0 border-stone-800 px-7 pt-9 pb-6 sm:px-12 sm:pt-11 lg:px-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <section aria-labelledby="footer-social-title">
            <h2
              id="footer-social-title"
              className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase"
            >
              Volg ons
            </h2>
            <a
              className="mt-5 inline-flex items-center gap-3 rounded-full border border-stone-500 px-5 py-3 font-semibold transition hover:border-amber-400 hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              href="https://www.linkedin.com/company/sirra-bv/"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                aria-hidden="true"
                className="size-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
              </svg>
              LinkedIn
            </a>
          </section>

          <nav aria-labelledby="footer-navigation-title">
            <h2
              id="footer-navigation-title"
              className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase"
            >
              Alle pagina&apos;s
            </h2>
            <ul className="mt-4 space-y-1.5">
              {visibleNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="inline-block py-1 text-lg transition hover:translate-x-1 hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact-title">
            <h2
              id="footer-contact-title"
              className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase"
            >
              Contact
            </h2>
            <p className="mt-4 max-w-xs leading-7 text-stone-300">
              Een vraag of benieuwd wat we voor je kunnen betekenen?
            </p>
            <Link
              className="mt-4 inline-flex items-center gap-3 text-lg font-medium transition hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              href="/contact"
            >
              <svg
                aria-hidden="true"
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16v16H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              Contact opnemen
            </Link>
          </section>
        </div>

        <div className="mt-10 border-t border-stone-800 pt-5 text-center text-sm text-stone-400 sm:mt-12">
          <p>© 2026 SIRRA. Alle rechten voorbehouden.</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link
              className="transition hover:text-amber-400"
              href="/privacyverklaring"
            >
              Privacyverklaring
            </Link>
            <Link
              className="transition hover:text-amber-400"
              href="/algemene-voorwaarden"
            >
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
