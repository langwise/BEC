# Asset keys are immutable — replace means new key, never overwrite

Uploading through the Admin always mints a fresh R2 key (slugged name + short random suffix); replacing an image updates the content file's reference to the new key in the same Publish. Bytes at an existing key are never overwritten, because R2's public URLs and browsers cache aggressively — an in-place overwrite would show the old image for an unpredictable time, which non-technical Editors would experience as "my change didn't work".

## Consequences

- Every replacement strands the old key as an orphan asset; the Admin's cleanup screen finds and deletes unreferenced keys to stay under the R2 10GB free tier.
- Gallery folders get new photos as additional keys under the prefix; each upload also commits the regenerated asset manifest, since prefix galleries resolve from the build-time manifest, not live R2.
