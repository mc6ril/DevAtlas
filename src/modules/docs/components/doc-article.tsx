import Link from "next/link";
import {
  type DocPage,
  getNeighborDocs,
  getRelatedDocs,
  getSectionOwner,
  getSectionTitle,
} from "@/modules/docs/data/docs";
import {
  Checklist,
  CodeExampleBlock,
  DocListSection,
  DocTextSection,
} from "@/modules/docs/components/doc-content-sections";
import { formatDate } from "@/modules/docs/lib/format-date";

type DocArticleProps = {
  doc: DocPage;
};

export const DocArticle = ({ doc }: DocArticleProps) => {
  const relatedDocs = getRelatedDocs(doc);
  const neighbors = getNeighborDocs(doc.slug);

  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-200 px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] text-teal-800">
            {getSectionTitle(doc.section)}
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700">
            Owner: {doc.owner || getSectionOwner(doc.section)}
          </span>
          <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-800">
            Updated {formatDate(doc.lastUpdated)}
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {doc.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {doc.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="space-y-10 px-5 py-8 sm:px-8">
        <DocTextSection title="Purpose" body={doc.purpose} />
        <DocTextSection title="Rule" body={doc.rule} highlighted />
        <DocListSection title="When to use it" items={doc.whenToUse} tone="teal" />
        <DocListSection
          title="When not to use it"
          items={doc.whenNotToUse}
          tone="rose"
        />
        <CodeExampleBlock title="Recommended example" example={doc.recommended} />
        <CodeExampleBlock title="Avoid" example={doc.avoid} tone="dark" />
        <DocTextSection title="Why" body={doc.why} />
        <Checklist items={doc.checklist} />

        {relatedDocs.length > 0 ? (
          <section aria-labelledby="related-pages">
            <h2 id="related-pages" className="text-2xl font-black text-slate-950">
              Related pages
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedDocs.map((relatedDoc) => (
                <Link
                  key={relatedDoc.slug}
                  href={`/docs/${relatedDoc.slug}`}
                  className="rounded-md border border-slate-200 p-4 transition hover:border-teal-300 hover:bg-teal-50"
                >
                  <p className="text-sm font-black text-slate-950">
                    {relatedDoc.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {relatedDoc.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <nav
          aria-label="Neighbor pages"
          className="grid gap-3 border-t border-slate-200 pt-8 sm:grid-cols-2"
        >
          {neighbors.previous ? (
            <Link
              href={`/docs/${neighbors.previous.slug}`}
              className="rounded-md border border-slate-200 p-4 transition hover:border-slate-400 hover:bg-slate-50"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                Previous
              </p>
              <p className="mt-2 text-sm font-black text-slate-950">
                {neighbors.previous.title}
              </p>
            </Link>
          ) : (
            <span />
          )}

          {neighbors.next ? (
            <Link
              href={`/docs/${neighbors.next.slug}`}
              className="rounded-md border border-slate-200 p-4 text-right transition hover:border-slate-400 hover:bg-slate-50"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                Next
              </p>
              <p className="mt-2 text-sm font-black text-slate-950">
                {neighbors.next.title}
              </p>
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
};
