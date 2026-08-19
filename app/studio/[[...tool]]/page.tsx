import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";

import config from "../../../sanity.config";

export const metadata: Metadata = {
  title: "SIRRA CMS",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
