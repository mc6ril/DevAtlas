import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/app/_components/copy-button";
import { SiteHeader } from "@/app/_components/site-header";
import {
  type CodeExample,
  type DocPage,
  docs,
  docSections,
  getDocBySlug,
  getDocsBySection,
  getNeighborDocs,
  getRelatedDocs,
  getSectionOwner,
  getSectionTitle,
  popularSlugs,
} from "@/app/_data/docs";

type DocsPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export function generateStaticParams() {
  return [
    { slug: [] },
    ...docs.map((doc) => ({
      slug: doc.slug.split("/"),
    })),
  ];
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const activeSlug = slug.join("/");

  if (!activeSlug) {
    return {
      title: "Documentation",
      description:
        "Company React and React Native coding standards, recipes, and review criteria.",
    };
  }

  const doc = getDocBySlug(activeSlug);

  if (!doc) {
    return {
      title: "Standard not found",
    };
  }

  return {
    title: doc.title,
    description: doc.summary,
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug = [] } = await params;
  const activeSlug = slug.join("/");

  if (!activeSlug) {
    return (
      <DocsChrome>
        <DocsIndex />
      </DocsChrome>
    );
  }

  const doc = getDocBySlug(activeSlug);

  if (!doc) {
    notFound();
  }

  return (
    <DocsChrome activeSlug={doc.slug}>
      <DocArticle doc={doc} />
    </DocsChrome>
  );
}

function DocsChrome({
  activeSlug,
  children,
}: {
  activeSlug?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SiteHeader />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <DocsSidebar activeSlug={activeSlug} />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

function DocsSidebar({ activeSlug }: { activeSlug?: string }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <details className="mb-5 rounded-md border border-slate-200 bg-white p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-black text-slate-950">
          Browse standards
        </summary>
        <div className="mt-4">
          <SidebarNav activeSlug={activeSlug} />
        </div>
      </details>

      <div className="hidden lg:block">
        <SidebarNav activeSlug={activeSlug} />
      </div>
    </aside>
  );
}

function SidebarNav({ activeSlug }: { activeSlug?: string }) {
  return (
    <nav aria-label="Documentation navigation" className="space-y-6">
      <Link
        href="/docs"
        className={`block rounded-md px-3 py-2 text-sm font-black transition ${
          activeSlug
            ? "text-slate-600 hover:bg-white hover:text-slate-950"
            : "bg-slate-950 text-white"
        }`}
      >
        All standards
      </Link>

      {docSections.map((section) => {
        const sectionDocs = getDocsBySection(section.id);

        if (sectionDocs.length === 0) {
          return null;
        }

        return (
          <section key={section.id} aria-labelledby={`${section.id}-nav`}>
            <h2
              id={`${section.id}-nav`}
              className="px-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500"
            >
              {section.title}
            </h2>
            <div className="mt-2 space-y-1">
              {sectionDocs.map((doc) => {
                const isActive = activeSlug === doc.slug;

                return (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className={`block rounded-md px-3 py-2 text-sm font-semibold leading-5 transition ${
                      isActive
                        ? "bg-teal-50 text-teal-900 ring-1 ring-teal-200"
                        : "text-slate-600 hover:bg-white hover:text-slate-950"
                    }`}
                  >
                    {doc.title}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </nav>
  );
}

function DocsIndex() {
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
            <h2 id="popular-docs" className="mt-2 text-2xl font-black text-slate-950">
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
}

function DocSummaryLink({ doc }: { doc: DocPage }) {
  return (
    <Link
      href={`/docs/${doc.slug}`}
      className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
    >
      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        {getSectionTitle(doc.section)}
      </p>
      <h3 className="mt-3 text-lg font-black text-slate-950 group-hover:text-teal-900">
        {doc.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{doc.summary}</p>
    </Link>
  );
}

function DocArticle({ doc }: { doc: DocPage }) {
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
}

function DocTextSection({
  title,
  body,
  highlighted = false,
}: {
  title: string;
  body: string;
  highlighted?: boolean;
}) {
  return (
    <section aria-labelledby={titleToId(title)}>
      <h2 id={titleToId(title)} className="text-2xl font-black text-slate-950">
        {title}
      </h2>
      <p
        className={`mt-3 max-w-3xl text-base leading-8 ${
          highlighted
            ? "rounded-lg border border-teal-200 bg-teal-50 p-4 font-semibold text-teal-950"
            : "text-slate-600"
        }`}
      >
        {body}
      </p>
    </section>
  );
}

function DocListSection({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "teal" | "rose";
}) {
  const markerClass =
    tone === "teal" ? "bg-teal-500 text-white" : "bg-rose-500 text-white";

  return (
    <section aria-labelledby={titleToId(title)}>
      <h2 id={titleToId(title)} className="text-2xl font-black text-slate-950">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
            <span
              aria-hidden="true"
              className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-black ${markerClass}`}
            >
              {tone === "teal" ? "+" : "-"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CodeExampleBlock({
  title,
  example,
  tone = "light",
}: {
  title: string;
  example: CodeExample;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <section aria-labelledby={titleToId(title)}>
      <h2 id={titleToId(title)} className="text-2xl font-black text-slate-950">
        {title}
      </h2>
      <div
        className={`mt-4 overflow-hidden rounded-lg border ${
          isDark
            ? "border-slate-800 bg-slate-950"
            : "border-slate-200 bg-slate-950"
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-4 py-3">
          <p className="text-sm font-black text-slate-100">{example.title}</p>
          <CopyButton value={example.code} />
        </div>
        <pre className="overflow-x-auto p-4 text-sm leading-7 text-slate-100">
          <code>{example.code}</code>
        </pre>
      </div>
    </section>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <section aria-labelledby="checklist">
      <h2 id="checklist" className="text-2xl font-black text-slate-950">
        Checklist
      </h2>
      <ul className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200">
        {items.map((item) => (
          <li key={item} className="flex gap-3 px-4 py-3 text-sm text-slate-700">
            <span
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-2 border-teal-500"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function titleToId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
