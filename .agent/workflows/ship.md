---
description: Automatically verify, commit, and push project changes to the GitHub main repository.
---

# Ship / Auto-Push Workflow

Run this workflow whenever work on a task, feature, or improvement is complete and should be deployed/pushed to GitHub.

## Workflow Steps

1. **Check Status**: Inspect all modified, added, and deleted files using `git status`.
2. **Pre-flight Build Verification**: Run `npm run build` to ensure no compile, TypeScript, or Next.js errors exist.
3. **Stage All Changes**: Execute `git add -A`.
4. **Create Commit**: Commit changes with a descriptive conventional commit message describing the feature or fixes completed.
5. **Sync with Remote**: Execute `git pull --rebase origin main` to incorporate any upstream changes safely.
6. **Push to Remote**: Run `git push origin main`.
7. **Notify User**: Report the pushed commit SHA and updated branch status.
