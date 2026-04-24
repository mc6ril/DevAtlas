"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type SearchDocument = {
  href: string;
  title: string;
  section: string;
  summary: string;
  tags: string[];
  searchText: string;
};

type SearchCommandProps = {
  documents: SearchDocument[];
};

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
}

function scoreDocument(document: SearchDocument, query: string) {
  const normalizedTitle = document.title.toLowerCase();
  const normalizedSection = document.section.toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return 1;
  }

  if (!terms.every((term) => document.searchText.includes(term))) {
    return 0;
  }

  return terms.reduce((score, term) => {
    if (normalizedTitle === term) {
      return score + 90;
    }

    if (normalizedTitle.startsWith(term)) {
      return score + 70;
    }

    if (normalizedTitle.includes(term)) {
      return score + 45;
    }

    if (document.tags.some((tag) => tag.includes(term))) {
      return score + 30;
    }

    if (normalizedSection.includes(term)) {
      return score + 20;
    }

    return score + 5;
  }, 0);
}

export function SearchCommand({ documents }: SearchCommandProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      const opensSearch =
        event.key === "/" ||
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k");

      if (!opensSearch || isTypingTarget(event.target)) {
        return;
      }

      event.preventDefault();
      setIsOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return documents
      .map((document) => ({
        document,
        score: scoreDocument(document, normalizedQuery),
      }))
      .filter((result) => result.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, normalizedQuery ? 8 : 6)
      .map((result) => result.document);
  }, [documents, query]);

  return (
    <div className="relative w-full max-w-xl">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-keyshortcuts="/ Meta+K Control+K"
        onClick={() => {
          setIsOpen(true);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className="flex h-11 w-full items-center gap-3 rounded-md border border-slate-300 bg-white px-4 text-left text-sm text-slate-500 shadow-sm transition hover:border-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <span aria-hidden="true" className="text-base text-slate-400">
          ?
        </span>
        <span className="truncate">Search standards, examples, checklists</span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/30 px-4 py-16 backdrop-blur-sm sm:px-6">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-200 p-4">
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by task, pattern, folder, or review comment"
                className="h-12 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200"
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((result) => (
                    <Link
                      key={result.href}
                      href={result.href}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery("");
                      }}
                      className="block rounded-md px-4 py-3 transition hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-slate-950">
                          {result.title}
                        </p>
                        <p className="shrink-0 text-xs font-medium text-teal-700">
                          {result.section}
                        </p>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                        {result.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm font-semibold text-slate-950">
                    No standards found
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Try a folder, pattern, review topic, or recipe name.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
              <p className="text-xs font-medium text-slate-500">
                {documents.length} standards indexed
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
