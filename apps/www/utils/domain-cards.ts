import {
  BotIcon,
  ChartLineIcon,
  CodeIcon,
  DollarSignIcon,
  FingerprintIcon,
  Layers2Icon,
  MonitorIcon,
  SparklesIcon,
  MailIcon,
} from "lucide-react";

export const domainCards = [
  {
    title: "Typescript & Javascript Support",
    description: "Comprehensive support for Typescript and Javascript both.",
    icon: CodeIcon,
    tags: ["Typescript", "Javascript"],
  },
  {
    title: "Authentication & User Management",
    description: "Authentication and user management tools to help you get started with your application.",
    icon: FingerprintIcon,
    tags: ["Clerk"],
  },
  {
    title: "Analytics & Reporting",
    description: "Analytics and reporting tools to track user engagement, revenue metrics, and product usage.",
    icon: ChartLineIcon,
    tags: ["Mixpanel", "Google Analytics"],
  },
  {
    title: "Monitoring & Error Tracking",
    description: "Monitoring and error tracking tools to help you catch and fix issues quickly.",
    icon: MonitorIcon,
    tags: ["Sentry"],
  },
  {
    title: "Service Layer",
    description: "A service layer is included to help you get started with your API.",
    icon: Layers2Icon,
    tags: ["Axios", "React Query"],
  },
  {
    title: "Git Hooks & Automation",
    description: "Git hooks and automation to help you get started with your project.",
    icon: BotIcon,
    tags: ["Husky", "Commit Lint"],
  },
  {
    title: "Formatter and Linter",
    description: "Formatter and linter to help you get started with your project.",
    icon: SparklesIcon,
    tags: ["Prettier", "Biome"],
  },
  {
    title: "Subscription & Billing",
    description: "Integrated payment processing with Stripe, subscription management, and usage-based billing.",
    icon: DollarSignIcon,
    tags: ["Stripe"],
  },
  {
    title: "Email System",
    description: "Transactional email templates, newsletter management, and email verification workflows.",
    icon: MailIcon,
    tags: ["loops"],
  },
];
