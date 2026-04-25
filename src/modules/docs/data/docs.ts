import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type CodeExample = {
  title: string;
  code: string;
};

export type DocPage = {
  order: number;
  slug: string;
  title: string;
  section: string;
  owner: string;
  lastUpdated: string;
  tags: string[];
  summary: string;
  purpose: string;
  rule: string;
  whenToUse: string[];
  whenNotToUse: string[];
  recommended: CodeExample;
  avoid: CodeExample;
  why: string;
  checklist: string[];
  related: string[];
};

export type DocSection = {
  order: number;
  id: string;
  title: string;
  description: string;
  owner: string;
};

type SectionContent = DocSection & {
  articles: DocPage[];
};

type SectionJson = {
  order: number;
  title: string;
  description: string;
  owner: string;
};

type ArticleJson = {
  order: number;
  title: string;
  owner?: string;
  lastUpdated: string;
  tags: string[];
  summary: string;
  purpose: string;
  rule: string;
  whenToUse: string[];
  whenNotToUse: string[];
  recommended: CodeExample;
  avoid: CodeExample;
  why: string;
  checklist: string[];
  related?: string[];
};

const contentRoot = path.join(process.cwd(), "src/modules/docs/content");
const sectionMetadataFile = "_section.json";

export const popularSlugs = [
  "feature-development/create-a-feature",
  "code-standards/components",
  "state-data/api-layer",
  "testing/overview",
  "pr-guide/pull-request-checklist",
  "react-native/conventions",
];

export const roleEntrypoints = [
  {
    title: "New developer",
    description: "Learn the mental model, then build one feature the company way.",
    href: "/docs/getting-started/introduction",
  },
  {
    title: "Feature developer",
    description: "Start from the feature guide and copy the closest recipe.",
    href: "/docs/feature-development/create-a-feature",
  },
  {
    title: "Code reviewer",
    description: "Use shared review criteria and link standards in comments.",
    href: "/docs/pr-guide/reviewer-checklist",
  },
  {
    title: "Tech lead",
    description: "Own architecture changes through decision records and updates.",
    href: "/docs/decisions/adr-001-feature-architecture",
  },
];

export const intentEntrypoints = [
  { label: "Create a feature", href: "/docs/feature-development/create-a-feature" },
  { label: "Review a pull request", href: "/docs/pr-guide/reviewer-checklist" },
  { label: "Add a screen", href: "/docs/recipes/create-screen" },
  { label: "Refactor bad code", href: "/docs/architecture/overview" },
  {
    label: "Understand architecture",
    href: "/docs/architecture/feature-based-clean-architecture",
  },
  { label: "Add tests", href: "/docs/testing/overview" },
  { label: "Create a component", href: "/docs/code-standards/components" },
  { label: "Fetch data", href: "/docs/recipes/fetch-data" },
];

const loadContent = (): SectionContent[] =>
  readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => loadSection(entry.name))
    .sort(sortByOrderThenTitle);

const loadSection = (sectionId: string): SectionContent => {
  const sectionPath = path.join(contentRoot, sectionId);
  const metadata = readJson<SectionJson>(
    path.join(sectionPath, sectionMetadataFile),
    `section metadata for ${sectionId}`,
  );
  const section = toSection(sectionId, metadata);
  const articles = loadArticles(section);

  return {
    ...section,
    articles,
  };
};

const loadArticles = (section: DocSection): DocPage[] => {
  const sectionPath = path.join(contentRoot, section.id);

  return readdirSync(sectionPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => entry.name.endsWith(".json"))
    .filter((entry) => entry.name !== sectionMetadataFile)
    .map((entry) => loadArticle(section, entry.name))
    .sort(sortByOrderThenTitle);
};

const loadArticle = (section: DocSection, fileName: string): DocPage => {
  const articleId = path.basename(fileName, ".json");
  const filePath = path.join(contentRoot, section.id, fileName);
  const article = readJson<ArticleJson>(filePath, `${section.id}/${fileName}`);

  return {
    ...article,
    owner: article.owner ?? section.owner,
    related: article.related ?? [],
    slug: `${section.id}/${articleId}`,
    section: section.id,
  };
};

const toSection = (sectionId: string, metadata: SectionJson): DocSection => ({
  ...metadata,
  id: sectionId,
});

const readJson = <T>(filePath: string, label: string): T => {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    throw new Error(`Unable to load docs content: ${label}`, {
      cause: error,
    });
  }
};

const sortByOrderThenTitle = <T extends { order: number; title: string }>(
  left: T,
  right: T,
) => left.order - right.order || left.title.localeCompare(right.title);

const content = loadContent();

export const docSections = content.map(
  ({ order, id, title, description, owner }) => ({
    order,
    id,
    title,
    description,
    owner,
  }),
);

export const docs = content.flatMap((section) => section.articles);

const sectionById = new Map(docSections.map((section) => [section.id, section]));
const docBySlug = new Map(docs.map((doc) => [doc.slug, doc]));

export const getSectionTitle = (sectionId: string) =>
  sectionById.get(sectionId)?.title ?? sectionId;

export const getSectionOwner = (sectionId: string) =>
  sectionById.get(sectionId)?.owner ?? "Unassigned";

export const getDocBySlug = (slug: string) => docBySlug.get(slug);

export const getDocsBySection = (sectionId: string) =>
  docs.filter((doc) => doc.section === sectionId);

export const getRelatedDocs = (doc: DocPage) =>
  doc.related
    .map((slug) => getDocBySlug(slug))
    .filter((relatedDoc): relatedDoc is DocPage => Boolean(relatedDoc));

export const getNeighborDocs = (slug: string) => {
  const index = docs.findIndex((doc) => doc.slug === slug);

  return {
    previous: index > 0 ? docs[index - 1] : null,
    next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : null,
  };
};

export const searchableDocs = docs.map((doc) => ({
  href: `/docs/${doc.slug}`,
  title: doc.title,
  section: getSectionTitle(doc.section),
  summary: doc.summary,
  tags: doc.tags,
  searchText: [
    doc.title,
    getSectionTitle(doc.section),
    doc.summary,
    doc.purpose,
    doc.rule,
    doc.why,
    ...doc.tags,
    ...doc.checklist,
  ]
    .join(" ")
    .toLowerCase(),
}));
