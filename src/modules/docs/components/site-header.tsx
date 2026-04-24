import Link from "next/link";
import { SearchCommand } from "@/modules/docs/components/search-command";
import { searchableDocs } from "@/modules/docs/data/docs";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
              DA
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.18em] text-slate-950">
                Dev Atlas
              </span>
              <span className="block text-xs font-medium text-slate-500">
                React standards
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/docs"
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Docs
            </Link>
            <Link
              href="/docs/recipes/index"
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Recipes
            </Link>
            <Link
              href="/docs/pr-guide/pull-request-checklist"
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              PR guide
            </Link>
          </nav>
        </div>

        <SearchCommand documents={searchableDocs} />
      </div>
    </header>
  );
}
