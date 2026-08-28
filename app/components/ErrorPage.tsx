"use client";

import Link from "next/link";
import { Header } from "./Header";

type ErrorPageProps = {
  code: string;
  eyebrow: string;
  title: string;
  message: string;
  primaryAction: string;
  primaryHref?: string;
  onRetry?: () => void;
  secondaryAction?: string;
  secondaryHref?: string;
};

export function ErrorPage({
  code,
  eyebrow,
  title,
  message,
  primaryAction,
  primaryHref = "/",
  onRetry,
  secondaryAction = "Contact opnemen",
  secondaryHref = "/contact",
}: ErrorPageProps) {
  const primaryClasses =
    "bg-sirra-green text-white inline-flex rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-sirra-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sirra-green";

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center px-6 py-20">
        <section className="mx-auto w-full max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <p className="text-sirra-green mt-8 text-7xl leading-none font-semibold tracking-[-0.05em] sm:text-8xl">
            {code}
          </p>
          <h1 className="text-sirra-green mt-4 max-w-2xl text-4xl leading-tight font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            {message}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {onRetry ? (
              <button
                type="button"
                className={primaryClasses}
                onClick={onRetry}
              >
                {primaryAction}
              </button>
            ) : (
              <Link href={primaryHref} className={primaryClasses}>
                {primaryAction}
              </Link>
            )}
            <Link
              href={secondaryHref}
              className="border-sirra-taupe/45 text-sirra-green hover:border-sirra-green focus-visible:outline-sirra-green inline-flex rounded-full border px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {secondaryAction}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
