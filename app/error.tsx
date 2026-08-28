"use client";

import { useEffect } from "react";
import { ErrorPage } from "./components/ErrorPage";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      code="500"
      eyebrow="Er ging iets mis"
      title="De uitvoering hapert even."
      message="Er is iets onverwachts gebeurd. Probeer het opnieuw; blijft het probleem terugkomen, dan kijken we graag met je mee."
      primaryAction="Opnieuw proberen"
      onRetry={unstable_retry}
    />
  );
}
