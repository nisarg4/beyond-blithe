import { client } from "./client";
import type {
  Service,
  ServiceForHome,
  HomePageContent,
  AboutPageContent,
  ServicesPageContent,
  GalleryPageContent,
  ContactPageContent,
  SiteSettings,
} from "./types";

export async function getServices(): Promise<Service[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "service"] | order(displayOrder asc) {
      _id, title, icon, shortDescription, longDescription, image, features, displayOrder
    }`,
    {},
    { next: { tags: ["service"] } }
  );
}

export async function getServicesForHome(): Promise<ServiceForHome[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "service"] | order(displayOrder asc) {
      _id, title, icon, shortDescription
    }`,
    {},
    { next: { tags: ["service"] } }
  );
}

export async function getHomePage(): Promise<HomePageContent | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "homePage"][0] {
      heroHeading, heroHeadingAccent, heroSubheading, heroCta,
      sectionTitle, ctaHeading, ctaHeadingAccent, ctaSubheading, ctaButtonText
    }`,
    {},
    { next: { tags: ["homePage"] } }
  );
}

export async function getAboutPage(): Promise<AboutPageContent | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "aboutPage"][0] {
      heroTitle, heroSubtitle, storyTitle, storyContent, valuesTitle, values
    }`,
    {},
    { next: { tags: ["aboutPage"] } }
  );
}

export async function getServicesPage(): Promise<ServicesPageContent | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "servicesPage"][0] {
      heroTitle, heroSubtitle, ctaHeading, ctaSubtitle, ctaButtonText
    }`,
    {},
    { next: { tags: ["servicesPage"] } }
  );
}

export async function getGalleryPage(): Promise<GalleryPageContent | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "galleryPage"][0] {
      heroTitle, heroSubtitle, emptyStateText, ctaHeading, ctaSubtitle, ctaButtonText
    }`,
    {},
    { next: { tags: ["galleryPage"] } }
  );
}

export async function getContactPage(): Promise<ContactPageContent | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "contactPage"][0] {
      heroTitle, heroSubtitle, successHeading, successMessage, alternativeContactText
    }`,
    {},
    { next: { tags: ["contactPage"] } }
  );
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      companyName, tagline, description, location,
      instagramUrl, instagramHandle, facebookUrl, linkedinUrl,
      seoTitleTemplate, seoDefaultDescription, footerTagline
    }`,
    {},
    { next: { tags: ["siteSettings"] } }
  );
}
