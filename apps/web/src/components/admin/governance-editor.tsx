"use client";

import * as React from "react";
import {
  ChoiceField,
  EditorSection,
  FieldRow,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import { ImagePicker } from "@/components/admin/image-picker";
import { ListEditor } from "@/components/admin/list-editor";
import { PublishBar } from "@/components/admin/publish-bar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GovernanceContent } from "@/content/schema/governance";
import {
  BOG_CATEGORIES,
  firstProblem,
  newBogMember,
  newCouncilMember,
  newHod,
  newPerson,
  newSanghaMember,
  toDocument,
  toState,
  type BogRow,
  type CouncilRow,
  type GovernanceState,
  type HodRow,
  type PersonRow,
  type SanghaMemberRow,
} from "@/lib/admin/governance-doc";
import type { Keyed } from "@/lib/admin/rows";
import { useEditorDoc } from "@/lib/admin/use-editor-doc";

/**
 * Six lists of people across four page sections. Tabs rather than one long
 * scroll: the sections are genuinely separate parts of the site — nobody edits
 * a Dean and a Board member in the same sitting — and a single column holding
 * 40-odd cards is a screen where the Publish button is always off-screen.
 */

const PHOTO_FOLDERS = {
  leadership: "governance/deans",
  hod: "governance/hod",
  sangha: "governance/sangha",
  bog: "governance/bog",
};

type Tab = "leadership" | "hods" | "sangha" | "bog";

const TABS: { value: Tab; label: string }[] = [
  { value: "leadership", label: "Leadership" },
  { value: "hods", label: "Heads of Department" },
  { value: "sangha", label: "B.V.V. Sangha" },
  { value: "bog", label: "Board of Governors" },
];

export function GovernanceEditor({ content }: { content: GovernanceContent }) {
  const { state, setState, dirty, publishState, onPublish, reset } = useEditorDoc<
    GovernanceState,
    GovernanceContent
  >({ file: "governance.json", content, toState, toDocument });

  const blockedReason = React.useMemo(() => firstProblem(state), [state]);

  const patch = React.useCallback(
    (values: Partial<GovernanceState>) => setState((current) => ({ ...current, ...values })),
    [setState],
  );
  const patchSangha = React.useCallback(
    (values: Partial<GovernanceState["sangha"]>) =>
      setState((current) => ({ ...current, sangha: { ...current.sangha, ...values } })),
    [setState],
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="leadership" onValueChange={reset}>
        <TabsList className="flex-wrap">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="leadership" className="mt-6 space-y-12">
          <EditorSection
            title="Principal"
            description="The banner at the top of the Leadership page."
          >
            <div className="space-y-4 rounded-lg border bg-card p-4 md:p-5">
              <ImagePicker
                value={state.principal.photo || undefined}
                onChange={(photo) =>
                  patch({ principal: { ...state.principal, photo: photo ?? "" } })
                }
                label="Photo"
                clearable={false}
                uploadFolder={PHOTO_FOLDERS.leadership}
              />
              <FieldRow>
                <TextField
                  label="Name"
                  value={state.principal.name}
                  onChange={(name) => patch({ principal: { ...state.principal, name } })}
                />
                <TextField
                  label="Role"
                  value={state.principal.role}
                  onChange={(role) => patch({ principal: { ...state.principal, role } })}
                  hint="Printed under the name."
                />
              </FieldRow>
              <TextField
                label="Email"
                type="email"
                value={state.principal.email}
                onChange={(email) => patch({ principal: { ...state.principal, email } })}
                hint="Leave empty to show no email address."
              />
            </div>
          </EditorSection>

          <EditorSection title="Deans" description="Shown as cards in the Deans section.">
            <PeopleList
              items={state.deans}
              onChange={(deans) => patch({ deans })}
              noun="dean"
            />
          </EditorSection>

          <EditorSection
            title="Officers"
            description="Controller of Examinations, Librarian and other statutory officers."
          >
            <PeopleList
              items={state.officers}
              onChange={(officers) => patch({ officers })}
              noun="officer"
            />
          </EditorSection>
        </TabsContent>

        <TabsContent value="hods" className="mt-6">
          <EditorSection
            title="Heads of Department"
            description="In the order they appear on the page. A department with no head named yet still gets a card."
          >
            <ListEditor<HodRow>
              items={state.hods}
              onChange={(hods) => patch({ hods })}
              make={newHod}
              noun="department"
              title={(hod) => hod.department}
              subtitle={(hod) => hod.name || "No head named yet"}
              empty="No departments listed yet."
            >
              {(hod, set) => (
                <>
                  <TextField
                    label="Department"
                    value={hod.department}
                    onChange={(department) => set({ department })}
                    placeholder="Civil Engineering"
                  />
                  <ImagePicker
                    value={hod.photo || undefined}
                    onChange={(photo) => set({ photo: photo ?? "" })}
                    label="Photo"
                    uploadFolder={PHOTO_FOLDERS.hod}
                  />
                  <FieldRow>
                    <TextField
                      label="Name"
                      value={hod.name}
                      onChange={(name) => set({ name })}
                      hint="Leave empty if the post is vacant."
                    />
                    <TextField
                      label="Title"
                      value={hod.title}
                      onChange={(title) => set({ title })}
                      placeholder="Head of Department"
                    />
                  </FieldRow>
                  <TextField
                    label="Email"
                    type="email"
                    value={hod.email}
                    onChange={(email) => set({ email })}
                  />
                  <FlagField
                    label="Mark as awaiting confirmation"
                    hint="Shows the card as provisional rather than as a confirmed appointment."
                    checked={hod.placeholder}
                    onChange={(placeholder) => set({ placeholder })}
                  />
                </>
              )}
            </ListEditor>
          </EditorSection>
        </TabsContent>

        <TabsContent value="sangha" className="mt-6 space-y-12">
          <EditorSection
            title="The Sangha"
            description="The parent trust block: an introduction, the group photo, and the two office-bearers."
          >
            <div className="space-y-4 rounded-lg border bg-card p-4 md:p-5">
              <TextAreaField
                label="Introduction"
                value={state.sangha.intro}
                onChange={(intro) => patchSangha({ intro })}
                rows={3}
                hint="Leave empty to show no introduction."
              />
              <ImagePicker
                value={state.sangha.groupPhoto || undefined}
                onChange={(groupPhoto) => patchSangha({ groupPhoto: groupPhoto ?? "" })}
                label="Group photo"
                clearable={false}
                uploadFolder={PHOTO_FOLDERS.sangha}
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <OfficeBearer
                title="Chairman"
                photoFolder={PHOTO_FOLDERS.sangha}
                name={state.sangha.chairman.name}
                role={state.sangha.chairman.role}
                photo={state.sangha.chairman.photo}
                photoRequired
                onChange={(values) =>
                  patchSangha({ chairman: { ...state.sangha.chairman, ...values } })
                }
              >
                <TextField
                  label="Link to the chairman's message"
                  value={state.sangha.chairman.messageHref}
                  onChange={(messageHref) =>
                    patchSangha({ chairman: { ...state.sangha.chairman, messageHref } })
                  }
                  placeholder="/about/chairman-message"
                  hint="Leave empty for no link."
                />
              </OfficeBearer>

              <OfficeBearer
                title="Secretary"
                photoFolder={PHOTO_FOLDERS.sangha}
                name={state.sangha.secretary.name}
                role={state.sangha.secretary.role}
                photo={state.sangha.secretary.photo}
                onChange={(values) =>
                  patchSangha({ secretary: { ...state.sangha.secretary, ...values } })
                }
              />
            </div>
          </EditorSection>

          <EditorSection
            title="Sangha members"
            description="Members shown with photographs."
          >
            <ListEditor<SanghaMemberRow>
              items={state.sangha.members}
              onChange={(members) => patchSangha({ members })}
              make={newSanghaMember}
              noun="member"
              title={(member) => member.name}
              subtitle={(member) => member.role || undefined}
            >
              {(member, set) => (
                <>
                  <ImagePicker
                    value={member.photo || undefined}
                    onChange={(photo) => set({ photo: photo ?? "" })}
                    label="Photo"
                    uploadFolder={PHOTO_FOLDERS.sangha}
                  />
                  <FieldRow>
                    <TextField
                      label="Name"
                      value={member.name}
                      onChange={(name) => set({ name })}
                    />
                    <TextField
                      label="Role"
                      value={member.role}
                      onChange={(role) => set({ role })}
                    />
                  </FieldRow>
                </>
              )}
            </ListEditor>
          </EditorSection>

          <EditorSection
            title="Governing council"
            description="Listed by name and role, without photographs."
          >
            <ListEditor<CouncilRow>
              items={state.sangha.council}
              onChange={(council) => patchSangha({ council })}
              make={newCouncilMember}
              noun="member"
              title={(member) => member.name}
              subtitle={(member) => member.role || undefined}
            >
              {(member, set) => (
                <>
                  <FieldRow>
                    <TextField
                      label="Name"
                      value={member.name}
                      onChange={(name) => set({ name })}
                    />
                    <TextField
                      label="Role"
                      value={member.role}
                      onChange={(role) => set({ role })}
                    />
                  </FieldRow>
                  <FlagField
                    label="Special invitee"
                    hint="Listed separately from the elected members."
                    checked={member.invitee}
                    onChange={(invitee) => set({ invitee })}
                  />
                </>
              )}
            </ListEditor>
          </EditorSection>
        </TabsContent>

        <TabsContent value="bog" className="mt-6">
          <EditorSection
            title="Board of Governors"
            description="The page groups members by the category set here, so a member moves between groups by changing their category — not by reordering this list."
          >
            <ListEditor<BogRow>
              items={state.bog}
              onChange={(bog) => patch({ bog })}
              make={newBogMember}
              noun="member"
              title={(member) => member.name}
              subtitle={(member) => member.role || undefined}
            >
              {(member, set) => (
                <>
                  <ImagePicker
                    value={member.photo || undefined}
                    onChange={(photo) => set({ photo: photo ?? "" })}
                    label="Photo"
                    uploadFolder={PHOTO_FOLDERS.bog}
                  />
                  <FieldRow>
                    <TextField
                      label="Name"
                      value={member.name}
                      onChange={(name) => set({ name })}
                    />
                    <TextField
                      label="Role"
                      value={member.role}
                      onChange={(role) => set({ role })}
                      placeholder="Member"
                    />
                  </FieldRow>
                  <TextAreaField
                    label="Affiliation"
                    value={member.affiliation}
                    onChange={(affiliation) => set({ affiliation })}
                    rows={2}
                    hint="Where they are from — shown under the role."
                  />
                  <ChoiceField
                    label="Category"
                    value={member.category}
                    onChange={(category) => set({ category })}
                    options={BOG_CATEGORIES}
                    hint="Which group on the page this member appears in."
                  />
                </>
              )}
            </ListEditor>
          </EditorSection>
        </TabsContent>
      </Tabs>

      <PublishBar
        state={publishState}
        dirty={dirty}
        onPublish={onPublish}
        blockedReason={blockedReason}
        viewUrl="/administration/governance"
      />
    </div>
  );
}

/** Deans and officers are the same card, so they are the same list. */
function PeopleList({
  items,
  onChange,
  noun,
}: {
  items: Keyed<PersonRow>[];
  onChange: (next: Keyed<PersonRow>[]) => void;
  noun: string;
}) {
  return (
    <ListEditor<PersonRow>
      items={items}
      onChange={onChange}
      make={newPerson}
      noun={noun}
      title={(person) => person.name || person.role}
      subtitle={(person) => (person.name ? person.role : undefined)}
    >
      {(person, set) => (
        <>
          <ImagePicker
            value={person.photo || undefined}
            onChange={(photo) => set({ photo: photo ?? "" })}
            label="Photo"
            uploadFolder={PHOTO_FOLDERS.leadership}
          />
          <FieldRow>
            <TextField label="Name" value={person.name} onChange={(name) => set({ name })} />
            <TextField
              label="Role"
              value={person.role}
              onChange={(role) => set({ role })}
              hint="Required — the card is titled by it."
            />
          </FieldRow>
          <FieldRow>
            <TextField
              label="Email"
              type="email"
              value={person.email}
              onChange={(email) => set({ email })}
            />
            <TextField
              label="Phone"
              type="tel"
              value={person.phone}
              onChange={(phone) => set({ phone })}
            />
          </FieldRow>
          <TextField
            label="Responsibility"
            value={person.focus}
            onChange={(focus) => set({ focus })}
            placeholder="Programs & curriculum"
            hint="One short line under the contact details."
          />
        </>
      )}
    </ListEditor>
  );
}

function OfficeBearer({
  title,
  name,
  role,
  photo,
  photoFolder,
  photoRequired = false,
  onChange,
  children,
}: {
  title: string;
  name: string;
  role: string;
  photo: string;
  photoFolder: string;
  photoRequired?: boolean;
  onChange: (values: { name?: string; role?: string; photo?: string }) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-lg border bg-card p-4 md:p-5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ImagePicker
        value={photo || undefined}
        onChange={(next) => onChange({ photo: next ?? "" })}
        label="Photo"
        clearable={!photoRequired}
        uploadFolder={photoFolder}
      />
      <TextField label="Name" value={name} onChange={(next) => onChange({ name: next })} />
      <TextField label="Role" value={role} onChange={(next) => onChange({ role: next })} />
      {children}
    </div>
  );
}

function FlagField({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const id = React.useId();
  return (
    <div className="flex items-start gap-3 pt-1">
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
      <div className="space-y-0.5">
        <Label htmlFor={id} className="font-normal">
          {label}
        </Label>
        {hint ? <p className="text-muted-foreground text-xs">{hint}</p> : null}
      </div>
    </div>
  );
}
