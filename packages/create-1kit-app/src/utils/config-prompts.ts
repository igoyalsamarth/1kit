import prompts from "prompts"

import {
  AnalyticsProvider,
  AuthProvider,
  defaultConfig,
  LintFormatProvider,
  MonitoringProvider,
  OneKitConfig,
  ProjectType,
} from "./config-defaults"

export async function promptForConfig(): Promise<OneKitConfig> {
  const response = await prompts(
    [
      {
        type: "text",
        name: "projectName",
        message: "What is your project name?",
        initial: defaultConfig.projectName,
      },
      {
        type: "select",
        name: "frameworkName",
        message: "Which framework would you like to use?",
        choices: [
          { title: "Next.js", value: ProjectType.NEXT },
          // { title: "Vite", value: ProjectType.VITE },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "typescript",
        message: "Would you like to use TypeScript?",
        choices: [
          { title: "Yes", value: true },
          { title: "No", value: false, disabled: true },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "eslint",
        message: "Would you like to use for Linting and Formatting?",
        choices: [
          { title: "ESLint", value: LintFormatProvider.ESLINT },
          {
            title: "ESLint + Prettier",
            value: LintFormatProvider.ESLINT_PRETTIER,
          },
          { title: "Biome", value: LintFormatProvider.BIOME },
          { title: "None", value: LintFormatProvider.NONE },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "tailwind",
        message: "Would you like to use Tailwind CSS?",
        choices: [
          { title: "Yes", value: true },
          { title: "No", value: false, disabled: true },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "app",
        message: "Would you like to use App Router?",
        choices: [
          { title: "Yes", value: true },
          { title: "No", value: false, disabled: true },
        ],
        initial: 0,
      },
      {
        type: "toggle",
        name: "turbopack",
        message: "Would you like to use Turbopack?",
        initial: defaultConfig.framework.turbopack,
        active: "yes",
        inactive: "no",
      },
      {
        type: "text",
        name: "importAlias",
        message: "What import alias would you like to use?",
        initial: defaultConfig.framework.importAlias,
      },
      {
        type: "select",
        name: "auth",
        message: "Which authentication provider would you like to use?",
        choices: (values) => {
          if (values.frameworkName === ProjectType.NEXT) {
            return [
              { title: "Clerk", value: AuthProvider.CLERK },
              // { title: "NextAuth.js", value: AuthProvider.NEXT_AUTH },
              { title: "None", value: AuthProvider.NONE },
            ]
          } else {
            return [
              { title: "Clerk", value: AuthProvider.CLERK },
              { title: "None", value: AuthProvider.NONE },
            ]
          }
        },
        initial: 0,
      },
      {
        type: "select",
        name: "analytics",
        message: "Which analytics provider would you like to use?",
        choices: [
          { title: "Mixpanel", value: AnalyticsProvider.MIXPANEL },
          {
            title: "Google Analytics",
            value: AnalyticsProvider.GOOGLE_ANALYTICS,
          },
          { title: "None", value: AnalyticsProvider.NONE },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "monitoring",
        message: "Which monitoring provider would you like to use?",
        choices: [
          { title: "Sentry", value: MonitoringProvider.SENTRY },
          { title: "None", value: MonitoringProvider.NONE },
        ],
        initial: 0,
      },
      {
        type: "toggle",
        name: "serviceLayer",
        message: "Would you like to use a service layer? (axios + react-query)",
        initial: defaultConfig.serviceLayer,
      },
    ],
    {
      onCancel: () => {
        process.exit(1)
      },
    }
  )

  // Structure the response to match OneKitConfig
  const config: OneKitConfig = {
    projectName: response.projectName ?? defaultConfig.projectName,
    framework: {
      name: response.frameworkName ?? defaultConfig.framework.name,
      typescript: response.typescript ?? defaultConfig.framework.typescript,
      eslint: response.eslint ?? defaultConfig.framework.eslint,
      tailwind: response.tailwind ?? defaultConfig.framework.tailwind,
      app: response.app ?? defaultConfig.framework.app,
      importAlias: response.importAlias ?? defaultConfig.framework.importAlias,
      turbopack: response.turbopack ?? defaultConfig.framework.turbopack,
    },
    auth: response.auth ?? defaultConfig.auth,
    analytics: response.analytics ?? defaultConfig.analytics,
    monitoring: response.monitoring ?? defaultConfig.monitoring,
    serviceLayer: response.serviceLayer ?? defaultConfig.serviceLayer,
  }

  return config
}
