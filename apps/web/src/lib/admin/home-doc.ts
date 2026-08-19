import type { HomeContent } from "../../content/schema/home.ts";
import { withKeys, type Keyed } from "./rows.ts";

/**
 * `content/home.json` ⇄ the shape the home editor works in.
 *
 * Kept out of the component so the rules that decide what actually gets
 * committed can be tested directly: which fields disappear when they are empty,
 * which defaults are written as absence, and the fact that a slide the Editor
 * never touched must come back byte-identical.
 */

export type HeroSlide = {
  image: string;
  title: string;
  description: string;
  fit: "cover" | "contain";
};

export type AboutSlide = { paragraphs: string[] };

export type CampusCard = {
  image: string;
  title: string;
  description: string;
  /** Raw Tailwind span. An Editor picks a size; this is what the size means. */
  className: string;
};

export type HomeState = {
  hero: Keyed<HeroSlide>[];
  about: {
    image: string;
    established: string;
    establishedLabel: string;
    slides: Keyed<AboutSlide>[];
  };
  campusLife: Keyed<CampusCard>[];
};

/**
 * The card sizes the home page's grid actually supports. An Editor picks
 * "Large" or "Normal"; nobody types Tailwind into a content form, and an
 * invented span would silently break the grid on one breakpoint.
 */
export const CARD_SIZES = [
  { value: "md:col-span-2 md:row-span-2", label: "Large (fills two columns and two rows)" },
  { value: "md:col-span-1 md:row-span-1", label: "Normal" },
] as const;

/**
 * The options for one card: the known sizes, plus whatever this card already
 * has if it is not one of them. A layout Pratik hand-tuned survives an Editor
 * opening the select — it is offered back rather than quietly replaced.
 */
export function sizeOptions(current: string): { value: string; label: string }[] {
  const known = CARD_SIZES.map((size) => ({ value: size.value, label: size.label }));
  if (!current || known.some((size) => size.value === current)) return known;
  return [...known, { value: current, label: `Custom (${current})` }];
}

export const DEFAULT_CARD_SIZE = CARD_SIZES[1].value;

export function toState(content: HomeContent): HomeState {
  return {
    hero: withKeys(
      content.hero.map((slide) => ({
        image: slide.image,
        title: slide.title,
        description: slide.description,
        fit: slide.fit ?? ("cover" as const),
      })),
    ),
    about: {
      image: content.about.image,
      established: content.about.established,
      establishedLabel: content.about.establishedLabel,
      slides: withKeys(content.about.slides.map((paragraphs) => ({ paragraphs: [...paragraphs] }))),
    },
    campusLife: withKeys(
      content.campusLife.map((card) => ({
        image: card.image,
        title: card.title,
        description: card.description,
        className: card.className ?? "",
      })),
    ),
  };
}

export function toDocument(state: HomeState, content: HomeContent): HomeContent {
  return {
    // `$schema` stays first so the file keeps its editor autocomplete.
    ...(content.$schema ? { $schema: content.$schema } : {}),
    hero: state.hero.map((slide) => ({
      image: slide.image,
      title: slide.title.trim(),
      description: slide.description.trim(),
      // "cover" is the schema's default, so writing it would add a field to
      // every slide that never had one and churn a diff for no change.
      ...(slide.fit === "contain" ? { fit: "contain" as const } : {}),
    })),
    about: {
      image: state.about.image,
      established: state.about.established.trim(),
      establishedLabel: state.about.establishedLabel.trim(),
      slides: state.about.slides.map((slide) => slide.paragraphs),
    },
    campusLife: state.campusLife.map((card) => ({
      image: card.image,
      title: card.title.trim(),
      description: card.description.trim(),
      ...(card.className.trim() ? { className: card.className.trim() } : {}),
    })),
  };
}

export function newHeroSlide(): HeroSlide {
  return { image: "", title: "", description: "", fit: "cover" };
}

export function newAboutSlide(): AboutSlide {
  return { paragraphs: [] };
}

export function newCampusCard(): CampusCard {
  return { image: "", title: "", description: "", className: DEFAULT_CARD_SIZE };
}

/**
 * Which field still needs filling in, phrased for the Editor, or undefined.
 * Every one of these would fail the schema at publish time; saying so before
 * the button is pressed is the difference between guidance and a rejection.
 */
export function firstProblem(state: HomeState): string | undefined {
  for (const [index, slide] of state.hero.entries()) {
    if (!slide.image) return `Hero slide ${index + 1} needs a background image.`;
    if (!slide.title.trim()) return `Hero slide ${index + 1} needs a title.`;
  }
  if (!state.about.image) return "The About section needs a photo.";
  if (!state.about.established.trim()) return "The About section needs the year of establishment.";
  if (state.about.slides.some((slide) => slide.paragraphs.length === 0)) {
    const index = state.about.slides.findIndex((slide) => slide.paragraphs.length === 0);
    return `About slide ${index + 1} has no text.`;
  }
  for (const [index, card] of state.campusLife.entries()) {
    if (!card.image) return `Student life card ${index + 1} needs a photo.`;
    if (!card.title.trim()) return `Student life card ${index + 1} needs a title.`;
  }
  return undefined;
}
