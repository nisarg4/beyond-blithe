import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
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
      name: "successHeading",
      title: "Success Heading",
      description: "Heading shown after successful form submission",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alternativeContactText",
      title: "Alternative Contact Text",
      description: "Text shown in the alternative contact section",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
