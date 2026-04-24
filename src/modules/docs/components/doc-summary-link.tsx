import Link from "next/link";
import type { DocPage } from "@/modules/docs/data/docs";
import { getSectionTitle } from "@/modules/docs/data/docs";

type DocSummaryLinkProps = {
  doc: DocPage;
};

export const DocSummaryLink = ({ doc }: DocSummaryLinkProps) => (
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
