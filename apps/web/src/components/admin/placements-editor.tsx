"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { DepartmentSwitcher } from "@/components/admin/department-switcher";
import { EditorSection, FieldRow, TextField } from "@/components/admin/fields";
import { PublishBar } from "@/components/admin/publish-bar";
import { RowCard } from "@/components/admin/row-card";
import { TableEditor, type Column } from "@/components/admin/table-editor";
import { Button } from "@/components/ui/button";
import type { PlacementsContent } from "@/content/schema/placements";
import { departmentName, orderedKeys, type DepartmentOption } from "@/lib/admin/departments";
import {
  COMPANY_COLUMNS,
  firstProblem,
  newBatch,
  newChart,
  newCompany,
  newDepartment,
  newPoint,
  newStudent,
  newYear,
  POINT_COLUMNS,
  STUDENT_COLUMNS,
  toDocument,
  toState,
  YEAR_COLUMNS,
  type BatchRow,
  type CompanyRow,
  type DepartmentRow,
  type PlacementsState,
  type PointRow,
  type StudentRow,
  type YearRow,
} from "@/lib/admin/placements-doc";
import { move, patchAt, removeAt, withKey, type Keyed } from "@/lib/admin/rows";
import { useEditorDoc } from "@/lib/admin/use-editor-doc";

/**
 * Placement records, one department at a time.
 *
 * Three sections, and a department publishes only the ones it has figures
 * for: the year-wise summary every department keeps, an optional bar chart,
 * and optional per-batch recruiter and student lists. "Optional" is real here
 * — a department with no chart has no `offersChart` key in the file, and this
 * screen has to leave it that way rather than write an empty one.
 */

const YEAR_TABLE = YEAR_COLUMNS.map((column) => ({
  ...column,
  width: column.field === "year" ? "w-32" : undefined,
})) as Column<YearRow>[];
const POINT_TABLE = POINT_COLUMNS as Column<PointRow>[];
const COMPANY_TABLE = COMPANY_COLUMNS as Column<CompanyRow>[];
const STUDENT_TABLE = STUDENT_COLUMNS as Column<StudentRow>[];

export function PlacementsEditor({
  content,
  options,
}: {
  content: PlacementsContent;
  options: DepartmentOption[];
}) {
  const { state, setState, dirty, publishState, onPublish } = useEditorDoc<
    PlacementsState,
    PlacementsContent
  >({ file: "placements.json", content, toState, toDocument });

  const present = React.useMemo(
    () => orderedKeys(state.departments.map((row) => row.department), options),
    [state.departments, options],
  );
  const [current, setCurrent] = React.useState(() => present[0] ?? "");

  const index = state.departments.findIndex((row) => row.department === current);
  const department = index >= 0 ? state.departments[index] : undefined;

  const label = React.useCallback((key: string) => departmentName(key, options), [options]);
  const blockedReason = React.useMemo(() => firstProblem(state, label), [state, label]);

  const patch = React.useCallback(
    (values: Partial<DepartmentRow>) =>
      setState((now) => ({ departments: patchAt(now.departments, index, values) })),
    [setState, index],
  );

  return (
    <div className="space-y-6">
      <DepartmentSwitcher
        present={present}
        options={options}
        value={current}
        onChange={setCurrent}
        onAdd={(key) =>
          setState((now) => ({ departments: [...now.departments, withKey(newDepartment(key))] }))
        }
        count={(key) => {
          const found = state.departments.find((row) => row.department === key);
          const years = found?.yearWise.length ?? 0;
          return years === 1 ? "1 year" : `${years} years`;
        }}
        addLabel="Add a department"
      />

      {department ? (
        <div className="space-y-12">
          <EditorSection
            title="Year-wise summary"
            description="The table printed at the top of the department's Placements section. Columns you leave empty are not shown on the site, so a department only fills in the figures it publishes."
          >
            <TableEditor<YearRow>
              items={department.yearWise}
              onChange={(yearWise) => patch({ yearWise })}
              columns={YEAR_TABLE}
              make={newYear}
              noun="year"
              reorderable
              pasteHint="One row per academic year."
            />
          </EditorSection>

          <EditorSection
            title="Placement chart"
            description="The bar chart above the tables. These figures are plotted, so each one has to be a number."
          >
            {department.chart ? (
              <div className="space-y-4">
                <FieldRow>
                  <TextField
                    label="Chart title"
                    value={department.chart.title}
                    onChange={(title) =>
                      patch({ chart: { ...department.chart!, title } })
                    }
                    placeholder="No. of Placement Offers"
                  />
                  <TextField
                    label="Label down the side"
                    value={department.chart.yAxisLabel}
                    onChange={(yAxisLabel) =>
                      patch({ chart: { ...department.chart!, yAxisLabel } })
                    }
                    placeholder="No. of Placement Offers"
                  />
                </FieldRow>

                <TableEditor<PointRow>
                  items={department.chart.points}
                  onChange={(points) => patch({ chart: { ...department.chart!, points } })}
                  columns={POINT_TABLE}
                  make={newPoint}
                  noun="bar"
                  reorderable
                  pasteHint="One row per year, left to right."
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => patch({ chart: null })}
                >
                  Remove the chart from this department
                </Button>
              </div>
            ) : (
              <EmptySection
                what="This department publishes no chart."
                action="Add a chart"
                onAdd={() => patch({ chart: newChart() })}
              />
            )}
          </EditorSection>

          <EditorSection
            title="Batches"
            description="Recruiters and, where the department publishes them, the students placed. Each batch becomes its own table on the page."
          >
            {department.batches ? (
              <BatchList
                batches={department.batches}
                onChange={(batches) => patch({ batches })}
              />
            ) : (
              <EmptySection
                what="This department publishes no batch tables."
                action="Add batch tables"
                onAdd={() => patch({ batches: [] })}
              />
            )}
          </EditorSection>
        </div>
      ) : (
        <p className="text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
          Choose a department to edit its placement records.
        </p>
      )}

      <PublishBar
        state={publishState}
        dirty={dirty}
        onPublish={onPublish}
        blockedReason={blockedReason}
        viewUrl="/placements"
      />
    </div>
  );
}

/**
 * Batches are cards, not a table: each one *contains* two tables. The nesting
 * is why they collapse — three batches of 130 students each would otherwise be
 * a screen nobody reaches the bottom of.
 */
function BatchList({
  batches,
  onChange,
}: {
  batches: Keyed<BatchRow>[];
  onChange: (next: Keyed<BatchRow>[]) => void;
}) {
  const [open, setOpen] = React.useState<Set<string>>(() => new Set());

  const patch = (index: number, values: Partial<BatchRow>) =>
    onChange(patchAt(batches, index, values));

  const add = () => {
    const row = withKey(newBatch());
    // Newest batch at the top: the one just added is the one being worked on,
    // and it is also the one the page shows first.
    onChange([row, ...batches]);
    setOpen((now) => new Set(now).add(row.key));
  };

  return (
    <div className="space-y-3">
      {batches.length === 0 ? (
        <p className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
          No batches yet.
        </p>
      ) : (
        <ol className="space-y-3">
          {batches.map((batch, index) => (
            <li key={batch.key}>
              <RowCard
                index={index}
                total={batches.length}
                title={batch.batch}
                subtitle={`${batch.companies.length} recruiters · ${batch.students.length} student offers`}
                onMove={(to) => onChange(move(batches, index, to))}
                onDelete={() => onChange(removeAt(batches, index))}
                deleteLabel={batch.batch}
                collapsed={!open.has(batch.key)}
                onToggle={() =>
                  setOpen((now) => {
                    const next = new Set(now);
                    if (next.has(batch.key)) next.delete(batch.key);
                    else next.add(batch.key);
                    return next;
                  })
                }
              >
                <TextField
                  label="Batch"
                  value={batch.batch}
                  onChange={(value) => patch(index, { batch: value })}
                  placeholder="2023-2024"
                  hint="Printed in each table's heading, exactly as typed."
                />

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Recruiters &amp; packages</h4>
                  <TableEditor<CompanyRow>
                    items={batch.companies}
                    onChange={(companies) => patch(index, { companies })}
                    columns={COMPANY_TABLE}
                    make={newCompany}
                    noun="recruiter"
                    pasteHint="One row per company."
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Students placed</h4>
                  <p className="text-muted-foreground text-xs">
                    One row per offer — a student with two offers appears twice, which is how
                    the offer count on the page adds up.
                  </p>
                  <TableEditor<StudentRow>
                    items={batch.students}
                    onChange={(students) => patch(index, { students })}
                    columns={STUDENT_TABLE}
                    make={newStudent}
                    noun="student"
                    pasteHint="Straight from the placement office's sheet."
                  />
                </div>
              </RowCard>
            </li>
          ))}
        </ol>
      )}

      <Button type="button" variant="outline" size="sm" onClick={add}>
        <Plus /> Add a batch
      </Button>
    </div>
  );
}

/** A section this department does not publish, and the way to turn it on. */
function EmptySection({
  what,
  action,
  onAdd,
}: {
  what: string;
  action: string;
  onAdd: () => void;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-dashed p-6 text-center">
      <p className="text-muted-foreground text-sm">{what}</p>
      <Button type="button" variant="outline" size="sm" onClick={onAdd}>
        <Plus /> {action}
      </Button>
    </div>
  );
}
