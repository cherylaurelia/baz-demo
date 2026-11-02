const FORK_DIFF = "https://github.com/baz-scm/baz-cli/pull/130";
const ISSUE = "https://github.com/baz-scm/baz-cli/issues/126";
const REPO = "https://github.com/cherylaurelia/baz-demo";

const intFiles = Array.from({ length: 8 }, (_, i) => `int${i}.txt`);

function Terminal({
  label,
  command,
  files,
  summary,
  tone,
}: {
  label: string;
  command: string;
  files: string[];
  summary: string;
  tone: "before" | "after";
}) {
  return (
    <figure className="min-w-0 rounded-xl bg-ink shadow-lg">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-xs text-soft">
        <span>{label}</span>
        <span className={tone === "after" ? "text-[#7ee2a0]" : "text-[#ff9b94]"}>{summary}</span>
      </figcaption>
      <div className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-paper" tabIndex={0}>
        <p className="whitespace-nowrap">
          <span className="text-soft">$ </span>
          {command}
        </p>
        <p className="mt-3 text-soft">files in the review request:</p>
        <ul>
          {files.map((file) => (
            <li key={file} className={file === "mine.txt" ? "text-[#7ee2a0]" : undefined}>
              {file}
              {file === "mine.txt" ? "  (the actual change)" : ""}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">baz-cli · issue #126</p>
      <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
        On a stacked branch, <code className="font-mono text-[0.72em]">baz review --local</code> also
        reviews the parent branch&rsquo;s commits.
      </h1>
      <p className="mt-5 text-lg text-[#2f3449]">
        <code className="font-mono text-base">--base &lt;branch&gt;</code> reviews only the commits since
        the branch you cut from.
      </p>
      <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium">
        <a className="rounded-lg bg-ink px-5 py-3 text-paper hover:bg-panel" href={FORK_DIFF}>
          See the change
        </a>
        <a className="rounded-lg border border-[#c9cddd] bg-white px-5 py-3 hover:border-ink" href={REPO}>
          Demo repo
        </a>
      </div>

      <section className="mt-12 border-y border-[#dfe2ec] py-7" aria-labelledby="reported">
        <h2 id="reported" className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Reported in #126
        </h2>
        <p className="mt-3 font-serif text-3xl sm:text-4xl">385 files reviewed for a 47-file change</p>
        <p className="mt-2 text-[#2f3449]">
          From{" "}
          <a className="text-accent underline" href={ISSUE}>
            the user who filed the issue
          </a>
          , on a branch cut from another branch. There&rsquo;s no flag to correct it today.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="result">
        <h2 id="result" className="font-serif text-2xl">
          The fix, on a small test repo
        </h2>
        <p className="mt-2 text-[#2f3449]">
          This repo (main → integration → feature) only proves the mechanism. The file lists are decoded
          from the diff the built CLI sent, captured with a local stub in place of baz.co.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Terminal
            label="today"
            command="baz review --local"
            files={[...intFiles, "mine.txt"]}
            summary="9 files, +4001"
            tone="before"
          />
          <Terminal
            label="with the fix"
            command="baz review --local --base integration"
            files={["mine.txt"]}
            summary="1 file, +1"
            tone="after"
          />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="tested">
        <h2 id="tested" className="font-serif text-2xl">
          Tested, and not tested
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[#2f3449]">
          <li>117 tests pass, 17 of them new, using real git repos</li>
          <li>Stale and diverged base branches are handled and tested</li>
          <li>Not run against the live Baz backend</li>
          <li>Not run on the repo from #126</li>
        </ul>
      </section>

      <footer className="mt-16 border-t border-[#dfe2ec] pt-5 text-sm text-muted">
        Unofficial demo by Cheryl Aurelia: not affiliated with Baz.
      </footer>
    </main>
  );
}
