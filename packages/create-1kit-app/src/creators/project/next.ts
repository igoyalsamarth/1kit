import { execSync } from "child_process"

import { LintFormatProvider, OneKitConfig } from "../../utils/config-defaults"

type PackageManager = "yarn" | "pnpm" | "bun" | "npm"

interface NextJSOptions {
  typescript: boolean
  eslint: (typeof LintFormatProvider)[keyof typeof LintFormatProvider]
  tailwind: boolean
  app: boolean
  srcDir: boolean
  importAlias: string
  turbopack: boolean
  packageManager: PackageManager
}

export async function createNextApp(
  config: OneKitConfig,
  packageManager: PackageManager = "npm"
) {
  const {
    projectName,
    framework: { typescript, eslint, tailwind, app, importAlias, turbopack },
  } = config

  const options: NextJSOptions = {
    typescript,
    eslint,
    tailwind,
    app,
    srcDir: false,
    importAlias: importAlias || "@/*",
    turbopack,
    packageManager,
  }

  const flags = [
    options.typescript ? "--typescript" : "--no-typescript",
    // Handle linting options
    options.eslint === LintFormatProvider.ESLINT_PRETTIER ||
    options.eslint === LintFormatProvider.ESLINT
      ? "--eslint"
      : "",
    options.eslint === LintFormatProvider.BIOME ? "--biome" : "",
    options.eslint === LintFormatProvider.NONE ? "--no-linter" : "",
    options.srcDir ? "--src-dir" : "--no-src-dir",
    options.app ? "--app" : "--pages",
    options.tailwind ? "--tailwind" : "--no-tailwind",
    options.turbopack ? "--turbopack" : "",
    `--import-alias "${options.importAlias}"`,
    `--use-${options.packageManager}`,
    "--no-git",
    "--no-prompt",
    "--skip-install",
  ].filter(Boolean)

  const baseCommand =
    packageManager === "npm"
      ? "npx"
      : packageManager === "pnpm"
        ? "pnpm dlx"
        : packageManager === "yarn"
          ? "yarn create"
          : packageManager === "bun"
            ? "bunx"
            : "npx"

  const fullCommand = [
    baseCommand,
    "create-next-app@latest",
    projectName,
    ...flags,
  ].join(" ")

  try {
    execSync(fullCommand, { stdio: "inherit" })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to create Next.js project: ${errorMessage}`)
  }
}
