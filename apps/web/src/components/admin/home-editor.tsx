"use client";

import * as React from "react";
import {
  ChoiceField,
  EditorSection,
  FieldRow,
  ParagraphsField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import { ImagePicker } from "@/components/admin/image-picker";
import { ListEditor } from "@/components/admin/list-editor";
import { PublishBar } from "@/components/admin/publish-bar";
import type { HomeContent } from "@/content/schema/home";
import {
  firstProblem,
  newAboutSlide,
  newCampusCard,
  newHeroSlide,
  sizeOptions,
  toDocument,
  toState,
  type AboutSlide,
  type CampusCard,
  type HeroSlide,
  type HomeState,
} from "@/lib/admin/home-doc";
import type { Keyed } from "@/lib/admin/rows";
import { useEditorDoc } from "@/lib/admin/use-editor-doc";

/**
 * The home page, in the order it appears on the site — hero, then About, then
 * Student life. An Editor scrolling this screen is walking down the page they
 * are about to change, which is the only ordering that needs no explaining.
 */

/** Where an upload from each field is filed, matching what is already there. */
const HERO_FOLDER = "institute/campus";
const ABOUT_FOLDER = "institute/group-photos";
const CAMPUS_FOLDER = "student-life";

const FIT_OPTIONS = [
  { value: "cover" as const, label: "Fill the slide (crops the edges)" },
  { value: "contain" as const, label: "Show the whole image (adds bars)" },
];

export function HomeEditor({ content }: { content: HomeContent }) {
  const { state, setState, dirty, publishState, onPublish } = useEditorDoc<
    HomeState,
    HomeContent
  >({ file: "home.json", content, toState, toDocument });

  const blockedReason = React.useMemo(() => firstProblem(state), [state]);

  const setHero = (hero: Keyed<HeroSlide>[]) => setState((current) => ({ ...current, hero }));
  const setCampus = (campusLife: Keyed<CampusCard>[]) =>
    setState((current) => ({ ...current, campusLife }));
  const setAbout = (patch: Partial<HomeState["about"]>) =>
    setState((current) => ({ ...current, about: { ...current.about, ...patch } }));

  return (
    <div className="space-y-12">
      <EditorSection
        title="Hero slides"
        description="The full-screen carousel at the very top of the home page. Slides rotate in this order."
      >
        <ListEditor<HeroSlide>
          items={state.hero}
          onChange={setHero}
          make={newHeroSlide}
          noun="slide"
          title={(slide) => slide.title}
          subtitle={(slide) => slide.description || undefined}
          empty="No slides yet — the top of the home page would be empty."
        >
          {(slide, patch) => (
            <>
              <ImagePicker
                value={slide.image || undefined}
                onChange={(image) => patch({ image: image ?? "" })}
                label="Background image"
                description="Fills the whole screen. Landscape photos work best."
                clearable={false}
                uploadFolder={HERO_FOLDER}
              />
              <TextField
                label="Title"
                value={slide.title}
                onChange={(title) => patch({ title })}
                placeholder="A Legacy of Excellence Since 1963"
              />
              <TextAreaField
                label="Description"
                value={slide.description}
                onChange={(description) => patch({ description })}
                rows={2}
                hint="One sentence under the title."
              />
              <ChoiceField
                label="How the image fits"
                value={slide.fit}
                onChange={(fit) => patch({ fit })}
                options={FIT_OPTIONS}
                hint="Use “show the whole image” for photos where cropping would cut something out."
              />
            </>
          )}
        </ListEditor>
      </EditorSection>

      <EditorSection
        title="About BEC"
        description="The photo, the big year, and the text that rotates beside it."
      >
        <div className="space-y-4 rounded-lg border bg-card p-4 md:p-5">
          <ImagePicker
            value={state.about.image || undefined}
            onChange={(image) => setAbout({ image: image ?? "" })}
            label="Photo"
            description="Shown beside the text, with the year written across it."
            clearable={false}
            uploadFolder={ABOUT_FOLDER}
          />
          <FieldRow>
            <TextField
              label="Year"
              value={state.about.established}
              onChange={(established) => setAbout({ established })}
              placeholder="1963"
              hint="The large number on the photo."
            />
            <TextField
              label="Caption under the year"
              value={state.about.establishedLabel}
              onChange={(establishedLabel) => setAbout({ establishedLabel })}
              placeholder="Year of Establishment"
            />
          </FieldRow>
        </div>

        <ListEditor<AboutSlide>
          items={state.about.slides}
          onChange={(slides) => setAbout({ slides })}
          make={newAboutSlide}
          noun="slide"
          title={(slide, index) => `Slide ${index + 1}`}
          subtitle={(slide) => slide.paragraphs[0]?.slice(0, 90)}
          empty="No text yet — the About section would show only the photo."
        >
          {(slide, patch) => (
            <ParagraphsField
              label="Text"
              value={slide.paragraphs}
              onChange={(paragraphs) => patch({ paragraphs })}
            />
          )}
        </ListEditor>
      </EditorSection>

      <EditorSection
        title="Student life"
        description="The picture cards near the bottom of the home page."
      >
        <ListEditor<CampusCard>
          items={state.campusLife}
          onChange={setCampus}
          make={newCampusCard}
          noun="card"
          title={(card) => card.title}
          subtitle={(card) => card.description || undefined}
          empty="No cards yet — the Student life section would be empty."
        >
          {(card, patch) => (
            <>
              <ImagePicker
                value={card.image || undefined}
                onChange={(image) => patch({ image: image ?? "" })}
                label="Photo"
                clearable={false}
                uploadFolder={CAMPUS_FOLDER}
              />
              <TextField
                label="Title"
                value={card.title}
                onChange={(title) => patch({ title })}
                placeholder="Student Clubs"
              />
              <TextAreaField
                label="Description"
                value={card.description}
                onChange={(description) => patch({ description })}
                rows={2}
              />
              <ChoiceField
                label="Card size"
                value={card.className}
                onChange={(className) => patch({ className })}
                options={sizeOptions(card.className)}
                hint="One large card and the rest normal is what the grid is built for."
              />
            </>
          )}
        </ListEditor>
      </EditorSection>

      <PublishBar
        state={publishState}
        dirty={dirty}
        onPublish={onPublish}
        blockedReason={blockedReason}
        viewUrl="/"
      />
    </div>
  );
}
