"use client";

import * as React from "react";
import { DepartmentSwitcher } from "@/components/admin/department-switcher";
import { EditorSection, FieldRow, TextField } from "@/components/admin/fields";
import { ImagePicker } from "@/components/admin/image-picker";
import { ListEditor } from "@/components/admin/list-editor";
import { PublishBar } from "@/components/admin/publish-bar";
import type { FacultyContent } from "@/content/schema/faculty";
import { departmentName, orderedKeys, type DepartmentOption } from "@/lib/admin/departments";
import {
  firstProblem,
  newProfile,
  newRoster,
  toDocument,
  toState,
  uploadFolders,
  type FacultyState,
  type ProfileRow,
} from "@/lib/admin/faculty-doc";
import { departmentPage } from "@/lib/admin/galleries";
import { patchAt, withKey } from "@/lib/admin/rows";
import { useEditorDoc } from "@/lib/admin/use-editor-doc";

/**
 * 198 profiles across 21 departments, edited one department at a time.
 *
 * A department's roster is the unit of work — nobody edits Civil and MBA in
 * the same sitting — but the file is one file, so the whole thing is published
 * in one commit. Switching department is not a save point; the Publish button
 * says what is still unpublished across all of them.
 */
export function FacultyEditor({
  content,
  options,
}: {
  content: FacultyContent;
  options: DepartmentOption[];
}) {
  const { state, setState, dirty, publishState, onPublish } = useEditorDoc<
    FacultyState,
    FacultyContent
  >({ file: "faculty.json", content, toState, toDocument });

  const present = React.useMemo(
    () => orderedKeys(state.departments.map((roster) => roster.department), options),
    [state.departments, options],
  );
  const [current, setCurrent] = React.useState(() => present[0] ?? "");

  const index = state.departments.findIndex((roster) => roster.department === current);
  const roster = index >= 0 ? state.departments[index] : undefined;

  const label = React.useCallback((key: string) => departmentName(key, options), [options]);
  const blockedReason = React.useMemo(() => firstProblem(state, label), [state, label]);

  const folders = React.useMemo(
    () => (roster ? uploadFolders(roster, options) : { photo: undefined, cv: undefined }),
    [roster, options],
  );

  return (
    <div className="space-y-6">
      <DepartmentSwitcher
        present={present}
        options={options}
        value={current}
        onChange={setCurrent}
        onAdd={(key) =>
          setState((now) => ({ departments: [...now.departments, withKey(newRoster(key))] }))
        }
        count={(key) => {
          const found = state.departments.find((entry) => entry.department === key);
          const size = found?.profiles.length ?? 0;
          return size === 1 ? "1 profile" : `${size} profiles`;
        }}
        addLabel="Add a department"
      />

      {roster ? (
        <EditorSection
          title={label(roster.department)}
          description="Shown in the order set here on the department's Faculty page. The Head of Department usually goes first."
        >
          <ListEditor<ProfileRow>
            items={roster.profiles}
            onChange={(profiles) =>
              setState((now) => ({
                departments: patchAt(now.departments, index, { profiles }),
              }))
            }
            make={newProfile}
            noun="profile"
            title={(profile) => profile.name}
            subtitle={(profile) => profile.designation || undefined}
            empty="No profiles in this department yet."
          >
            {(profile, set) => (
              <>
                <FieldRow>
                  <ImagePicker
                    value={profile.photo || undefined}
                    onChange={(photo) => set({ photo: photo ?? "" })}
                    label="Photo"
                    description="Leave empty and the card shows their initials instead."
                    uploadFolder={folders.photo}
                  />
                  <ImagePicker
                    kind="document"
                    value={profile.cv || undefined}
                    onChange={(cv) => set({ cv: cv ?? "" })}
                    label="Profile PDF"
                    description="Opens from the card. Leave empty and the card has no link."
                    uploadFolder={folders.cv}
                  />
                </FieldRow>
                <FieldRow>
                  <TextField
                    label="Name"
                    value={profile.name}
                    onChange={(name) => set({ name })}
                    placeholder="Dr. A. B. Patil"
                  />
                  <TextField
                    label="Designation"
                    value={profile.designation}
                    onChange={(designation) => set({ designation })}
                    placeholder="Assistant Professor"
                    hint="Printed under the name, exactly as typed."
                  />
                </FieldRow>
              </>
            )}
          </ListEditor>
        </EditorSection>
      ) : (
        <p className="text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
          Choose a department to edit its faculty.
        </p>
      )}

      <PublishBar
        state={publishState}
        dirty={dirty}
        onPublish={onPublish}
        blockedReason={blockedReason}
        viewUrl={roster ? departmentPage(roster.department) : undefined}
      />
    </div>
  );
}
