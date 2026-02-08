import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface Service {
  _id: string;
  title: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  image?: SanityImage;
  features?: string[];
  displayOrder: number;
}

export interface ServiceForHome {
  _id: string;
  title: string;
  icon: string;
  shortDescription: string;
}

export interface HomePageContent {
  heroHeading: string;
  heroHeadingAccent: string;
  heroSubheading: string;
  heroCta: string;
  sectionTitle: string;
  ctaHeading: string;
  ctaHeadingAccent: string;
  ctaSubheading: string;
  ctaButtonText: string;
}

export interface AboutPageContent {
  heroTitle: string;
  heroSubtitle: string;
  storyTitle: string;
  storyContent: PortableTextBlock[];
  valuesTitle: string;
  values: { title: string; description: string }[];
}

export interface ServicesPageContent {
  heroTitle: string;
  heroSubtitle: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export interface GalleryPageContent {
  heroTitle: string;
  heroSubtitle: string;
  emptyStateText?: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export interface ContactPageContent {
  heroTitle: string;
  heroSubtitle: string;
  successHeading: string;
  successMessage: string;
  alternativeContactText?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline?: string;
  description?: string;
  location?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  seoTitleTemplate?: string;
  seoDefaultDescription?: string;
  footerTagline?: string;
}
