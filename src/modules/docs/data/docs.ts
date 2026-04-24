export type CodeExample = {
  title: string;
  code: string;
};

export type DocPage = {
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
  id: string;
  title: string;
  description: string;
  owner: string;
};

export const docSections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Fast onboarding and the shortest path to writing code that fits.",
    owner: "Engineering Enablement",
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "The mental model for folders, boundaries, and dependencies.",
    owner: "Frontend Tech Lead",
  },
  {
    id: "feature-development",
    title: "Feature Development",
    description: "Step-by-step standards for building production features.",
    owner: "Feature Platform Lead",
  },
  {
    id: "code-standards",
    title: "Code Standards",
    description: "Naming, components, hooks, TypeScript, imports, and errors.",
    owner: "Frontend Guild",
  },
  {
    id: "react",
    title: "React Best Practices",
    description: "React-specific patterns for composition, hooks, and performance.",
    owner: "Web Platform Lead",
  },
  {
    id: "react-native",
    title: "React Native Best Practices",
    description: "Mobile conventions for screens, navigation, performance, and devices.",
    owner: "Mobile Lead",
  },
  {
    id: "ui-design-system",
    title: "UI & Design System",
    description: "How product code stays aligned with design tokens and shared components.",
    owner: "Design System Team",
  },
  {
    id: "state-data",
    title: "State & Data",
    description: "Client state, server state, API boundaries, models, and mappers.",
    owner: "Application Architecture Lead",
  },
  {
    id: "testing",
    title: "Testing",
    description: "Quality expectations for unit, component, integration, and E2E tests.",
    owner: "QA Lead",
  },
  {
    id: "pr-guide",
    title: "Pull Request Guide",
    description: "How standards become review behavior.",
    owner: "Engineering Manager",
  },
  {
    id: "recipes",
    title: "Recipes",
    description: "Practical copy-ready examples for common work.",
    owner: "Developer Experience",
  },
  {
    id: "decisions",
    title: "Decision Records",
    description: "Why the standards exist and when to revisit them.",
    owner: "Architecture Council",
  },
];

export const docs: DocPage[] = [
  {
    slug: "getting-started/introduction",
    title: "Why This Documentation Exists",
    section: "getting-started",
    owner: "Engineering Enablement",
    lastUpdated: "2026-04-18",
    tags: ["onboarding", "standards", "operating-manual"],
    summary: "Use this site as the operating manual for company React and React Native code.",
    purpose:
      "This documentation turns recurring architecture, implementation, and review expectations into one shared source of truth.",
    rule:
      "Before introducing a new pattern, changing an existing one, or debating a repeated review comment, update or link the relevant standard.",
    whenToUse: [
      "Starting work in an unfamiliar area of the codebase.",
      "Opening a pull request that follows a company pattern.",
      "Reviewing code and needing an agreed reference.",
      "Onboarding a developer, contractor, QA engineer, or product engineer.",
    ],
    whenNotToUse: [
      "As a replacement for reading the actual code near the feature.",
      "As a place for team-specific secrets, roadmap details, or temporary project notes.",
    ],
    recommended: {
      title: "Link standards from review comments",
      code: `// Recommended review comment
This component is doing data fetching and rendering.
Please follow the UI layer guide:
/docs/feature-development/ui-layer`,
    },
    avoid: {
      title: "Repeat undocumented preferences",
      code: `// Avoid
I do not like this structure.
Can you move things around until it looks more like the rest?`,
    },
    why:
      "Teams move faster when standards are concrete, searchable, and reviewable. The goal is not more rules; the goal is fewer repeated conversations and fewer surprising pull request comments.",
    checklist: [
      "The relevant standard is linked when it affects review feedback.",
      "New patterns include examples before they are enforced.",
      "Owners are clear for each documentation section.",
      "Outdated guidance is updated or marked for revision.",
    ],
    related: [
      "getting-started/how-to-use-this-guide",
      "pr-guide/pull-request-checklist",
      "decisions/adr-001-feature-architecture",
    ],
  },
  {
    slug: "getting-started/how-to-use-this-guide",
    title: "How To Use This Guide",
    section: "getting-started",
    owner: "Engineering Enablement",
    lastUpdated: "2026-04-17",
    tags: ["onboarding", "search", "reviews"],
    summary: "Find the standard first, then copy the pattern and run the checklist.",
    purpose:
      "This page explains the daily workflow for using the documentation during implementation and code review.",
    rule:
      "Use the guide by intent: start with the role shortcuts, search for the task, copy the closest recipe, then check the review criteria before opening a PR.",
    whenToUse: [
      "You are building something you have built before, but want the company version.",
      "You are unsure whether code belongs in shared, domain, module, or presentation layers.",
      "You want to make review feedback objective.",
    ],
    whenNotToUse: [
      "When a production incident requires immediate mitigation before documentation.",
      "When the local code has intentionally diverged and the owner has not reconciled the docs yet.",
    ],
    recommended: {
      title: "Use the guide before opening a PR",
      code: `const beforeOpeningPr = [
  "feature structure matches the guide",
  "business logic is outside UI components",
  "errors, loading, and empty states are handled",
  "tests cover the main behavior",
]`,
    },
    avoid: {
      title: "Treat docs as an afterthought",
      code: `const afterReviewStarts = [
  "ask reviewers what pattern they prefer",
  "rewrite structure during review",
  "add tests after the final approval",
]`,
    },
    why:
      "The guide is most valuable before code review. It keeps decisions small, visible, and tied to standards instead of personal taste.",
    checklist: [
      "Search by task before creating a new pattern.",
      "Use a recipe when one exists.",
      "Link standards in PR descriptions when the change is architectural.",
      "Update docs when the codebase evolves.",
    ],
    related: [
      "feature-development/create-a-feature",
      "recipes/index",
      "pr-guide/reviewer-checklist",
    ],
  },
  {
    slug: "architecture/overview",
    title: "Frontend Architecture Principles",
    section: "architecture",
    owner: "Frontend Tech Lead",
    lastUpdated: "2026-04-20",
    tags: ["architecture", "boundaries", "principles"],
    summary: "Keep business rules independent from rendering and framework details.",
    purpose:
      "Architecture standards make features predictable to place, test, review, and change.",
    rule:
      "Feature code should separate UI, orchestration, domain decisions, data mapping, and shared infrastructure. Dependencies point inward toward stable domain concepts, not outward toward screens.",
    whenToUse: [
      "Creating a feature that includes UI, API data, state, and business rules.",
      "Refactoring components that contain validation, mapping, or permissions logic.",
      "Reviewing dependency direction between folders.",
    ],
    whenNotToUse: [
      "For tiny static UI with no state, side effects, or business behavior.",
      "For experiments that have an explicit deletion date.",
    ],
    recommended: {
      title: "Orchestrate behavior outside the view",
      code: `function ProfileScreen() {
  const profile = useProfileScreen()

  return <ProfileView {...profile} />
}`,
    },
    avoid: {
      title: "Mix API calls, mapping, and UI",
      code: `function ProfileScreen() {
  const [user, setUser] = useState<UserDto | null>(null)

  useEffect(() => {
    api.getUser().then((dto) => setUser(dto))
  }, [])

  return <Text>{user?.first_name}</Text>
}`,
    },
    why:
      "When rendering code owns business rules, every UI change becomes risky. Keeping orchestration and mapping outside views makes code easier to reuse across React and React Native.",
    checklist: [
      "UI renders view models, not raw API DTOs.",
      "Business rules are testable without rendering a component.",
      "Shared code does not import feature-specific code.",
      "Framework-specific details stay near the app boundary.",
    ],
    related: [
      "architecture/project-structure",
      "state-data/api-layer",
      "decisions/adr-001-feature-architecture",
    ],
  },
  {
    slug: "architecture/project-structure",
    title: "Project Structure",
    section: "architecture",
    owner: "Frontend Tech Lead",
    lastUpdated: "2026-04-20",
    tags: ["folders", "feature-folders", "dependency-rules"],
    summary: "Place code by ownership and stability, not by file extension.",
    purpose:
      "A consistent project structure lets developers answer where a file belongs without asking a reviewer.",
    rule:
      "Use feature-first folders for product behavior, domain folders for business concepts, presentation for shared UI, app for routing and composition, and shared for stable cross-cutting utilities.",
    whenToUse: [
      "Adding a new screen, flow, or reusable feature capability.",
      "Moving duplicated logic out of a component.",
      "Creating code that will be reused by multiple product areas.",
    ],
    whenNotToUse: [
      "Do not promote code to shared just because a second file imports it once.",
      "Do not create domain folders for purely visual concepts.",
    ],
    recommended: {
      title: "Feature-based structure",
      code: `src/
  app/
    navigation/
    providers/
  domains/
    billing/
      billing-model.ts
      billing-rules.ts
  modules/
    invoices/
      api/
      hooks/
      screens/
      ui/
  presentation/
    components/
    tokens/
  shared/
    result.ts
    date-format.ts`,
    },
    avoid: {
      title: "File-type buckets",
      code: `src/
  components/
  hooks/
  services/
  types/
  utils/
  screens/`,
    },
    why:
      "File-type buckets look simple at first but hide ownership. Feature-based structure keeps related behavior close while preserving boundaries for truly shared code.",
    checklist: [
      "The folder name communicates product ownership.",
      "Reusable UI is in presentation, not inside a random feature.",
      "Shared utilities are stable, tested, and domain-neutral.",
      "Domain code does not import screens or components.",
    ],
    related: [
      "architecture/overview",
      "feature-development/folder-structure",
      "decisions/adr-001-feature-architecture",
    ],
  },
  {
    slug: "feature-development/create-a-feature",
    title: "Create A New Feature",
    section: "feature-development",
    owner: "Feature Platform Lead",
    lastUpdated: "2026-04-21",
    tags: ["feature", "workflow", "checklist"],
    summary: "Create features by starting with the user flow, then add UI, orchestration, data, and tests.",
    purpose:
      "This guide gives developers a repeatable path from product requirement to review-ready feature code.",
    rule:
      "A feature must include a feature folder, a clear screen or entry point, an orchestration hook, typed data boundaries, loading and error states, analytics where required, and tests for the main behavior.",
    whenToUse: [
      "Building a new screen, flow, or product capability.",
      "Splitting a large feature into smaller reviewable increments.",
      "Planning work with a tech lead before implementation.",
    ],
    whenNotToUse: [
      "For a one-line visual tweak.",
      "For code that belongs to an existing feature and does not change boundaries.",
    ],
    recommended: {
      title: "Feature creation order",
      code: `modules/profile/
  screens/ProfileScreen.tsx
  ui/ProfileView.tsx
  hooks/useProfileScreen.ts
  api/profile-api.ts
  mappers/profile-mapper.ts
  __tests__/profile-screen.test.tsx`,
    },
    avoid: {
      title: "Start with scattered files",
      code: `components/Profile.tsx
hooks/useUser.ts
services/userService.ts
types/profile.ts
utils/profile.ts`,
    },
    why:
      "The review becomes smaller when reviewers can inspect one feature boundary and see UI, data, and tests together.",
    checklist: [
      "Feature has a clear owner folder.",
      "UI is separated from orchestration logic.",
      "Data enters through typed API and mapper boundaries.",
      "Loading, error, and empty states are visible.",
      "Tests cover the main user behavior and failure path.",
    ],
    related: [
      "feature-development/folder-structure",
      "feature-development/ui-layer",
      "testing/overview",
    ],
  },
  {
    slug: "feature-development/folder-structure",
    title: "Feature Folder Structure",
    section: "feature-development",
    owner: "Feature Platform Lead",
    lastUpdated: "2026-04-19",
    tags: ["feature-folders", "modules", "ownership"],
    summary: "A feature folder groups the files needed to build, test, and review one product capability.",
    purpose:
      "Feature folders reduce review friction by putting related implementation details in one predictable place.",
    rule:
      "Each feature folder may contain screens, ui, hooks, api, mappers, state, permissions, analytics, and tests. Add folders only when the feature needs them.",
    whenToUse: [
      "A feature has more than one implementation file.",
      "A capability has product ownership and a review boundary.",
      "A screen needs orchestration beyond basic rendering.",
    ],
    whenNotToUse: [
      "Do not create every possible subfolder up front.",
      "Do not hide shared design system components inside a feature folder.",
    ],
    recommended: {
      title: "Add folders when they earn their place",
      code: `modules/search/
  screens/SearchScreen.tsx
  ui/SearchResults.tsx
  hooks/useSearchScreen.ts
  api/search-api.ts
  mappers/search-result-mapper.ts
  __tests__/search-screen.test.tsx`,
    },
    avoid: {
      title: "Create empty architecture theater",
      code: `modules/search/
  actions/
  adapters/
  controllers/
  entities/
  factories/
  gateways/
  presenters/
  repositories/
  services/
  use-cases/`,
    },
    why:
      "The structure should make the next file obvious. Empty folders make architecture look heavier than it is and discourage small PRs.",
    checklist: [
      "Folder names match the feature language used by product and QA.",
      "Only required subfolders exist.",
      "Tests live near the feature they protect.",
      "Feature exports do not expose internal implementation details by default.",
    ],
    related: [
      "feature-development/create-a-feature",
      "architecture/project-structure",
      "code-standards/imports",
    ],
  },
  {
    slug: "feature-development/ui-layer",
    title: "UI Layer",
    section: "feature-development",
    owner: "Design System Team",
    lastUpdated: "2026-04-19",
    tags: ["ui", "screens", "separation-of-concerns"],
    summary: "UI components render state and emit intent; they do not own business rules.",
    purpose:
      "The UI layer keeps rendering simple enough to reason about and portable across web and mobile patterns.",
    rule:
      "Screen components compose orchestration hooks with pure views. View components receive explicit props, render states, and call event handlers without importing API clients or domain services.",
    whenToUse: [
      "A component has loading, empty, error, or permission states.",
      "A view needs to be reused in Storybook or React Native previews.",
      "A screen is becoming difficult to test.",
    ],
    whenNotToUse: [
      "For a trivial presentational component with no orchestration.",
      "When framework-specific primitives are the whole point of the component.",
    ],
    recommended: {
      title: "Pure view with explicit state",
      code: `type ProfileViewProps = {
  user: ProfileViewModel | null
  isLoading: boolean
  error: Error | null
  onRetry: () => void
}

export function ProfileView(props: ProfileViewProps) {
  if (props.isLoading) return <LoadingState />
  if (props.error) return <ErrorState onRetry={props.onRetry} />
  if (!props.user) return <EmptyState />

  return <ProfileSummary user={props.user} />
}`,
    },
    avoid: {
      title: "View imports services",
      code: `export function ProfileView() {
  const [user, setUser] = useState<UserDto | null>(null)

  useEffect(() => {
    profileApi.getProfile().then(setUser)
  }, [])

  return <ProfileSummary user={user} />
}`,
    },
    why:
      "Views are easier to test, preview, and reuse when their inputs are explicit. API and business logic belong in orchestration hooks or use-case functions.",
    checklist: [
      "View props are explicit and typed.",
      "The view handles loading, error, and empty states.",
      "The view does not import API clients.",
      "Callbacks describe user intent, not implementation details.",
    ],
    related: [
      "feature-development/create-a-feature",
      "code-standards/components",
      "react/component-composition",
    ],
  },
  {
    slug: "code-standards/components",
    title: "Component Conventions",
    section: "code-standards",
    owner: "Frontend Guild",
    lastUpdated: "2026-04-22",
    tags: ["components", "props", "composition"],
    summary: "Components should be named by responsibility and accept explicit, narrow props.",
    purpose:
      "Component conventions keep UI code readable, searchable, and easy to review across teams.",
    rule:
      "Use PascalCase component names, explicit prop types, composition for variation, and stable callback names based on user intent.",
    whenToUse: [
      "Creating a screen, feature view, or reusable component.",
      "Refactoring a component with broad boolean props.",
      "Reviewing whether a component should belong to the design system.",
    ],
    whenNotToUse: [
      "Do not extract a component just to reduce line count.",
      "Do not make a component generic before there are real reuse cases.",
    ],
    recommended: {
      title: "Name props by intent",
      code: `type InvoiceActionsProps = {
  canApprove: boolean
  onApprove: () => void
  onReject: () => void
}

export function InvoiceActions(props: InvoiceActionsProps) {
  return (
    <ActionBar>
      <Button disabled={!props.canApprove} onClick={props.onApprove}>
        Approve
      </Button>
      <Button variant="secondary" onClick={props.onReject}>
        Reject
      </Button>
    </ActionBar>
  )
}`,
    },
    avoid: {
      title: "Leak implementation through props",
      code: `type Props = {
  data: any
  disabled: boolean
  type: string
  callback: Function
}`,
    },
    why:
      "Reviewers should understand a component's contract from its props. Intent-based names preserve meaning as internals change.",
    checklist: [
      "Component name describes responsibility.",
      "Props type is explicit and exported only when reused.",
      "Boolean props do not create many hidden variants.",
      "Callbacks are named by user intent.",
    ],
    related: [
      "feature-development/ui-layer",
      "react/component-composition",
      "ui-design-system/component-library",
    ],
  },
  {
    slug: "code-standards/hooks",
    title: "Hook Conventions",
    section: "code-standards",
    owner: "Frontend Guild",
    lastUpdated: "2026-04-22",
    tags: ["hooks", "orchestration", "state"],
    summary: "Hooks orchestrate behavior and return view-ready state.",
    purpose:
      "Custom hooks give screens a clean boundary for side effects, derived state, and event handlers.",
    rule:
      "Use custom hooks for orchestration. Return a small view model, booleans for view states, and stable callbacks with functional updates when state depends on previous state.",
    whenToUse: [
      "A screen coordinates API data, local state, analytics, or navigation.",
      "The same behavior is needed by multiple components.",
      "A component is hard to test because side effects are mixed into rendering.",
    ],
    whenNotToUse: [
      "Do not create a hook that only wraps one useState without adding meaning.",
      "Do not hide rendering decisions inside hooks.",
    ],
    recommended: {
      title: "Return view-ready state",
      code: `export function useProfileScreen() {
  const profileQuery = useProfileQuery()

  return {
    user: profileQuery.data ?? null,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    onRetry: profileQuery.refetch,
  }
}`,
    },
    avoid: {
      title: "Return raw implementation details",
      code: `export function useProfileScreen() {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
  })

  return query
}`,
    },
    why:
      "Screens should not know every detail of the state library. Hooks translate implementation details into the contract a view needs.",
    checklist: [
      "Hook name starts with use and describes behavior.",
      "Return value is narrow and view-ready.",
      "Effects list primitive dependencies where possible.",
      "Callbacks use functional state updates when needed.",
    ],
    related: [
      "code-standards/components",
      "state-data/state-management",
      "react/hooks-usage",
    ],
  },
  {
    slug: "code-standards/typescript",
    title: "TypeScript Conventions",
    section: "code-standards",
    owner: "Frontend Guild",
    lastUpdated: "2026-04-22",
    tags: ["typescript", "types", "models"],
    summary: "Types should describe contracts at boundaries and avoid leaking external shapes.",
    purpose:
      "TypeScript standards make data contracts explicit and protect the app from API and platform drift.",
    rule:
      "Use explicit types at boundaries, domain models for business logic, DTO types for transport shapes, and narrow unions for known states.",
    whenToUse: [
      "Creating API responses, mappers, feature props, or domain models.",
      "Handling states with more than a boolean branch.",
      "Replacing any, Function, or broad object types.",
    ],
    whenNotToUse: [
      "Do not duplicate obvious local inference in tiny pure functions.",
      "Do not create exported types that are used by only one private implementation detail.",
    ],
    recommended: {
      title: "Separate DTOs from domain models",
      code: `type UserDto = {
  id: string
  first_name: string
  last_name: string
}

type User = {
  id: string
  fullName: string
}

function mapUser(dto: UserDto): User {
  return {
    id: dto.id,
    fullName: [dto.first_name, dto.last_name].join(" "),
  }
}`,
    },
    avoid: {
      title: "Use transport types everywhere",
      code: `function UserHeader({ user }: { user: any }) {
  return <Text>{user.first_name}</Text>
}`,
    },
    why:
      "External contracts change for reasons the UI does not control. Mappers and explicit models keep those changes contained.",
    checklist: [
      "Boundary data has explicit input and output types.",
      "DTOs do not leak into UI components.",
      "Known states use unions instead of stringly typed values.",
      "No any or Function types without a documented exception.",
    ],
    related: [
      "state-data/api-layer",
      "state-data/dtos-and-mappers",
      "code-standards/components",
    ],
  },
  {
    slug: "code-standards/error-handling",
    title: "Error Handling",
    section: "code-standards",
    owner: "Frontend Guild",
    lastUpdated: "2026-04-18",
    tags: ["errors", "async", "review"],
    summary: "Handle errors deliberately at the boundary where the user can recover.",
    purpose:
      "Error standards keep failures observable, testable, and understandable for users and reviewers.",
    rule:
      "Convert unknown failures into typed app errors at boundaries, render recoverable states in the UI, and log only the context that helps debugging without exposing sensitive data.",
    whenToUse: [
      "Calling APIs, native modules, permissions, storage, or analytics.",
      "Rendering screens with async dependencies.",
      "Adding retry, fallback, or offline behavior.",
    ],
    whenNotToUse: [
      "Do not swallow errors because the UI has no design yet.",
      "Do not show raw backend messages directly to users.",
    ],
    recommended: {
      title: "Map failures before rendering",
      code: `async function loadProfile(): Promise<Result<Profile, AppError>> {
  try {
    const dto = await profileApi.getProfile()
    return ok(mapProfile(dto))
  } catch (error) {
    return err(toAppError(error))
  }
}`,
    },
    avoid: {
      title: "Let unknown errors leak",
      code: `async function loadProfile() {
  const response = await fetch("/api/profile")
  return response.json()
}`,
    },
    why:
      "A consistent error boundary prevents each feature from inventing its own failure language. It also gives QA predictable states to verify.",
    checklist: [
      "Async failures are mapped to app-level errors.",
      "User-facing copy is safe and actionable.",
      "Retry exists where recovery is possible.",
      "Tests cover at least one failure path.",
    ],
    related: [
      "state-data/api-layer",
      "feature-development/create-a-feature",
      "testing/overview",
    ],
  },
  {
    slug: "code-standards/imports",
    title: "Import Rules",
    section: "code-standards",
    owner: "Frontend Guild",
    lastUpdated: "2026-04-16",
    tags: ["imports", "dependencies", "boundaries"],
    summary: "Imports should make dependency direction visible.",
    purpose:
      "Import rules help reviewers catch architecture drift before it becomes folder entropy.",
    rule:
      "Import directly from the file that owns the contract. Avoid broad barrel files for feature internals and never import from a higher-level product layer into a lower-level shared layer.",
    whenToUse: [
      "Adding a dependency between app, modules, domains, presentation, or shared.",
      "Creating public entry points for a feature.",
      "Reviewing circular dependencies or bundle growth.",
    ],
    whenNotToUse: [
      "Do not create public exports for private feature implementation.",
      "Do not use path aliases to hide invalid dependency direction.",
    ],
    recommended: {
      title: "Import stable contracts directly",
      code: `import { formatCurrency } from "@/shared/format-currency"
import { InvoiceSummary } from "@/modules/invoices/ui/InvoiceSummary"`,
    },
    avoid: {
      title: "Import from broad barrels",
      code: `import { formatCurrency, InvoiceSummary, useInvoiceQuery } from "@/"`,
    },
    why:
      "Direct imports make ownership and bundle impact easier to see. Broad barrels can accidentally pull unrelated code into a client bundle.",
    checklist: [
      "Import path reflects the owner of the contract.",
      "Shared code does not import modules or app code.",
      "Feature internals are not exported through broad barrels.",
      "Circular dependencies are removed before merge.",
    ],
    related: [
      "architecture/project-structure",
      "feature-development/folder-structure",
      "react/performance",
    ],
  },
  {
    slug: "react/component-composition",
    title: "Component Composition",
    section: "react",
    owner: "Web Platform Lead",
    lastUpdated: "2026-04-17",
    tags: ["react", "composition", "props"],
    summary: "Prefer composition over prop combinations that create hidden component modes.",
    purpose:
      "Composition makes React components easier to extend without turning props into a private configuration language.",
    rule:
      "Use children, slots, and small named components for variation. Add boolean props only for simple, independent states.",
    whenToUse: [
      "A component has multiple optional areas or layout variants.",
      "Boolean props are starting to interact with each other.",
      "A design system component needs predictable extension points.",
    ],
    whenNotToUse: [
      "Do not use composition to avoid a simple prop that is clear and stable.",
      "Do not expose internal layout details as arbitrary render props.",
    ],
    recommended: {
      title: "Use named composition points",
      code: `<Panel>
  <Panel.Header title="Billing" />
  <Panel.Body>
    <BillingSummary />
  </Panel.Body>
  <Panel.Footer>
    <InvoiceActions />
  </Panel.Footer>
</Panel>`,
    },
    avoid: {
      title: "Create prop combinations",
      code: `<Panel
  title="Billing"
  showHeader
  showFooter
  footerType="invoice"
  renderActions
  compact={false}
/>`,
    },
    why:
      "Composition keeps variation visible at the call site. Reviewers can see what the component renders without learning every mode.",
    checklist: [
      "Variation is visible at the call site.",
      "Boolean props are simple and independent.",
      "Children are used for meaningful layout extension.",
      "The component still owns its accessibility contract.",
    ],
    related: [
      "code-standards/components",
      "ui-design-system/component-library",
      "react/performance",
    ],
  },
  {
    slug: "react/hooks-usage",
    title: "Hooks Usage",
    section: "react",
    owner: "Web Platform Lead",
    lastUpdated: "2026-04-15",
    tags: ["react", "hooks", "effects"],
    summary: "Effects synchronize with external systems; they are not a default place for derived state.",
    purpose:
      "Hook standards reduce stale state, accidental rerenders, and unclear ownership of side effects.",
    rule:
      "Use effects only to synchronize with external systems. Derive values during render when possible, and keep effect dependencies primitive and complete.",
    whenToUse: [
      "Subscribing to events, timers, browser APIs, or native APIs.",
      "Synchronizing with imperative libraries.",
      "Triggering analytics that cannot be sent from an event handler.",
    ],
    whenNotToUse: [
      "Do not mirror props into state just to transform them.",
      "Do not use effects for work that can happen in event handlers.",
    ],
    recommended: {
      title: "Derive during render",
      code: `function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  const unpaidInvoices = invoices.filter((invoice) => invoice.status === "unpaid")

  return <InvoiceTable invoices={unpaidInvoices} />
}`,
    },
    avoid: {
      title: "Mirror derived state with effects",
      code: `function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  const [unpaidInvoices, setUnpaidInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    setUnpaidInvoices(invoices.filter((invoice) => invoice.status === "unpaid"))
  }, [invoices])

  return <InvoiceTable invoices={unpaidInvoices} />
}`,
    },
    why:
      "Derived state in effects causes extra renders and stale-data bugs. Rendering from inputs keeps the component easier to reason about.",
    checklist: [
      "Effects synchronize with something outside React.",
      "Derived values are computed during render or memoized when expensive.",
      "Dependencies are complete and stable.",
      "Cleanup exists for subscriptions and timers.",
    ],
    related: [
      "code-standards/hooks",
      "react/performance",
      "feature-development/ui-layer",
    ],
  },
  {
    slug: "react/performance",
    title: "React Performance",
    section: "react",
    owner: "Web Platform Lead",
    lastUpdated: "2026-04-15",
    tags: ["react", "performance", "bundle-size"],
    summary: "Optimize by reducing shipped JavaScript, avoiding waterfalls, and keeping rerenders local.",
    purpose:
      "Performance standards keep apps responsive without adding premature memoization everywhere.",
    rule:
      "Start with server rendering where available, direct imports, parallel data loading, small client boundaries, and memoization only around measured expensive work.",
    whenToUse: [
      "Adding client-only interactivity to a mostly static page.",
      "Importing heavy libraries or shared barrels.",
      "Fixing slow screens, long lists, or expensive derived values.",
    ],
    whenNotToUse: [
      "Do not add memoization before there is a clear reason.",
      "Do not convert a full route to a client component for one input or button.",
    ],
    recommended: {
      title: "Keep client boundaries small",
      code: `// Server component
export default function DocsPage() {
  return (
    <DocsLayout>
      <SearchCommand documents={searchableDocs} />
      <StaticArticle />
    </DocsLayout>
  )
}`,
    },
    avoid: {
      title: "Ship a whole route as client code",
      code: `"use client"

export default function DocsPage() {
  const [query, setQuery] = useState("")

  return <FullDocumentationApp query={query} onQueryChange={setQuery} />
}`,
    },
    why:
      "Small client boundaries keep hydration work low and make pages faster to load. Direct imports also reduce accidental bundle growth.",
    checklist: [
      "Interactive code is isolated to the smallest component that needs it.",
      "Independent async work starts in parallel.",
      "Heavy modules are imported only where they are used.",
      "Memoization protects measured expensive work, not every render.",
    ],
    related: [
      "react/hooks-usage",
      "code-standards/imports",
      "feature-development/ui-layer",
    ],
  },
  {
    slug: "react-native/conventions",
    title: "React Native Conventions",
    section: "react-native",
    owner: "Mobile Lead",
    lastUpdated: "2026-04-21",
    tags: ["react-native", "mobile", "navigation"],
    summary: "Mobile features follow the same architecture with platform-specific care for navigation, lifecycle, and performance.",
    purpose:
      "React Native standards keep mobile code consistent with web architecture while respecting device constraints.",
    rule:
      "Keep screens thin, centralize navigation contracts, isolate platform-specific code, handle app lifecycle explicitly, and design for offline, permissions, and performance from the start.",
    whenToUse: [
      "Creating a new mobile screen or flow.",
      "Adding permissions, camera, location, BLE, storage, or background behavior.",
      "Optimizing lists, images, or app startup.",
    ],
    whenNotToUse: [
      "Do not copy web-only assumptions into mobile screens.",
      "Do not put native-module calls directly inside presentation components.",
    ],
    recommended: {
      title: "Screen delegates behavior",
      code: `export function DevicePairingScreen() {
  const pairing = useDevicePairingScreen()

  return <DevicePairingView {...pairing} />
}`,
    },
    avoid: {
      title: "Native calls inside the view",
      code: `export function DevicePairingView() {
  useEffect(() => {
    BleManager.startScan()
  }, [])

  return <Text>Searching...</Text>
}`,
    },
    why:
      "Mobile failures often involve permissions, lifecycle, and device state. Keeping those concerns out of views makes the behavior testable and recoverable.",
    checklist: [
      "Navigation params are typed and owned by the route contract.",
      "Permissions have granted, denied, blocked, and retry states.",
      "Long lists use virtualization and stable item keys.",
      "Platform-specific code is isolated behind a small interface.",
      "Crash reporting and logging include useful non-sensitive context.",
    ],
    related: [
      "feature-development/create-a-feature",
      "code-standards/error-handling",
      "testing/overview",
    ],
  },
  {
    slug: "ui-design-system/component-library",
    title: "Component Library Usage",
    section: "ui-design-system",
    owner: "Design System Team",
    lastUpdated: "2026-04-16",
    tags: ["design-system", "components", "tokens"],
    summary: "Use shared components and tokens before creating custom UI.",
    purpose:
      "Design system standards keep product surfaces consistent and reduce duplicated accessibility work.",
    rule:
      "Use the component library for common controls, tokens for spacing and color, and create new shared components only when at least two product areas need the same contract.",
    whenToUse: [
      "Building buttons, inputs, modals, tabs, menus, lists, or alerts.",
      "Adding product UI that maps to an existing design token.",
      "Proposing a reusable component.",
    ],
    whenNotToUse: [
      "Do not create a shared component for one screen-specific layout.",
      "Do not bypass tokens for one-off colors or spacing.",
    ],
    recommended: {
      title: "Use tokens and shared components",
      code: `<Stack gap="md">
  <Text variant="heading-sm">Payment method</Text>
  <Select value={method} onValueChange={setMethod} options={paymentOptions} />
  <Button onClick={onSave}>Save</Button>
</Stack>`,
    },
    avoid: {
      title: "Invent local UI primitives",
      code: `<div style={{ marginTop: 13, color: "#3152ff" }}>
  <button className="my-special-button">Save</button>
</div>`,
    },
    why:
      "Shared UI contracts make accessibility, visual consistency, and QA coverage cheaper. One-off UI should remain local until reuse is real.",
    checklist: [
      "Existing components were checked before creating new UI.",
      "Spacing, color, typography, and icons use tokens.",
      "New shared components include accessibility states.",
      "Storybook coverage exists for reusable components.",
    ],
    related: [
      "code-standards/components",
      "react/component-composition",
      "feature-development/ui-layer",
    ],
  },
  {
    slug: "state-data/state-management",
    title: "State Management",
    section: "state-data",
    owner: "Application Architecture Lead",
    lastUpdated: "2026-04-20",
    tags: ["state", "server-state", "client-state"],
    summary: "Choose the smallest state owner that can answer the product need.",
    purpose:
      "State standards prevent global stores from becoming a dumping ground for feature details.",
    rule:
      "Keep local UI state local, server data in the server-state library, cross-feature app state in the approved global store, and domain rules in domain functions.",
    whenToUse: [
      "Choosing between local state, server state, and global state.",
      "Adding optimistic updates or cache invalidation.",
      "Reviewing a new store slice.",
    ],
    whenNotToUse: [
      "Do not move state global to avoid prop drilling across one component boundary.",
      "Do not store raw API DTOs in global state.",
    ],
    recommended: {
      title: "Pick state by ownership",
      code: `const stateOwner = {
  local: "open modal, selected tab, draft input",
  server: "profile query, invoice list, cache status",
  global: "session, feature flags, app shell preferences",
  domain: "pricing rule, permission decision, validation",
}`,
    },
    avoid: {
      title: "Put every state in one store",
      code: `const useAppStore = create((set) => ({
  isModalOpen: false,
  profileResponse: null,
  invoiceFormDraft: {},
  selectedInvoiceRow: null,
  permissionError: null,
}))`,
    },
    why:
      "State bugs become harder when ownership is unclear. Smaller owners make behavior easier to test and reset.",
    checklist: [
      "The selected state owner matches the state lifetime.",
      "Server state is cached and invalidated intentionally.",
      "Global state stores domain meaning, not view implementation.",
      "Optimistic updates include rollback behavior.",
    ],
    related: [
      "code-standards/hooks",
      "state-data/api-layer",
      "feature-development/create-a-feature",
    ],
  },
  {
    slug: "state-data/api-layer",
    title: "API Layer",
    section: "state-data",
    owner: "Application Architecture Lead",
    lastUpdated: "2026-04-20",
    tags: ["api", "dto", "mappers"],
    summary: "The API layer owns transport details and converts data into app models.",
    purpose:
      "API standards keep backend contracts from leaking into UI and domain code.",
    rule:
      "API functions return typed DTOs or mapped results, handle transport errors consistently, and keep HTTP details behind feature or domain data access modules.",
    whenToUse: [
      "Calling REST, GraphQL, native bridge APIs, or backend-for-frontend endpoints.",
      "Adding caching, retries, or optimistic updates.",
      "Mapping backend fields into UI-ready models.",
    ],
    whenNotToUse: [
      "Do not call fetch or API clients directly from a view component.",
      "Do not let backend field names become UI prop names.",
    ],
    recommended: {
      title: "Map at the boundary",
      code: `export async function getProfile(): Promise<Profile> {
  const dto = await http.get<ProfileDto>("/profile")

  return mapProfile(dto)
}`,
    },
    avoid: {
      title: "Return raw response to the screen",
      code: `export async function getProfile() {
  return fetch("/profile").then((response) => response.json())
}`,
    },
    why:
      "A clean API boundary lets backend contracts evolve without forcing UI rewrites. It also gives tests one place to verify mapping behavior.",
    checklist: [
      "API calls are typed at input and output.",
      "DTOs are mapped before reaching UI components.",
      "Transport errors are converted to app errors.",
      "Retries and cache invalidation are intentional.",
    ],
    related: [
      "code-standards/typescript",
      "code-standards/error-handling",
      "state-data/state-management",
    ],
  },
  {
    slug: "state-data/dtos-and-mappers",
    title: "DTOs And Mappers",
    section: "state-data",
    owner: "Application Architecture Lead",
    lastUpdated: "2026-04-18",
    tags: ["dto", "mappers", "domain-models"],
    summary: "Map external data into models before product logic uses it.",
    purpose:
      "DTO and mapper standards contain external naming, nullability, and version differences.",
    rule:
      "Keep DTO types close to the API that receives them, map into domain or view models immediately, and test mappers when they contain business meaning.",
    whenToUse: [
      "Backend fields differ from UI or domain language.",
      "A response contains nullable or optional values.",
      "A mobile API returns platform-specific shapes.",
    ],
    whenNotToUse: [
      "Do not add a mapper that only renames id to id.",
      "Do not hide business rules in a mapper without tests.",
    ],
    recommended: {
      title: "Normalize external data",
      code: `export function mapInvoice(dto: InvoiceDto): Invoice {
  return {
    id: dto.id,
    number: dto.invoice_number,
    totalCents: dto.total_cents ?? 0,
    isOverdue: dto.status === "overdue",
  }
}`,
    },
    avoid: {
      title: "Use DTO fields in UI",
      code: `<InvoiceRow
  number={invoice.invoice_number}
  total={invoice.total_cents}
  overdue={invoice.status === "overdue"}
/>`,
    },
    why:
      "External data often has transport naming and missing values. Mapping once protects the rest of the app from repeated defensive code.",
    checklist: [
      "DTO type stays near its API module.",
      "Mapper output uses app language.",
      "Null and optional fields are handled deliberately.",
      "Mapper tests cover business-relevant transformations.",
    ],
    related: [
      "state-data/api-layer",
      "code-standards/typescript",
      "testing/overview",
    ],
  },
  {
    slug: "testing/overview",
    title: "Testing Strategy",
    section: "testing",
    owner: "QA Lead",
    lastUpdated: "2026-04-21",
    tags: ["testing", "quality", "review"],
    summary: "Test behavior at the cheapest layer that gives confidence.",
    purpose:
      "Testing standards make quality expectations explicit before a reviewer has to ask for coverage.",
    rule:
      "Use unit tests for pure logic, component tests for UI states, integration tests for feature flows, and E2E tests for critical paths that must work across the app.",
    whenToUse: [
      "Opening a PR that changes behavior.",
      "Adding a mapper, validation rule, permission decision, or async flow.",
      "Fixing a bug that should not regress.",
    ],
    whenNotToUse: [
      "Do not snapshot large rendered trees as the primary assertion.",
      "Do not test implementation details that users cannot observe.",
    ],
    recommended: {
      title: "Test user-visible behavior",
      code: `it("shows a retry action when loading the profile fails", async () => {
  server.use(profileErrorHandler)

  render(<ProfileScreen />)

  expect(await screen.findByRole("button", { name: /retry/i })).toBeVisible()
})`,
    },
    avoid: {
      title: "Test private implementation details",
      code: `it("sets isLoading to false", () => {
  const state = useProfileStore.getState()

  expect(state.isLoading).toBe(false)
})`,
    },
    why:
      "Tests should protect behavior people rely on. Implementation-detail tests fail during harmless refactors and miss real regressions.",
    checklist: [
      "Main success path is covered.",
      "At least one failure or edge path is covered.",
      "Tests assert behavior, not private internals.",
      "Mocks match the boundary being tested.",
      "Bug fixes include regression coverage.",
    ],
    related: [
      "feature-development/create-a-feature",
      "pr-guide/pull-request-checklist",
      "state-data/dtos-and-mappers",
    ],
  },
  {
    slug: "pr-guide/pull-request-checklist",
    title: "Pull Request Checklist",
    section: "pr-guide",
    owner: "Engineering Manager",
    lastUpdated: "2026-04-22",
    tags: ["pull-request", "checklist", "definition-of-done"],
    summary: "Open PRs that are small, explained, tested, and tied to standards.",
    purpose:
      "The PR checklist turns the documentation into the practical definition of done.",
    rule:
      "Every PR should state what changed, why it changed, how it was tested, and which standards are relevant. Keep PRs small enough for reviewers to reason about the behavior in one sitting.",
    whenToUse: [
      "Before opening a pull request.",
      "Before requesting re-review after changes.",
      "When deciding whether a change needs architecture review.",
    ],
    whenNotToUse: [
      "Do not use the checklist to block emergency fixes before mitigation.",
      "Do not hide unrelated cleanup inside a feature PR.",
    ],
    recommended: {
      title: "PR description shape",
      code: `## What changed
Added profile loading, empty, and error states.

## Why
The profile screen now supports the new account API.

## Standards checked
- Feature folder structure
- API layer
- Testing strategy

## Verification
- npm test
- Manual retry flow on web and iOS`,
    },
    avoid: {
      title: "Low-signal PR description",
      code: `## What changed
Stuff

## Testing
Looks good locally`,
    },
    why:
      "A good PR description lets reviewers spend energy on correctness instead of reconstructing intent.",
    checklist: [
      "PR has one primary purpose.",
      "Relevant standards are linked.",
      "Screens include loading, error, and empty states where applicable.",
      "Tests or a clear test rationale are included.",
      "Architecture-impacting choices are documented.",
    ],
    related: [
      "pr-guide/reviewer-checklist",
      "testing/overview",
      "feature-development/create-a-feature",
    ],
  },
  {
    slug: "pr-guide/reviewer-checklist",
    title: "Reviewer Checklist",
    section: "pr-guide",
    owner: "Engineering Manager",
    lastUpdated: "2026-04-22",
    tags: ["review", "checklist", "quality"],
    summary: "Review behavior, boundaries, maintainability, and tests using shared criteria.",
    purpose:
      "Reviewer standards make feedback consistent and reduce personal preference debates.",
    rule:
      "Reviewers should anchor comments in user behavior, architecture boundaries, code standards, test confidence, and maintainability. Link docs for repeated patterns.",
    whenToUse: [
      "Reviewing feature PRs.",
      "Giving repeated feedback that should become a standard.",
      "Deciding whether to request changes or leave a suggestion.",
    ],
    whenNotToUse: [
      "Do not block a PR on undocumented style preference.",
      "Do not request large rewrites without explaining the risk.",
    ],
    recommended: {
      title: "Actionable review comment",
      code: `This screen calls the API from the view, which makes loading and retry behavior hard to test.
Please move the API call into an orchestration hook and pass view-ready props.
Related standard: /docs/feature-development/ui-layer`,
    },
    avoid: {
      title: "Preference without standard",
      code: `I would not do it this way.
Can you restructure this?`,
    },
    why:
      "Actionable feedback helps authors improve the code and learn the standard at the same time.",
    checklist: [
      "The PR purpose is clear and appropriately small.",
      "Architecture boundaries are respected.",
      "Naming and types communicate intent.",
      "Errors, loading, and empty states are handled.",
      "Tests cover meaningful behavior.",
      "Repeated feedback is linked to documentation or proposed as a doc update.",
    ],
    related: [
      "pr-guide/pull-request-checklist",
      "getting-started/introduction",
      "testing/overview",
    ],
  },
  {
    slug: "recipes/index",
    title: "Recipes Index",
    section: "recipes",
    owner: "Developer Experience",
    lastUpdated: "2026-04-19",
    tags: ["recipes", "examples", "copy-paste"],
    summary: "Use recipes for the common jobs developers repeat every week.",
    purpose:
      "Recipes provide practical starting points that already follow the standards.",
    rule:
      "Start from the closest recipe when building common flows. Adapt names and domain details, but preserve the architectural boundary unless the feature owner approves a different pattern.",
    whenToUse: [
      "Creating a screen, form, reusable component, data fetch, modal, navigation entry, analytics event, permission request, or test.",
      "Onboarding a developer with a concrete task.",
      "Reducing repeated PR feedback.",
    ],
    whenNotToUse: [
      "Do not copy a recipe blindly when the feature has a different data or lifecycle model.",
      "Do not treat recipes as a substitute for understanding the relevant standard.",
    ],
    recommended: {
      title: "Recipe workflow",
      code: `const recipeWorkflow = [
  "open the closest recipe",
  "copy the folder and file shape",
  "rename with feature language",
  "run the page checklist",
  "link the recipe in the PR",
]`,
    },
    avoid: {
      title: "Start from memory",
      code: `const improvisedWorkflow = [
  "create files wherever they feel convenient",
  "wait for review comments",
  "retrofit the structure later",
]`,
    },
    why:
      "Recipes lower the cost of following standards. They make the paved path faster than improvising.",
    checklist: [
      "Closest recipe was checked before implementation.",
      "Copied code was renamed into product language.",
      "Relevant standard page was checked.",
      "Recipe gaps were reported or updated.",
    ],
    related: [
      "recipes/create-screen",
      "recipes/create-form",
      "recipes/fetch-data",
    ],
  },
  {
    slug: "recipes/create-screen",
    title: "Recipe: Create A Screen",
    section: "recipes",
    owner: "Developer Experience",
    lastUpdated: "2026-04-19",
    tags: ["recipe", "screen", "feature"],
    summary: "Create a screen with a thin entry point, orchestration hook, and pure view.",
    purpose:
      "This recipe gives a copy-ready starting point for a new feature screen.",
    rule:
      "A screen file should connect routing or navigation to a feature hook and view. It should not contain API calls, mapping logic, or complex rendering branches.",
    whenToUse: [
      "Adding a web page, mobile screen, or nested feature route.",
      "Splitting a large screen into orchestration and presentation.",
      "Creating a screen that needs loading, error, and empty states.",
    ],
    whenNotToUse: [
      "Do not split a static two-line component for ceremony.",
      "Do not put shared UI components inside the screen folder by default.",
    ],
    recommended: {
      title: "Screen shell",
      code: `export function AccountScreen() {
  const account = useAccountScreen()

  return <AccountView {...account} />
}`,
    },
    avoid: {
      title: "Screen owns everything",
      code: `export function AccountScreen() {
  const [account, setAccount] = useState<AccountDto | null>(null)

  useEffect(() => {
    accountApi.getAccount().then(setAccount)
  }, [])

  return <AccountDetails account={account} />
}`,
    },
    why:
      "A thin screen gives reviewers one place to inspect behavior and one place to inspect rendering.",
    checklist: [
      "Screen delegates behavior to a hook.",
      "View receives explicit props.",
      "Loading, error, empty, and success states are visible.",
      "Tests cover the screen behavior.",
    ],
    related: [
      "feature-development/create-a-feature",
      "feature-development/ui-layer",
      "code-standards/hooks",
    ],
  },
  {
    slug: "recipes/create-form",
    title: "Recipe: Create A Form",
    section: "recipes",
    owner: "Developer Experience",
    lastUpdated: "2026-04-19",
    tags: ["recipe", "forms", "validation"],
    summary: "Forms should keep validation explicit and submission behavior recoverable.",
    purpose:
      "This recipe standardizes how teams structure form state, validation, errors, and submit behavior.",
    rule:
      "A form should define typed values, validation rules, submit states, field-level errors, and a retry-safe submit path.",
    whenToUse: [
      "Creating a form with validation or async submission.",
      "Handling server-side validation errors.",
      "Adding React Native forms with keyboard and accessibility concerns.",
    ],
    whenNotToUse: [
      "Do not introduce a form library for a single uncontrolled search input.",
      "Do not hide validation rules in UI copy only.",
    ],
    recommended: {
      title: "Typed submit contract",
      code: `type ProfileFormValues = {
  displayName: string
  email: string
}

async function submitProfile(values: ProfileFormValues) {
  const result = validateProfile(values)
  if (!result.ok) return result

  return updateProfile(values)
}`,
    },
    avoid: {
      title: "Unstructured submit path",
      code: `async function onSubmit(event: any) {
  event.preventDefault()
  await api.save(event.target)
  alert("saved")
}`,
    },
    why:
      "Forms are a common source of regressions because validation, error handling, and async state interact. Typed contracts make that interaction reviewable.",
    checklist: [
      "Form values are typed.",
      "Client and server validation errors have display states.",
      "Submit button handles pending and retry states.",
      "Keyboard and accessibility behavior is verified.",
      "Tests cover valid submit and validation failure.",
    ],
    related: [
      "code-standards/typescript",
      "code-standards/error-handling",
      "testing/overview",
    ],
  },
  {
    slug: "recipes/fetch-data",
    title: "Recipe: Fetch Data",
    section: "recipes",
    owner: "Developer Experience",
    lastUpdated: "2026-04-19",
    tags: ["recipe", "api", "server-state"],
    summary: "Fetch through a typed API boundary and expose view-ready state.",
    purpose:
      "This recipe provides the default path for loading data without leaking transport details into UI.",
    rule:
      "Fetch data through an API module, map the response, expose server-state through a hook, and render loading, error, empty, and success states.",
    whenToUse: [
      "Loading data for a feature screen.",
      "Adding retries or cache invalidation.",
      "Replacing a direct fetch from a component.",
    ],
    whenNotToUse: [
      "Do not use server-state machinery for static constants.",
      "Do not fetch from views that should stay pure.",
    ],
    recommended: {
      title: "Data loading flow",
      code: `export function useInvoicesScreen() {
  const invoices = useInvoicesQuery()

  return {
    invoices: invoices.data ?? [],
    isLoading: invoices.isLoading,
    error: invoices.error,
    onRetry: invoices.refetch,
  }
}`,
    },
    avoid: {
      title: "Fetch directly in a view",
      code: `export function InvoicesView() {
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    fetch("/api/invoices")
      .then((response) => response.json())
      .then(setInvoices)
  }, [])

  return <InvoiceTable invoices={invoices} />
}`,
    },
    why:
      "A standard data flow gives each feature the same failure language and makes cache behavior easier to reason about.",
    checklist: [
      "API module owns transport details.",
      "Mapper converts DTOs before UI.",
      "Hook returns view-ready state.",
      "View renders loading, error, empty, and success states.",
      "Tests cover success and failure.",
    ],
    related: [
      "state-data/api-layer",
      "state-data/state-management",
      "feature-development/ui-layer",
    ],
  },
  {
    slug: "decisions/adr-001-feature-architecture",
    title: "ADR 001: Feature Architecture",
    section: "decisions",
    owner: "Architecture Council",
    lastUpdated: "2026-04-14",
    tags: ["adr", "architecture", "feature-folders"],
    summary: "We use feature-first architecture because review and ownership follow product capabilities.",
    purpose:
      "This decision record explains why the company standard favors feature folders over file-type folders.",
    rule:
      "Product behavior belongs in feature folders. Shared code must be stable, domain-neutral, and intentionally promoted.",
    whenToUse: [
      "Debating whether new code belongs in modules, domains, presentation, or shared.",
      "Reviewing a PR that introduces broad shared helpers.",
      "Onboarding developers from codebases organized by file type.",
    ],
    whenNotToUse: [
      "Do not use this ADR to force unnecessary folders into tiny changes.",
      "Do not treat the current structure as permanent when evidence shows a better boundary.",
    ],
    recommended: {
      title: "Decision summary",
      code: `decision: "Use feature-first modules"
because:
  - ownership follows product behavior
  - review boundaries stay small
  - shared code is promoted intentionally
tradeoffs:
  - some duplication is acceptable before abstraction
  - feature names need active stewardship`,
    },
    avoid: {
      title: "Premature shared abstractions",
      code: `shared/
  api/
  hooks/
  models/
  screens/
  everything-else/`,
    },
    why:
      "The company optimizes for maintainable product delivery. Feature-first architecture gives teams a clear place to work and reviewers a clear boundary to evaluate.",
    checklist: [
      "Feature code has a clear product owner.",
      "Shared promotion has at least two stable consumers.",
      "Duplication is tolerated until the abstraction is obvious.",
      "Architecture changes update this ADR or add a new one.",
    ],
    related: [
      "architecture/overview",
      "architecture/project-structure",
      "feature-development/folder-structure",
    ],
  },
];

const sectionTitleById = new Map(docSections.map((section) => [section.id, section.title]));
const sectionOwnerById = new Map(docSections.map((section) => [section.id, section.owner]));

export function getSectionTitle(sectionId: string) {
  return sectionTitleById.get(sectionId) ?? sectionId;
}

export function getSectionOwner(sectionId: string) {
  return sectionOwnerById.get(sectionId) ?? "Unassigned";
}

export function getDocBySlug(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}

export function getDocsBySection(sectionId: string) {
  return docs.filter((doc) => doc.section === sectionId);
}

export function getRelatedDocs(doc: DocPage) {
  return doc.related
    .map((slug) => getDocBySlug(slug))
    .filter((relatedDoc): relatedDoc is DocPage => Boolean(relatedDoc));
}

export function getNeighborDocs(slug: string) {
  const index = docs.findIndex((doc) => doc.slug === slug);

  return {
    previous: index > 0 ? docs[index - 1] : null,
    next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : null,
  };
}

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
  { label: "Understand architecture", href: "/docs/architecture/project-structure" },
  { label: "Add tests", href: "/docs/testing/overview" },
  { label: "Create a component", href: "/docs/code-standards/components" },
  { label: "Fetch data", href: "/docs/recipes/fetch-data" },
];

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
