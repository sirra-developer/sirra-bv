import type { Metadata } from "next";
import { LegalPage } from "../components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Algemene voorwaarden | SIRRA",
  description: "Bekijk de algemene voorwaarden van SIRRA.",
};
export const revalidate = 60;

export default function TermsPage() {
  return <LegalPage documentId="termsPage" />;
}
