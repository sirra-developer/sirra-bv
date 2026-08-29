import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "../env";

const token = process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: !token,
  stega: {
    studioUrl,
  },
});
