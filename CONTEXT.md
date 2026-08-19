# BEC Website

The public website for Basaveshwar Engineering College (becbgk.edu): a statically-rendered Next.js site whose editable copy lives in JSON content files, with images/PDFs on Cloudflare R2. An Admin area lets non-technical staff edit that content.

## Language

**Content file**:
A JSON document under `apps/web/content/` that is the source of truth for a slice of the site's copy. Pages never hardcode text that has a content file.
_Avoid_: config, data file

**Content layer**:
The set of content files plus their typed loaders in `src/content/*.ts`. Copy not yet in the content layer is "hardcoded" and not editable from the Admin.

**Admin**:
The password-protected `/admin` area inside the public site app where Editors change content files. Not indexed, not linked from the public site.
_Avoid_: CMS, dashboard

**Editor**:
A staff member using the Admin. Editors are non-technical; they never see raw JSON, asset keys, or git concepts.
_Avoid_: admin user, author

**Publish**:
What Save does: the edited content file is committed to `main`, Vercel rebuilds, and the change is live roughly two minutes later. There is no draft state and no review gate; the git history is the audit trail and the undo mechanism.
_Avoid_: deploy, sync, push

**Asset key**:
The path-like identifier of a file in the R2 bucket (e.g. `institute/campus/campus-front.webp`). Content files reference images by asset key; `asset()` resolves a key to its public URL. Keys are immutable: the bytes at a key never change — replacing an image means a new key and an updated reference, never an overwrite.
_Avoid_: image path, URL (a key is not a URL)

**Gallery folder**:
An R2 key prefix (e.g. `cells/iic/gallery/`) whose contents are shown as a photo gallery, ordered alphabetically by key. Membership is "whatever is under the prefix in the manifest" — there is no explicit list, so no custom ordering or captions.
_Avoid_: album (the public gallery page's "albums" are views over gallery folders)

**News item**:
An entry in the News stream (`/news` and the home section): an achievement or event report with a date, a title, and optionally an Attachment or external link. Distinct from an Announcement.

**Announcement**:
An entry in the Announcements stream (`/announcements`): an administrative notice with the same shape as a News item but a different audience and page. The two streams are edited separately and never merged.
_Avoid_: notice (use Announcement)

**Attachment**:
A PDF on R2 that a News item or Announcement links to, uploaded through the Admin under `documents/`. Follows the same immutable-key rule as images. An item with no Attachment and no external link renders as plain text.
_Avoid_: document link, href

**Orphan asset**:
An R2 object no content file or gallery folder references anymore — typically the old key left behind by an image replacement. Orphans are found and deleted from the Admin's cleanup screen to stay under the R2 free tier.
_Avoid_: unused image, garbage
