import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocArticle } from "@/modules/docs/components/doc-article";
import { DocsChrome } from "@/modules/docs/components/docs-chrome";
import { DocsIndex } from "@/modules/docs/components/docs-index";
import { docs, getDocBySlug } from "@/modules/docs/data/docs";

export type DocsRouteProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export const getDocsStaticParams = () => [
  { slug: [] },
  ...docs.map((doc) => ({
    slug: doc.slug.split("/"),
  })),
];

export const getDocsMetadata = async ({
  params,
}: DocsRouteProps): Promise<Metadata> => {
  const activeSlug = await getActiveSlug(params);

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
};

export const DocsRoute = async ({ params }: DocsRouteProps) => {
  const activeSlug = await getActiveSlug(params);

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
};

const getActiveSlug = async (params: DocsRouteProps["params"]) => {
  const { slug = [] } = await params;

  return slug.join("/");
};
