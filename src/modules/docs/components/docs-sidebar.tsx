import Link from "next/link";
import {
  docSections,
  getDocsBySection,
} from "@/modules/docs/data/docs";

type DocsSidebarProps = {
  activeSlug?: string;
};

type SidebarNavProps = {
  activeSlug?: string;
};

export const DocsSidebar = ({ activeSlug }: DocsSidebarProps) => (
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

const SidebarNav = ({ activeSlug }: SidebarNavProps) => (
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
