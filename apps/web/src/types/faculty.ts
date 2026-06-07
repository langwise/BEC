// ==============================
// Faculty member (simplified)
// ==============================
// The website no longer stores per-faculty details (publications, education,
// etc.). Each member is just an identity + a link to their full profile/CV PDF
// hosted on R2. The card shows the photo, name and designation; clicking opens
// the PDF in a modal viewer.
export interface FacultyMember {
  name: string;
  designation: string;
  /** Public R2 URL of the portrait (resolved from an asset key). */
  photoUrl?: string;
  /** Public R2 URL of the full profile / CV PDF (resolved from an asset key). */
  cvUrl?: string;
}
