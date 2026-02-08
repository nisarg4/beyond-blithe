import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      description: "Main hero text (e.g. 'Your Moments,')",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHeadingAccent",
      title: "Hero Heading Accent",
      description: "Gold/accent text (e.g. 'Our Family')",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroCta",
      title: "Hero CTA Button Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Services Section Title",
      description: "Title above the services grid (e.g. 'What We Do')",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Section Heading",
      description: "Main text before accent (e.g. 'Ready to Create Something')",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaHeadingAccent",
      title: "CTA Heading Accent",
      description: "Gold text in CTA (e.g. 'Beautiful')",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaSubheading",
      title: "CTA Subheading",
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
      return { title: "Home Page" };
    },
  },
});
