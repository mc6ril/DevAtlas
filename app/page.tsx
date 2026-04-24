import Link from "next/link";
import { SiteHeader } from "@/app/_components/site-header";
import {
  docs,
  getDocBySlug,
  getSectionTitle,
  intentEntrypoints,
  popularSlugs,
  roleEntrypoints,
} from "@/app/_data/docs";

const latestDocs = [...docs]
  .sort((left, right) => right.lastUpdated.localeCompare(left.lastUpdated))
  .slice(0, 4);

const popularDocs = popularSlugs
  .map((slug) => getDocBySlug(slug))
  .filter((doc): doc is NonNullable<ReturnType<typeof getDocBySlug>> =>
    Boolean(doc),
  );

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_460px] lg:px-8">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
                Internal developer standards
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                Build consistent React and React Native code across the team.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Dev Atlas helps developers find the right pattern, copy a good
                example, pass review criteria, and keep standards current as the
                codebase evolves.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/docs/feature-development/create-a-feature"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Start with the feature guide
                </Link>
                <Link
                  href="/docs/pr-guide/pull-request-checklist"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-black text-slate-950 transition hover:border-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Open the PR checklist
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-5 shadow-xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0f766e,#f59e0b,#be123c)]" />
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-300">
                    Operating manual
                  </p>
                  <p className="mt-1 text-lg font-black text-white">
                    Feature review path
                  </p>
                </div>
                <span className="rounded-md bg-teal-400 px-2.5 py-1 text-xs font-black text-slate-950">
                  MVP
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["1", "Find the folder", "Architecture and project structure"],
                  ["2", "Build the feature", "Screen, hook, API, mapper, tests"],
                  ["3", "Check the review", "PR and reviewer criteria"],
                ].map(([step, title, description]) => (
                  <div
                    key={step}
                    className="grid grid-cols-[2.25rem_1fr] gap-3 rounded-md border border-slate-800 bg-slate-900 p-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-sm font-black text-slate-950">
                      {step}
                    </span>
                    <span>
                      <span className="block text-sm font-black text-white">
                        {title}
                      </span>
                      <span className="block text-sm leading-6 text-slate-400">
                        {description}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <pre className="mt-5 overflow-x-auto rounded-md border border-slate-800 bg-black p-4 text-sm leading-7 text-slate-100">
                <code>{`modules/profile/
  screens/ProfileScreen.tsx
  ui/ProfileView.tsx
  hooks/useProfileScreen.ts
  api/profile-api.ts
  __tests__/profile-screen.test.tsx`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {roleEntrypoints.map((entrypoint) => (
              <Link
                key={entrypoint.title}
                href={entrypoint.href}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
              >
                <h2 className="text-lg font-black text-slate-950">
                  {entrypoint.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {entrypoint.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-rose-700">
                I want to
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Jump straight to the job.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Shortcuts are organized around the questions developers and
                reviewers ask during real work.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {intentEntrypoints.map((entrypoint) => (
                <Link
                  key={entrypoint.label}
                  href={entrypoint.href}
                  className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900"
                >
                  {entrypoint.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-amber-700">
              Popular pages
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              The standards most likely to unblock a PR.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {popularDocs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    {getSectionTitle(doc.section)}
                  </p>
                  <h3 className="mt-3 text-lg font-black text-slate-950">
                    {doc.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {doc.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-teal-700">
              Recently updated
            </p>
            <div className="mt-5 space-y-4">
              {latestDocs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="block rounded-md border border-slate-200 p-4 transition hover:border-teal-300 hover:bg-teal-50"
                >
                  <p className="text-sm font-black text-slate-950">{doc.title}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {formatDate(doc.lastUpdated)} by {doc.owner}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
            {[
              {
                title: "No new standard without documentation",
                body: "Architecture changes, recurring review comments, and new patterns must update the guide.",
              },
              {
                title: "Owners keep sections current",
                body: "Architecture, mobile, testing, design system, and PR guidance each have accountable owners.",
              },
              {
                title: "Measure adoption",
                body: "Track visits, searches, repeated review comments, stale pages, and doc contributions.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h2 className="text-lg font-black text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
