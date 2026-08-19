"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addableDepartments, departmentName, type DepartmentOption } from "@/lib/admin/departments";

/**
 * One department at a time, chosen from a list — the shape both
 * department-keyed files take.
 *
 * A select rather than tabs: 21 departments will not fit on a tab strip, and
 * an Editor arrives knowing which department they came to change. The whole
 * file is still published in one go, so switching department is not a save
 * point and nothing is lost by moving between them.
 */
export function DepartmentSwitcher({
  present,
  options,
  value,
  onChange,
  onAdd,
  count,
  addLabel,
}: {
  /** The keys this content file holds, in the order the screen shows them. */
  present: readonly string[];
  options: readonly DepartmentOption[];
  value: string;
  onChange: (key: string) => void;
  /** Adds a department the file has no record for yet. */
  onAdd: (key: string) => void;
  /** A short line beside each department, e.g. "21 profiles". */
  count?: (key: string) => string;
  addLabel: string;
}) {
  const [adding, setAdding] = React.useState(false);
  const addable = React.useMemo(
    () => addableDepartments(present, options),
    [present, options],
  );

  return (
    <div className="bg-card space-y-3 rounded-lg border p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-64 flex-1 space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger id="department" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {present.map((key) => (
                <SelectItem key={key} value={key}>
                  {departmentName(key, options)}
                  {count ? ` — ${count(key)}` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {addable.length > 0 && !adding ? (
          <Button type="button" variant="outline" onClick={() => setAdding(true)}>
            <Plus /> {addLabel}
          </Button>
        ) : null}
      </div>

      {adding ? (
        <div className="flex flex-wrap items-end gap-3 border-t pt-3">
          <div className="min-w-64 flex-1 space-y-2">
            <Label htmlFor="add-department">{addLabel}</Label>
            <Select
              onValueChange={(key) => {
                onAdd(key);
                onChange(key);
                setAdding(false);
              }}
            >
              <SelectTrigger id="add-department" className="w-full">
                <SelectValue placeholder="Choose a department…" />
              </SelectTrigger>
              <SelectContent>
                {addable.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="button" variant="ghost" onClick={() => setAdding(false)}>
            Cancel
          </Button>
        </div>
      ) : null}
    </div>
  );
}
