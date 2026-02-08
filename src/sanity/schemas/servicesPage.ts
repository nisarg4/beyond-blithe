import { defineType, defineField } from "sanity";

export default defineType({
  name: "servicesPage",
  title: "Services Page",
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
      return { title: "Services Page" };
    },
  },
});
