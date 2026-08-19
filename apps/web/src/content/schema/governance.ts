import { z } from "zod";
import { assetKey } from "./shared.ts";

const link = z.strictObject({ href: z.string(), label: z.string() });

/** A leadership card (dean/officer) — mirrors the loader's `Person` input shape. */
const person = z.strictObject({
  name: z.string().optional(),
  role: z.string(),
  photo: assetKey().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  focus: z.string().optional(),
  link: link.optional(),
  roleBadges: z
    .array(z.strictObject({ label: z.string(), link: link.optional() }))
    .optional()
    .describe("Multiple role badges, each optionally linking to its own page."),
  placeholder: z.boolean().optional(),
  verify: z.boolean().optional(),
});

export const bogCategorySchema = z.enum([
  "chair",
  "sangha",
  "nominee",
  "industry",
  "academia",
  "faculty",
  "invitee",
  "government",
  "member-secretary",
  "students",
]);

/** Schema for content/governance.json — leadership, HoDs, B.V.V. Sangha and the BoG. */
export const governanceContentSchema = z.strictObject({
  $schema: z.string().optional(),
  principal: z
    .strictObject({
      name: z.string(),
      role: z.string(),
      photo: assetKey(),
      email: z.string().optional(),
    })
    .describe("The Principal / Member Secretary shown in the leadership banner."),
  deans: z.array(person).describe("Deans rendered in the #deans section."),
  officers: z.array(person).describe("Other statutory officers (CoE, Librarian…)."),
  hods: z
    .array(
      z.strictObject({
        department: z.string(),
        name: z.string().optional(),
        title: z.string().optional(),
        photo: assetKey().optional(),
        email: z.string().optional(),
        placeholder: z.boolean().optional(),
      }),
    )
    .describe("Heads of Department, in display order."),
  sangha: z
    .strictObject({
      intro: z.string().optional(),
      groupPhoto: assetKey(),
      chairman: z.strictObject({
        name: z.string(),
        role: z.string(),
        photo: assetKey(),
        messageHref: z.string().optional(),
      }),
      secretary: z.strictObject({
        name: z.string(),
        role: z.string(),
        photo: assetKey().optional(),
      }),
      members: z.array(
        z.strictObject({
          name: z.string(),
          role: z.string(),
          photo: assetKey().optional(),
        }),
      ),
      council: z.array(
        z.strictObject({
          name: z.string(),
          role: z.string(),
          invitee: z.boolean().optional(),
        }),
      ),
    })
    .describe("The B.V.V. Sangha parent-trust block."),
  bog: z
    .array(
      z.strictObject({
        name: z.string(),
        role: z.string(),
        affiliation: z.string(),
        category: bogCategorySchema,
        photo: assetKey().optional(),
      }),
    )
    .describe("Board of Governors members, grouped by category on the page."),
});

export type GovernanceContent = z.infer<typeof governanceContentSchema>;
