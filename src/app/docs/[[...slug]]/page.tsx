import {
  DocsRoute,
  getDocsMetadata,
  getDocsStaticParams,
  type DocsRouteProps,
} from "@/modules/docs/routing/docs-route";

export const generateStaticParams = getDocsStaticParams;

export const generateMetadata = getDocsMetadata;

const DocsPage = (props: DocsRouteProps) => <DocsRoute {...props} />;

export default DocsPage;
