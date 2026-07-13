import data from "@content/home.json";
import { asset } from "@/lib/assets";

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

export const heroSlides: HeroSlide[] = data.hero.map((slide, index) => ({
  id: index + 1,
  image: asset(slide.image),
  title: slide.title,
  description: slide.description,
  fit: "fit" in slide && slide.fit === "contain" ? "contain" : "cover",
}));

export const aboutContent: AboutContent = {
  image: asset(data.about.image),
  established: data.about.established,
  establishedLabel: data.about.establishedLabel,
  slides: data.about.slides.map((paragraphs) => [...paragraphs]),
};

export const campusHighlights: CampusHighlight[] = data.campusLife.map((card) => ({
  image: asset(card.image),
  title: card.title,
  description: card.description,
  className: card.className ?? "",
}));
