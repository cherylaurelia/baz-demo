# baz review --local --base: unofficial demo

Unofficial demo by Cheryl Aurelia: not affiliated with Baz.

## The problem
On a feature branch, `baz review --local` always diffs against the default branch. On a stacked branch
that pulls in the parent's commits. [baz-cli #126](https://github.com/baz-scm/baz-cli/issues/126) reports
385 files reviewed for a 47-file change, with no flag to correct it.

## The fix
`baz review --local --base <branch>` reviews only the commits since that branch.
[See the change](https://github.com/baz-scm/baz-cli/compare/main...cherylaurelia:baz-cli:fix/local-review-base).

## What this page shows
Output from the built CLI on a test repo (main → integration → feature): 9 files and 4001 inserted lines
without `--base`, 1 file and 1 line with it. The file lists come from the diff in the CLI's chat request,
captured with a local stub in place of baz.co. It was not run against the live Baz backend.

## Run it
```bash
npm install
npm run dev
```
