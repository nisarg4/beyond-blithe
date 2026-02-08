import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Handle",
      description: "e.g. @beyondblithe",
      type: "string",
    }),
    defineField({
      name: "seoTitleTemplate",
      title: "SEO Title Template",
      description: "e.g. 'Beyond Blithe | Event Management Toronto'",
      type: "string",
    }),
    defineField({
      name: "seoDefaultDescription",
      title: "SEO Default Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
