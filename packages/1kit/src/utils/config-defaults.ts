import { z } from "zod"

import { TSFileManager } from "./file-manager"

// Project configuration enums
export const ProjectType = {
  NEXT: "next",
  VITE: "vite",
} as const

export const AuthProvider = {
  CLERK: "clerk",
  NEXT_AUTH: "next-auth",
  NONE: "none",
} as const

export const AnalyticsProvider = {
  MIXPANEL: "mixpanel",
  GOOGLE_ANALYTICS: "google-analytics",
  NONE: "none",
} as const

// Config schema
export const oneKitConfigSchema = z.object({
  projectName: z.string(),
  framework: z.object({
    name: z.enum([ProjectType.NEXT, ProjectType.VITE]),
    typescript: z.boolean(),
    eslint: z.boolean(),
    tailwind: z.boolean(),
    app: z.boolean(),
    importAlias: z.string(),
    turbopack: z.boolean(),
  }),
  auth: z.enum([AuthProvider.CLERK, AuthProvider.NEXT_AUTH, AuthProvider.NONE]),
  analytics: z.enum([
    AnalyticsProvider.MIXPANEL,
    AnalyticsProvider.GOOGLE_ANALYTICS,
    AnalyticsProvider.NONE,
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
    eslint: true,
    tailwind: true,
    app: true,
    importAlias: "@/*",
    turbopack: true,
  },
  auth: AuthProvider.CLERK,
  analytics: AnalyticsProvider.MIXPANEL,
}
