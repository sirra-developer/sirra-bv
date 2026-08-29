"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "./icons/ArrowRightIcon";
import { HeaderLogo } from "./Logo";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/onze-filosofie", label: "Onze filosofie" },
  { href: "/diensten", label: "Diensten" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export function Header({ showProjects = false }: { showProjects?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visibleNavigation = showProjects
    ? [
        ...navigation.slice(0, 4),
        { href: "/projecten", label: "Projecten" },
        ...navigation.slice(4),
      ]
    : navigation;

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", closeMenu);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeMenu);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-background text-sirra-green border-sirra-taupe/35 relative z-50 border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link aria-label="SIRRA - naar de homepage" href="/">
          <HeaderLogo />
        </Link>

        <button
          type="button"
          className="text-sirra-green hover:bg-sirra-taupe/10 hover:text-sirra-taupe focus-visible:outline-sirra-green flex size-11 items-center justify-center rounded-md transition focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Menu sluiten" : "Menu openen"}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <svg
            aria-hidden="true"
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {isMenuOpen ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>

        <button
          type="button"
          aria-label="Menu sluiten"
          tabIndex={isMenuOpen ? 0 : -1}
          className={`${isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} bg-sirra-green/30 fixed inset-x-0 top-[69px] bottom-0 -z-10 backdrop-blur-[2px] transition-opacity duration-300 ease-out lg:hidden`}
          onClick={() => setIsMenuOpen(false)}
        />

        <nav
          id="mobile-navigation"
          className={`${isMenuOpen ? "visible translate-x-0 shadow-2xl" : "invisible translate-x-full shadow-none"} border-sirra-taupe/35 bg-background fixed top-[69px] right-0 bottom-0 w-[min(85vw,22rem)] border-l px-7 py-8 transition-[transform,visibility,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:visible lg:static lg:w-auto lg:translate-x-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:transition-none`}
          aria-label="Hoofdnavigatie"
        >
          <ul className="text-sirra-green flex flex-col text-lg lg:flex-row lg:gap-x-6 lg:text-sm">
            {visibleNavigation.map((item, index) => (
              <li
                key={item.href}
                className={`${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"} border-sirra-taupe/30 border-b transition-[transform,opacity] duration-500 ease-out lg:translate-x-0 lg:border-0 lg:opacity-100 lg:transition-none`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 45 + 100}ms` : "0ms",
                }}
              >
                <Link
                  className="hover:text-sirra-taupe focus-visible:outline-sirra-green group flex items-center justify-between py-4 transition focus-visible:outline-2 focus-visible:outline-offset-2 lg:block lg:py-0"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1 lg:hidden" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
