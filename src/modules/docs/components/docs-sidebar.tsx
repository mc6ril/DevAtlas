import { DocsSidebarScroll } from "@/modules/docs/components/docs-sidebar-scroll";
import {
  docSections,
  getDocsBySection,
} from "@/modules/docs/data/docs";

type DocsSidebarProps = {
  activeSlug?: string;
};

export const DocsSidebar = ({ activeSlug }: DocsSidebarProps) => {
  const sections = docSections
    .map((section) => ({
      id: section.id,
      title: section.title,
      docs: getDocsBySection(section.id).map((doc) => ({
        slug: doc.slug,
        title: doc.title,
      })),
    }))
    .filter((section) => section.docs.length > 0);

  return <DocsSidebarScroll activeSlug={activeSlug} sections={sections} />;
};
