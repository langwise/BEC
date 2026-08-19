import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { parsePastedRows, splitLine } from "./paste-rows.ts";
import { newStudent, STUDENT_COLUMNS, type StudentRow } from "./placements-doc.ts";

const parse = (text: string) => parsePastedRows<StudentRow>(text, STUDENT_COLUMNS, newStudent);

describe("splitLine", () => {
  test("splits on the delimiter", () => {
    assert.deepEqual(splitLine("a\tb\tc", "\t"), ["a", "b", "c"]);
  });

  test("a quoted cell keeps the delimiter inside it", () => {
    assert.deepEqual(splitLine('Tata,"Consultancy, Ltd",7', ","), [
      "Tata",
      "Consultancy, Ltd",
      "7",
    ]);
  });

  test('"" inside a quoted cell is one quote', () => {
    assert.deepEqual(splitLine('"He said ""hi"""', ","), ['He said "hi"']);
  });

  test("surrounding space is trimmed off every cell", () => {
    assert.deepEqual(splitLine(" a , b ", ","), ["a", "b"]);
  });

  test("an empty cell stays an empty cell rather than shifting the row", () => {
    assert.deepEqual(splitLine("a,,c", ","), ["a", "", "c"]);
  });
});

describe("parsePastedRows", () => {
  test("a block copied out of a spreadsheet becomes rows", () => {
    const { rows } = parse(
      "Aishwarya S\t2BA20CS003\tOn-Campus\tTCS Digital\t7.00\nBasavaraj K\t2BA20CS011\tOff-Campus\tInfosys\t4.50",
    );
    assert.equal(rows.length, 2);
    assert.deepEqual(rows[0], {
      name: "Aishwarya S",
      usn: "2BA20CS003",
      mode: "On-Campus",
      company: "TCS Digital",
      lpa: "7.00",
    });
  });

  test("the sheet's own header row is recognised and dropped", () => {
    const result = parse("Student\tUSN\tMode\tCompany\tLPA\nA\t1\tOn-Campus\tTCS\t7");
    assert.equal(result.skippedHeader, true);
    assert.equal(result.rows.length, 1);
    assert.equal(result.rows[0].name, "A");
  });

  test("a header whose columns were renamed a little is still recognised", () => {
    const result = parse("Name\tUSN\tMode\tCompany\tPackage\nA\t1\tOn-Campus\tTCS\t7");
    assert.equal(result.skippedHeader, true);
  });

  test("a first row of real data is not mistaken for a header", () => {
    const result = parse("Aishwarya S\t2BA20CS003\tOn-Campus\tTCS Digital\t7.00");
    assert.equal(result.skippedHeader, false);
    assert.equal(result.rows.length, 1);
  });

  test("commas are used when the paste has no tabs", () => {
    const { rows } = parse("A,1,On-Campus,TCS,7");
    assert.equal(rows[0].company, "TCS");
  });

  test("a short row leaves the rest of the columns empty", () => {
    const { rows } = parse("A\t1");
    assert.deepEqual(rows[0], { name: "A", usn: "1", mode: "", company: "", lpa: "" });
  });

  test("cells past the last column are counted, not silently dropped", () => {
    const result = parse("A\t1\tOn-Campus\tTCS\t7\textra\tmore");
    assert.equal(result.droppedCells, 2);
    assert.equal(result.rows[0].lpa, "7");
  });

  test("blank lines between rows are ignored", () => {
    assert.equal(parse("A\t1\n\n\nB\t2\n").rows.length, 2);
  });

  test("nothing pasted is no rows, not one empty row", () => {
    assert.deepEqual(parse("   \n  ").rows, []);
  });

  test("Windows line endings are handled", () => {
    assert.equal(parse("A\t1\r\nB\t2").rows.length, 2);
  });
});
