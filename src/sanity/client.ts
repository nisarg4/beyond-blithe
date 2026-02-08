import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, isSanityConfigured } from "./config";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
