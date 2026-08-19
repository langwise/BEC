"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import {
  ActivitiesTab,
  ContactTab,
  ExtraTab,
  FacilitiesTab,
  LayoutTab,
  PlacementsTab,
  ResearchTab,
  StudentsTab,
} from "@/components/admin/departments-editor-tabs";
import { CrossLink, type TabProps } from "@/components/admin/departments-editor-shared";
import { ObjectList, ObjectTable } from "@/components/admin/content-list";
import {
  Block,
  DocsField,
  FlagField,
  LinesField,
  OptionalNumber,
  OptionalProse,
  OptionalText,
  PhotoField,
  PhotosField,
} from "@/components/admin/content-fields";
import { ChoiceField, EditorSection, FieldRow, TextField } from "@/components/admin/fields";
import { ImagePicker } from "@/components/admin/image-picker";
import { PublishBar } from "@/components/admin/publish-bar";
import type { DepartmentContent } from "@/content/schema/departments";
import { compact } from "@/lib/admin/normalize";
import {
  TABS,
  firstProblem,
  toDocument,
  toState,
  uploadFolder,
  type DepartmentState,
  type TabId,
} from "@/lib/admin/department-doc";
import { departmentPage } from "@/lib/admin/galleries";
import { useEditorDoc } from "@/lib/admin/use-editor-doc";
import { cn } from "@/lib/utils";

/**
 * One department's own pages — the largest document the Admin edits, and the
 * only one published an entry at a time.
 *
 * Seventy-five fields will not fit on a screen, so they sit behind the tabs the
 * department page itself has: an Editor who came to fix the vision statement
 * looks under About, because that is where it is on the site. The tab a problem
 * is on is named in the Publish bar and marked in the strip, so "something is
 * wrong somewhere in this department" is never the whole of what they are told.
 *
 * The state is the department object itself (see `department-doc.ts`), so a tab
 * nobody opened comes out of the publish exactly as it went in.
 */
export function DepartmentsEditor({
  contentKey,
  content,
}: {
  /** The key this department has in departments.json, e.g. "civil-engg". */
  contentKey: string;
  content: DepartmentContent;
}) {
  const { state, setState, document, dirty, publishState, onPublish } = useEditorDoc<
    DepartmentState,
    DepartmentContent
  >({ file: "departments.json", content, toState, toDocument, scope: contentKey });

  const [tab, setTab] = React.useState<TabId>("basics");

  const set = React.useCallback(
    <K extends keyof DepartmentContent>(field: K, value: DepartmentContent[K] | undefined) => {
      setState((now) => ({ ...now, [field]: value }) as DepartmentState);
    },
    [setState],
  );

  const folder = React.useCallback(
    (subfolder?: string) => uploadFolder(state, subfolder),
    [state],
  );

  const problem = React.useMemo(() => firstProblem(document), [document]);
  const props: TabProps = { value: state, set, folder, contentKey };

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-1.5" aria-label="Parts of this department's pages">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            aria-current={id === tab ? "page" : undefined}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
              id === tab
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {label}
            {problem?.tab === id ? (
              <AlertCircle className="size-3.5 text-amber-600" aria-label="needs attention" />
            ) : null}
          </button>
        ))}
      </nav>

      {TABS.filter((entry) => entry.id === tab).map((entry) => (
        <EditorSection key={entry.id} title={entry.label} description={entry.blurb}>
          {entry.id === "basics" ? <BasicsTab {...props} /> : null}
          {entry.id === "home" ? <HomeTab {...props} /> : null}
          {entry.id === "about" ? <AboutTab {...props} /> : null}
          {entry.id === "academics" ? <AcademicsTab {...props} /> : null}
          {entry.id === "curriculum" ? <CurriculumTab {...props} /> : null}
          {entry.id === "people" ? <PeopleTab {...props} /> : null}
          {entry.id === "research" ? <ResearchTab {...props} /> : null}
          {entry.id === "facilities" ? <FacilitiesTab {...props} /> : null}
          {entry.id === "activities" ? <ActivitiesTab {...props} /> : null}
          {entry.id === "students" ? <StudentsTab {...props} /> : null}
          {entry.id === "placements" ? <PlacementsTab {...props} /> : null}
          {entry.id === "contact" ? <ContactTab {...props} /> : null}
          {entry.id === "extra" ? <ExtraTab {...props} /> : null}
          {entry.id === "layout" ? <LayoutTab {...props} /> : null}
        </EditorSection>
      ))}

      <PublishBar
        state={publishState}
        dirty={dirty}
        onPublish={onPublish}
        blockedReason={
          problem
            ? `${tabName(problem.tab)}${problem.where} ${problem.message}`
            : undefined
        }
        viewUrl={departmentPage(contentKey)}
      />
    </div>
  );
}

function tabName(tab: TabId | undefined): string {
  const found = TABS.find((entry) => entry.id === tab);
  return found ? `${found.label}: ` : "";
}

/* ---------------------------------------------------------------- basics -- */

const DEGREES = [
  { value: "none", label: "None — this department awards no degree" },
  { value: "B.E.", label: "B.E." },
  { value: "M.Tech.", label: "M.Tech." },
  { value: "MCA", label: "MCA" },
  { value: "MBA", label: "MBA" },
] as const;

function BasicsTab({ value, set, folder }: TabProps) {
  return (
    <div className="space-y-6">
      <FieldRow>
        <TextField
          label="Department name"
          value={value.name ?? ""}
          onChange={(name) => set("name", name)}
          hint="The heading on every one of this department's pages."
        />
        <OptionalText
          label="Tagline"
          value={value.tagline}
          onChange={(tagline) => set("tagline", tagline)}
          hint="One line under the name, on the banner."
        />
      </FieldRow>

      <FieldRow>
        <OptionalText
          label="Established"
          value={value.established}
          onChange={(established) => set("established", established)}
          placeholder="1963"
        />
        <OptionalText
          label="Intake"
          value={value.intake}
          onChange={(intake) => set("intake", intake)}
          placeholder="120"
          hint="Shown in the row of facts at the top of the Home tab."
        />
      </FieldRow>

      <FieldRow>
        <ChoiceField
          label="Degree"
          value={value.degree ?? "none"}
          options={DEGREES.map((entry) => ({ value: entry.value, label: entry.label }))}
          onChange={(degree) =>
            set("degree", degree === "none" ? undefined : (degree as DepartmentContent["degree"]))
          }
          hint="Labels the Intake fact — “B.E. Intake”, “MBA Intake”."
        />
        <FlagField
          label="NBA accredited"
          hint="Adds an “NBA Accredited” card to the facts at the top of the Home tab."
          value={value.nbaAccredited}
          onChange={(nbaAccredited) => set("nbaAccredited", nbaAccredited)}
        />
      </FieldRow>

      <PhotosField
        label="Banner photos"
        hint="Across the top of every page of this department. One photo sits still; two or more roll as a carousel."
        value={value.hero}
        uploadFolder={folder()}
        onChange={(hero) => set("hero", hero)}
      />

      <ImagePicker
        label="Department chronicle graphic"
        description="A full-width timeline image above the overview. Most departments have none."
        value={value.chronicleImage}
        uploadFolder={folder()}
        onChange={(chronicleImage) => set("chronicleImage", chronicleImage)}
      />

      <Block
        label="Quick facts panel"
        hint="An optional panel of the department's own facts and research areas, beside the overview."
      >
        <ObjectTable
          items={value.quickFacts?.facts}
          onChange={(facts) =>
            set("quickFacts", compact({ ...value.quickFacts, facts }))
          }
          columns={[
            { field: "label", label: "Fact" },
            { field: "value", label: "Value" },
          ]}
          make={() => ({ label: "", value: "" })}
          noun="fact"
          reorderable
        />
        <LinesField
          label="Research areas in the panel"
          value={value.quickFacts?.researchAreas}
          onChange={(researchAreas) =>
            set("quickFacts", compact({ ...value.quickFacts, researchAreas }))
          }
        />
      </Block>

      <Block
        label="Where this department's photos live"
        hint="Folder names on the photo store. Changing them moves which photos the page finds, so leave them alone unless you know the folders have moved."
      >
        <FieldRow>
          <OptionalText
            label="Photo folder"
            value={value.assetSlug}
            onChange={(assetSlug) => set("assetSlug", assetSlug)}
            placeholder="civil"
          />
          <OptionalText
            label="Photo gallery folder"
            value={value.infrastructureGallerySlug}
            onChange={(infrastructureGallerySlug) =>
              set("infrastructureGallerySlug", infrastructureGallerySlug)
            }
            hint="Only when the gallery is drawn from a different folder than the one above."
          />
        </FieldRow>
      </Block>
    </div>
  );
}

/* ------------------------------------------------------------------ home -- */

function HomeTab({ value, set, folder }: TabProps) {
  const hod = value.hodMessage;
  return (
    <div className="space-y-6">
      <OptionalProse
        label="Overview"
        rows={8}
        value={value.overview}
        onChange={(overview) => set("overview", overview)}
        hint="The opening paragraphs of the department's Home tab."
      />

      <PhotoField
        label="Photo above the overview"
        value={value.overviewPhoto}
        uploadFolder={folder()}
        widthChoice
        onChange={(overviewPhoto) => set("overviewPhoto", overviewPhoto)}
      />

      <Block label="Message from the Head of Department">
        <ImagePicker
          label="Photograph"
          value={hod?.image}
          uploadFolder={folder("faculty")}
          onChange={(image) => set("hodMessage", compact({ ...hod, image }))}
        />
        <FieldRow>
          <OptionalText
            label="Name"
            value={hod?.name}
            onChange={(name) => set("hodMessage", compact({ ...hod, name }))}
          />
          <OptionalText
            label="Designation"
            value={hod?.designation}
            onChange={(designation) => set("hodMessage", compact({ ...hod, designation }))}
          />
        </FieldRow>
        <OptionalText
          label="Heading"
          value={hod?.title}
          placeholder="From the HoD's desk"
          onChange={(title) => set("hodMessage", compact({ ...hod, title }))}
        />
        <OptionalProse
          label="The message"
          rows={10}
          value={hod?.message}
          onChange={(message) => set("hodMessage", compact({ ...hod, message }))}
        />
      </Block>

      <LinesField
        label="Values"
        hint="A short bullet list under the overview."
        value={value.values}
        onChange={(values) => set("values", values)}
      />

      <LinesField
        label="Highlights"
        hint="What the department is known for, as bullets."
        value={value.highlights}
        onChange={(highlights) => set("highlights", highlights)}
      />

      <PhotoField
        label="Group photo at the foot of the Home tab"
        hint="Often the graduating batch."
        value={value.homeGroupPhoto}
        uploadFolder={folder()}
        widthChoice
        onChange={(homeGroupPhoto) => set("homeGroupPhoto", homeGroupPhoto)}
      />

      <Block label="Best practices" hint="Either written out here, or attached as PDFs below.">
        <ObjectTable
          items={value.bestPracticesList}
          onChange={(bestPracticesList) => set("bestPracticesList", bestPracticesList)}
          columns={[
            { field: "practice", label: "Practice" },
            { field: "year", label: "Year", width: "w-32" },
          ]}
          make={() => ({ practice: "" })}
          noun="practice"
          reorderable
        />
      </Block>

      <DocsField
        label="Best practice PDFs"
        value={value.bestPractices}
        uploadFolder={folder("docs")}
        onChange={(bestPractices) => set("bestPractices", bestPractices)}
      />
    </div>
  );
}

/* ----------------------------------------------------------------- about -- */

function AboutTab({ value, set, folder }: TabProps) {
  return (
    <div className="space-y-6">
      <OptionalProse
        label="About the department"
        rows={10}
        value={value.about}
        onChange={(about) => set("about", about)}
      />

      <PhotoField
        label="Photo above the description"
        value={value.aboutPhoto}
        uploadFolder={folder()}
        widthChoice
        onChange={(aboutPhoto) => set("aboutPhoto", aboutPhoto)}
      />

      <OptionalProse
        label="Vision"
        rows={4}
        value={value.vision}
        onChange={(vision) => set("vision", vision)}
      />

      <LinesField
        label="Mission"
        hint="One mission statement per line."
        value={value.mission}
        onChange={(mission) => set("mission", mission)}
      />

      <Block label="Milestones">
        <OptionalText
          label="Heading"
          value={value.milestones?.title}
          placeholder="Milestones"
          onChange={(title) =>
            set("milestones", compact({ ...value.milestones, title, items: value.milestones?.items ?? [] }))
          }
        />
        <LinesField
          label="Milestones"
          hint="One per line, oldest first."
          value={value.milestones?.items}
          onChange={(items) =>
            set(
              "milestones",
              items === undefined
                ? undefined
                : compact({ ...value.milestones, items }),
            )
          }
        />
      </Block>
    </div>
  );
}

/* ------------------------------------------------------------- academics -- */

function CodedItems({
  label,
  hint,
  items,
  onChange,
  noun,
  codeExample,
}: {
  label: string;
  hint: string;
  items: readonly { code: string; text: string }[] | undefined;
  onChange: (next: { code: string; text: string }[] | undefined) => void;
  noun: string;
  codeExample: string;
}) {
  return (
    <Block label={label} hint={hint}>
      <ObjectTable
        items={items}
        onChange={(next) => onChange(next.length === 0 ? undefined : next)}
        columns={[
          { field: "code", label: "Code", hint: codeExample, width: "w-28" },
          { field: "text", label: "Statement" },
        ]}
        make={() => ({ code: "", text: "" })}
        noun={noun}
        reorderable
      />
    </Block>
  );
}

function AcademicsTab({ value, set }: TabProps) {
  return (
    <div className="space-y-6">
      <LinesField
        label="Programmes offered"
        hint="One degree programme per line."
        value={value.programsOffered}
        onChange={(programsOffered) => set("programsOffered", programsOffered)}
      />

      <OptionalNumber
        label="Programme count shown in the facts row"
        hint="Only when the count differs from the number of lines above — e.g. one Ph.D. listed as two recognition tracks."
        value={value.programsOfferedCount}
        onChange={(programsOfferedCount) => set("programsOfferedCount", programsOfferedCount)}
      />

      <LinesField
        label="Courses offered"
        hint="Courses the department teaches, as distinct from its degree programmes."
        value={value.coursesOffered}
        onChange={(coursesOffered) => set("coursesOffered", coursesOffered)}
      />

      <LinesField
        label="Programme structure"
        hint="Duration, semesters, credits — one fact per line."
        value={value.programStructure}
        onChange={(programStructure) => set("programStructure", programStructure)}
      />

      <CodedItems
        label="Programme Educational Objectives (PEOs)"
        hint="Each with its own code, in the order they are numbered."
        items={value.peos}
        onChange={(peos) => set("peos", peos)}
        noun="PEO"
        codeExample="PEO1"
      />
      <CodedItems
        label="Programme Outcomes (POs)"
        hint="The outcome statements printed alongside the PEOs."
        items={value.pos}
        onChange={(pos) => set("pos", pos)}
        noun="PO"
        codeExample="PO1"
      />
      <CodedItems
        label="Programme Specific Outcomes (PSOs)"
        hint="The department's own outcomes, beyond the common POs."
        items={value.psos}
        onChange={(psos) => set("psos", psos)}
        noun="PSO"
        codeExample="PSO1"
      />
      <CodedItems
        label="Knowledge and Attitude Profile (WK)"
        hint="The WK statements, where the department publishes them."
        items={value.wk}
        onChange={(wk) => set("wk", wk)}
        noun="WK statement"
        codeExample="WK1"
      />
    </div>
  );
}

/* ------------------------------------------------------------ curriculum -- */

function CurriculumTab({ value, set, folder }: TabProps) {
  return (
    <Block
      label="Curriculum"
      hint="Each group is a labelled tab on the Curriculum page. A group holds either one run of PDFs, or blocks that each have their own heading and PDFs."
    >
      <ObjectList
        items={value.curriculumGroups}
        onChange={(curriculumGroups) => set("curriculumGroups", curriculumGroups)}
        make={() => ({ title: "" })}
        noun="tab"
        title={(group) => group.title}
        subtitle={(group) =>
          group.sections?.length
            ? `${group.sections.length} blocks`
            : `${group.documents?.length ?? 0} PDFs`
        }
      >
        {(group, patch) => (
          <>
            <TextField
              label="Tab name"
              value={group.title}
              onChange={(title) => patch({ title })}
              placeholder="Scheme of Teaching & Examinations"
            />
            <DocsField
              label="PDFs on this tab"
              hint="Use these when the tab is one flat run of documents."
              value={group.documents}
              uploadFolder={folder("curriculum")}
              onChange={(documents) => patch({ documents })}
            />
            <Block
              label="Or, blocks with their own headings"
              hint="Use these instead when the tab is split — one block per scheme year, say."
            >
              <ObjectList
                items={group.sections}
                onChange={(sections) => patch({ sections: sections.length ? sections : undefined })}
                make={() => ({ title: "", documents: [] })}
                noun="block"
                title={(section) => section.title}
                subtitle={(section) => `${section.documents.length} PDFs`}
              >
                {(section, patchSection) => (
                  <>
                    <TextField
                      label="Block heading"
                      value={section.title}
                      onChange={(title) => patchSection({ title })}
                    />
                    <DocsField
                      label="PDFs"
                      value={section.documents}
                      uploadFolder={folder("curriculum")}
                      onChange={(documents) => patchSection({ documents: documents ?? [] })}
                    />
                  </>
                )}
              </ObjectList>
            </Block>
          </>
        )}
      </ObjectList>
    </Block>
  );
}

/* ---------------------------------------------------------------- people -- */

const STAFF_ROLES = [
  { value: "none", label: "Not classified" },
  { value: "technical", label: "Technical staff" },
  { value: "supporting", label: "Supporting staff" },
] as const;

function PeopleTab({ value, set, folder }: TabProps) {
  return (
    <div className="space-y-6">
      <CrossLink href="/admin/faculty">
        Teaching faculty — names, designations, photographs and profile PDFs — are edited on the
        Faculty screen, which holds every department&rsquo;s roster in one place.
      </CrossLink>

      <PhotoField
        label="Teaching faculty group photo"
        value={value.facultyGroupPhoto}
        uploadFolder={folder()}
        widthChoice
        onChange={(facultyGroupPhoto) => set("facultyGroupPhoto", facultyGroupPhoto)}
      />

      <PhotoField
        label="Supporting staff group photo"
        value={value.staffGroupPhoto}
        uploadFolder={folder()}
        widthChoice
        onChange={(staffGroupPhoto) => set("staffGroupPhoto", staffGroupPhoto)}
      />

      <Block
        label="Supporting staff"
        hint="Technicians, instructors and support staff. Whether the two groups are shown apart is set on the Layout tab."
      >
        <ObjectList
          items={value.supportingStaff}
          onChange={(supportingStaff) => set("supportingStaff", supportingStaff)}
          make={() => ({ name: "", designation: "" })}
          noun="person"
          title={(person) => person.name}
          subtitle={(person) => person.designation || undefined}
        >
          {(person, patch) => (
            <>
              <ImagePicker
                label="Photograph"
                description="Leave empty and their initials are shown instead."
                value={person.photo}
                uploadFolder={folder("staff")}
                onChange={(photo) => patch({ photo })}
              />
              <FieldRow>
                <TextField
                  label="Name"
                  value={person.name}
                  onChange={(name) => patch({ name })}
                />
                <TextField
                  label="Designation"
                  value={person.designation}
                  onChange={(designation) => patch({ designation })}
                />
              </FieldRow>
              <ChoiceField
                label="Group"
                value={person.role ?? "none"}
                options={STAFF_ROLES.map((entry) => ({ value: entry.value, label: entry.label }))}
                onChange={(role) =>
                  patch({
                    role:
                      role === "none" ? undefined : (role as "technical" | "supporting"),
                  })
                }
                hint="Which table they appear in when the two are shown apart."
              />
            </>
          )}
        </ObjectList>
      </Block>

      <Block
        label="Committees"
        hint="Boards of studies, examination boards, advisory committees. A committee where nobody has an affiliation is printed as two columns instead of three."
      >
        <ObjectList
          items={value.committeeGroups}
          onChange={(committeeGroups) => set("committeeGroups", committeeGroups)}
          make={() => ({ title: "", members: [] })}
          noun="committee"
          title={(group) => group.title}
          subtitle={(group) =>
            group.members.length === 1 ? "1 member" : `${group.members.length} members`
          }
        >
          {(group, patch) => (
            <>
              <TextField
                label="Committee name"
                value={group.title}
                onChange={(title) => patch({ title })}
                placeholder="Board of Studies"
              />
              <ObjectTable
                items={group.members}
                onChange={(members) => patch({ members })}
                columns={[
                  { field: "name", label: "Name" },
                  { field: "position", label: "Seat", hint: "Chairman, Member…", width: "w-40" },
                  { field: "affiliation", label: "Designation and institution" },
                  { field: "email", label: "Email", width: "w-52" },
                  { field: "phone", label: "Phone", width: "w-36" },
                ]}
                make={() => ({ name: "", position: "" })}
                noun="member"
                reorderable
                pasteHint="One row per member."
              />
            </>
          )}
        </ObjectList>
      </Block>
    </div>
  );
}

