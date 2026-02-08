"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { projectId, dataset, apiVersion } from "./config";

const singletonTypes = new Set([
  "homePage",
  "aboutPage",
  "servicesPage",
  "galleryPage",
  "contactPage",
  "siteSettings",
]);

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "beyond-blithe",
  title: "Beyond Blithe",
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons at the top
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),
            S.divider(),
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document().schemaType("homePage").documentId("homePage")
              ),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document().schemaType("aboutPage").documentId("aboutPage")
              ),
            S.listItem()
              .title("Services Page")
              .id("servicesPage")
              .child(
                S.document().schemaType("servicesPage").documentId("servicesPage")
              ),
            S.listItem()
              .title("Gallery Page")
              .id("galleryPage")
              .child(
                S.document().schemaType("galleryPage").documentId("galleryPage")
              ),
            S.listItem()
              .title("Contact Page")
              .id("contactPage")
              .child(
                S.document().schemaType("contactPage").documentId("contactPage")
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem("service").title("Services"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
