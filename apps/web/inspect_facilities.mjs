import mammoth from "mammoth";
import fs from "fs";
import path from "path";

const dirPath = "D:\\BEC-Website\\Corrections-17.07.26\\CVE\\02. New Website data 15-07-2026-20260716T123736Z-1-001\\12. Facilities\\02.  Lab & Research Details";
const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".docx"));

async function readAll() {
  for (const f of files) {
    console.log("==================================================");
    console.log("FILE:", f);
    console.log("==================================================");
    const fullPath = path.join(dirPath, f);
    const res = await mammoth.extractRawText({ path: fullPath });
    console.log(res.value);
  }
}

readAll();
