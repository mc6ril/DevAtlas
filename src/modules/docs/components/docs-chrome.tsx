import { DocsSidebar } from "@/modules/docs/components/docs-sidebar";
import { SiteHeader } from "@/modules/docs/components/site-header";

type DocsChromeProps = {
  activeSlug?: string;
  children: React.ReactNode;
};

export const DocsChrome = ({ activeSlug, children }: DocsChromeProps) => (
  <div className="min-h-screen bg-slate-50 text-slate-950">
    <SiteHeader />
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
      <DocsSidebar activeSlug={activeSlug} />
      <main className="min-w-0">{children}</main>
    </div>
  </div>
);
