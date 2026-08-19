import { isSanityConfigured } from "../../sanity/env";
import { client } from "../../sanity/lib/client";
import { PROJECTS_VISIBILITY_QUERY } from "../../sanity/lib/queries";
import { Header } from "./Header";

export async function SiteHeader() {
  let showProjects = false;
  if (isSanityConfigured) {
    try {
      showProjects = await client.fetch<boolean>(PROJECTS_VISIBILITY_QUERY);
    } catch {
      showProjects = false;
    }
  }
  return <Header showProjects={showProjects} />;
}
