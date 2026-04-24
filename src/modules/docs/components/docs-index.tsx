import Link from "next/link";
import {
  type DocPage,
  docSections,
  getDocBySlug,
  getDocsBySection,
  popularSlugs,
} from "@/modules/docs/data/docs";
import { DocSummaryLink } from "@/modules/docs/components/doc-summary-link";

export const DocsIndex = () => {
  const popularDocs = popularSlugs
    .map((slug) => getDocBySlug(slug))
    .filter((doc): doc is DocPage => Boolean(doc));

  return (
    <div className="space-y-10">
      <header className="border-b border-slate-200 pb-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
          Documentation
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Standards that are easy to find, apply, review, and update.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          This is the operating manual for React and React Native delivery. It
          connects architecture, examples, checklists, and decision records so
          code looks like the rest of the company codebase.
        </p>
      </header>

      <section aria-labelledby="popular-docs">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-amber-700">
              Start here
            </p>
            <h2
              id="popular-docs"
              className="mt-2 text-2xl font-black text-slate-950"
            >
              Popular guides
            </h2>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {popularDocs.map((doc) => (
            <DocSummaryLink key={doc.slug} doc={doc} />
          ))}
        </div>
      </section>

      <section aria-labelledby="sections">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-rose-700">
          Information architecture
        </p>
        <h2 id="sections" className="mt-2 text-2xl font-black text-slate-950">
          Standards by section
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {docSections.map((section) => {
            const sectionDocs = getDocsBySection(section.id);

            if (sectionDocs.length === 0) {
              return null;
            }

            return (
              <section
                key={section.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-950">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {section.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700">
                    {sectionDocs.length}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {sectionDocs.map((doc) => (
                    <Link
                      key={doc.slug}
                      href={`/docs/${doc.slug}`}
                      className="block rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900"
                    >
                      {doc.title}
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
};
