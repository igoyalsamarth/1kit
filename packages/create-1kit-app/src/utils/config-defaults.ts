import { z } from "zod"

import { TSFileManager } from "./file-manager"

// Project configuration enums
export const ProjectType = {
  NEXT: "next",
  // VITE: "vite",
} as const

export const LintFormatProvider = {
  ESLINT: "eslint",
  ESLINT_PRETTIER: "eslint-prettier",
  BIOME: "biome",
  NONE: "none",
} as const

export const AuthProvider = {
  CLERK: "clerk",
  // NEXT_AUTH: "next-auth",
  NONE: "none",
} as const

export const AnalyticsProvider = {
  MIXPANEL: "mixpanel",
  GOOGLE_ANALYTICS: "google-analytics",
  NONE: "none",
} as const

export const MonitoringProvider = {
  SENTRY: "sentry",
  NONE: "none",
} as const

export const HuskyAndCommitLintProvider = {
  HUSKY: "husky",
  HUSKY_COMMIT_LINT: "husky-commit-lint",
  NONE: "none",
} as const

// Config schema
export const oneKitConfigSchema = z.object({
  projectName: z.string(),
  framework: z.object({
    name: z.enum([ProjectType.NEXT]),
    typescript: z.boolean(),
    eslint: z.enum([
      LintFormatProvider.ESLINT,
      LintFormatProvider.ESLINT_PRETTIER,
      LintFormatProvider.BIOME,
      LintFormatProvider.NONE,
    ]),
    tailwind: z.boolean(),
    app: z.boolean(),
    importAlias: z.string(),
    turbopack: z.boolean(),
  }),
  auth: z.enum([AuthProvider.CLERK, AuthProvider.NONE]),
  analytics: z.enum([
    AnalyticsProvider.MIXPANEL,
    AnalyticsProvider.GOOGLE_ANALYTICS,
    AnalyticsProvider.NONE,
  ]),
  monitoring: z.enum([MonitoringProvider.SENTRY, MonitoringProvider.NONE]),
  serviceLayer: z.boolean(),
  huskyAndCommitLint: z.enum([
    HuskyAndCommitLintProvider.HUSKY,
    HuskyAndCommitLintProvider.HUSKY_COMMIT_LINT,
    HuskyAndCommitLintProvider.NONE,
  ]),
})

export type OneKitConfig = z.infer<typeof oneKitConfigSchema> & {
  fileManager?: TSFileManager
}

export const defaultConfig: OneKitConfig = {
  projectName: "my-project",
  framework: {
    name: ProjectType.NEXT,
    typescript: true,
    eslint: LintFormatProvider.ESLINT,
    tailwind: true,
    app: true,
    importAlias: "@/*",
    turbopack: true,
  },
  auth: AuthProvider.CLERK,
  analytics: AnalyticsProvider.MIXPANEL,
  monitoring: MonitoringProvider.SENTRY,
  serviceLayer: true,
  huskyAndCommitLint: HuskyAndCommitLintProvider.HUSKY_COMMIT_LINT,
}
