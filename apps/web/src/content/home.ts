import data from "@content/home.json";
import { asset } from "@/lib/assets";
import type { HomeContent } from "./schema/home";

// This module reaches client chunks, where importing the Zod schema would ship
// ~65 KB gzip of Zod to the browser. The data is validated by validate-content
// in the build and by schema/dev-validate on the dev server instead.
const content = data as HomeContent;

export type HeroSlide = {
  id: number;
  image: string;
  title: string;
  description: string;
  fit: "cover" | "contain";
};

export type AboutContent = {
  image: string;
  established: string;
  establishedLabel: string;
  slides: string[][];
};

export type CampusHighlight = {
  image: string;
  title: string;
  description: string;
  className: string;
};

export const heroSlides: HeroSlide[] = content.hero.map((slide, index) => ({
  id: index + 1,
  image: asset(slide.image),
  title: slide.title,
  description: slide.description,
  fit: slide.fit === "contain" ? "contain" : "cover",
}));

export const aboutContent: AboutContent = {
  image: asset(content.about.image),
  established: content.about.established,
  establishedLabel: content.about.establishedLabel,
  slides: content.about.slides.map((paragraphs) => [...paragraphs]),
};

export const campusHighlights: CampusHighlight[] = content.campusLife.map((card) => ({
  image: asset(card.image),
  title: card.title,
  description: card.description,
  className: card.className ?? "",
}));
