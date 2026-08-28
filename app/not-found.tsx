import type { Metadata } from "next";
import { ErrorPage } from "./components/ErrorPage";

export const metadata: Metadata = {
  title: "Pagina niet gevonden | SIRRA",
  description: "De pagina die je zoekt bestaat niet of is verplaatst.",
};

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      eyebrow="Pagina niet gevonden"
      title="Deze route brengt je niet verder."
      message="De pagina die je zoekt bestaat niet, is verplaatst of heeft een andere naam gekregen. Ga terug naar de start of neem contact op als je iets specifieks zoekt."
      primaryAction="Terug naar home"
    />
  );
}
