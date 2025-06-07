import prompts from "prompts"

import {
  AuthProvider,
  defaultConfig,
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
          { title: "Vite", value: ProjectType.VITE },
        ],
        initial: 0,
      },
      {
        type: "toggle",
        name: "typescript",
        message: "Would you like to use TypeScript?",
        initial: defaultConfig.framework.typescript,
        active: "yes",
        inactive: "no",
      },
      {
        type: "toggle",
        name: "eslint",
        message: "Would you like to use ESLint?",
        initial: defaultConfig.framework.eslint,
        active: "yes",
        inactive: "no",
      },
      {
        type: "toggle",
        name: "tailwind",
        message: "Would you like to use Tailwind CSS?",
        initial: defaultConfig.framework.tailwind,
        active: "yes",
        inactive: "no",
      },
      {
        type: "toggle",
        name: "app",
        message: "Would you like to use App Router?",
        initial: defaultConfig.framework.app,
        active: "yes",
        inactive: "no",
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
        choices: [
          { title: "Clerk", value: AuthProvider.CLERK },
          { title: "NextAuth.js", value: AuthProvider.NEXT_AUTH },
          { title: "None", value: AuthProvider.NONE },
        ],
        initial: 0,
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
  }

  return config
}
