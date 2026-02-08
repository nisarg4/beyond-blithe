import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
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
      name: "storyTitle",
      title: "Story Section Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "storyContent",
      title: "Story Content",
      description: "Rich text content for the story section",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "valuesTitle",
      title: "Values Section Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
