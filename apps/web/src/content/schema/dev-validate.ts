import homeData from "@content/home.json";
import governanceData from "@content/governance.json";
import newsData from "@content/news.json";
import placementsData from "@content/placements.json";
import { governanceContentSchema } from "./governance";
import { homeContentSchema } from "./home";
import { newsContentSchema } from "./news";
import { placementsContentSchema } from "./placements";
import { parseContent } from "./shared";

// Server-only, dev-only re-validation of the content files whose loaders cast
// instead of parsing (they reach client chunks, where Zod must not ship).
// faculty.json and departments.json stay covered by their loaders' own parse;
// production is covered by the validate-content build gate.
if (process.env.NODE_ENV !== "production") {
  parseContent("home.json", homeContentSchema, homeData);
  parseContent("governance.json", governanceContentSchema, governanceData);
  parseContent("news.json", newsContentSchema, newsData);
  parseContent("placements.json", placementsContentSchema, placementsData);
}
