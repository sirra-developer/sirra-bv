import type { Metadata } from "next";
import { LegalPage } from "../components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacyverklaring | SIRRA",
  description: "Lees hoe SIRRA omgaat met persoonsgegevens.",
};
export const revalidate = 60;

export default function PrivacyPage() {
  return <LegalPage documentId="privacyPage" />;
}
