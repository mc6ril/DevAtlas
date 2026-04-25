"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

type SidebarDoc = {
  slug: string;
  title: string;
};

type SidebarSection = {
  id: string;
  title: string;
  docs: SidebarDoc[];
};

type DocsSidebarScrollProps = {
  activeSlug?: string;
  sections: SidebarSection[];
};

type SidebarNavProps = DocsSidebarScrollProps & {
  onNavigate: () => void;
};

const scrollStorageKey = "dev-atlas:docs-sidebar-scroll";

export const DocsSidebarScroll = ({
  activeSlug,
  sections,
}: DocsSidebarScrollProps) => {
  const sidebarRef = useRef<HTMLElement>(null);

  const saveScrollPosition = useCallback(() => {
    const sidebar = sidebarRef.current;

    if (!sidebar) {
      return;
    }

    window.sessionStorage.setItem(scrollStorageKey, String(sidebar.scrollTop));
  }, []);

  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (!sidebar) {
      return;
    }

    const savedScrollTop = Number(
      window.sessionStorage.getItem(scrollStorageKey) ?? 0,
    );
    const animationFrame = window.requestAnimationFrame(() => {
      sidebar.scrollTop = savedScrollTop;
    });

    sidebar.addEventListener("scroll", saveScrollPosition, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      saveScrollPosition();
      sidebar.removeEventListener("scroll", saveScrollPosition);
    };
  }, [saveScrollPosition]);

  return (
    <aside
      ref={sidebarRef}
      className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto"
    >
      <details className="mb-5 rounded-md border border-slate-200 bg-white p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-black text-slate-950">
          Browse standards
        </summary>
        <div className="mt-4">
          <SidebarNav
            activeSlug={activeSlug}
            sections={sections}
            onNavigate={saveScrollPosition}
          />
        </div>
      </details>

      <div className="hidden lg:block">
        <SidebarNav
          activeSlug={activeSlug}
          sections={sections}
          onNavigate={saveScrollPosition}
        />
      </div>
    </aside>
  );
};

const SidebarNav = ({ activeSlug, sections, onNavigate }: SidebarNavProps) => (
  <nav aria-label="Documentation navigation" className="space-y-6">
    <Link
      href="/docs"
      onClick={onNavigate}
      className={`block rounded-md px-3 py-2 text-sm font-black transition ${
        activeSlug
          ? "text-slate-600 hover:bg-white hover:text-slate-950"
          : "bg-slate-950 text-white"
      }`}
    >
      All standards
    </Link>

    {sections.map((section) => (
      <section key={section.id} aria-labelledby={`${section.id}-nav`}>
        <h2
          id={`${section.id}-nav`}
          className="px-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500"
        >
          {section.title}
        </h2>
        <div className="mt-2 space-y-1">
          {section.docs.map((doc) => {
            const isActive = activeSlug === doc.slug;

            return (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                onClick={onNavigate}
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
    ))}
  </nav>
);
