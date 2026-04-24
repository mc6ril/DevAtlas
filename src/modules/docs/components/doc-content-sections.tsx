import type { CodeExample } from "@/modules/docs/data/docs";
import { titleToId } from "@/modules/docs/lib/title-to-id";
import { CopyButton } from "@/shared/ui/copy-button";

type DocTextSectionProps = {
  title: string;
  body: string;
  highlighted?: boolean;
};

type DocListSectionProps = {
  title: string;
  items: string[];
  tone: "teal" | "rose";
};

type CodeExampleBlockProps = {
  title: string;
  example: CodeExample;
  tone?: "light" | "dark";
};

type ChecklistProps = {
  items: string[];
};

export const DocTextSection = ({
  title,
  body,
  highlighted = false,
}: DocTextSectionProps) => (
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

export const DocListSection = ({ title, items, tone }: DocListSectionProps) => {
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
};

export const CodeExampleBlock = ({
  title,
  example,
  tone = "light",
}: CodeExampleBlockProps) => {
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
};

export const Checklist = ({ items }: ChecklistProps) => (
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
