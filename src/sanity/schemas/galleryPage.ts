import { defineType, defineField } from "sanity";

export default defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "emptyStateText",
      title: "Empty State Text",
      description: "Text shown when gallery has no images",
      type: "string",
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaSubtitle",
      title: "CTA Subtitle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Gallery Page" };
    },
  },
});
