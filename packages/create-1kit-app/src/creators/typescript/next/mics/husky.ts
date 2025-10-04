import { execSync } from "child_process"
import path from "node:path"
import fs from "fs-extra"

import { PackageConfig } from "../../../../types"
import { OneKitConfig } from "../../../../utils/config-defaults"
import { logger } from "../../../../utils/logger"
import { writePackages } from "../../../../utils/package-manager"

function getHuskyInitCommand(packageManager: string): string | null {
  switch (packageManager) {
    case "npm":
      return "npx husky init"
    case "pnpm":
      return "pnpm exec husky init"
    case "bun":
      return "bunx husky init"
    case "yarn":
      return null // Not supported
    default:
      return null
  }
}

export async function setupHusky(
  config: OneKitConfig,
  packageManager: string,
  withCommitLint: boolean
) {
  const { fileManager, projectName } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // For yarn, log that it's not supported and skip
  if (packageManager === "yarn") {
    logger.warn(
      "Husky setup with yarn is not supported - skipping husky initialization"
    )
    return true
  }

  // Install Husky package and optionally commitlint packages
  const packages: PackageConfig[] = [
    {
      name: "husky",
      version: "^9.1.7",
    },
  ]

  if (withCommitLint) {
    packages.push(
      {
        name: "@commitlint/cli",
        version: "^19.8.1",
      },
      {
        name: "@commitlint/config-conventional",
        version: "^19.8.1",
      }
    )
  }

  await writePackages(projectName, packages)

  // Get the appropriate init command for the package manager
  const initCommand = getHuskyInitCommand(packageManager)
  if (!initCommand) {
    logger.warn(
      `Unsupported package manager ${packageManager} - skipping husky initialization`
    )
    return true
  }

  // Run husky init command
  logger.log("Initializing husky...")
  try {
    const projectRoot = path.resolve(process.cwd(), projectName)
    execSync(initCommand, {
      stdio: "inherit",
      cwd: projectRoot,
    })

    // Setup commitlint if enabled
    if (withCommitLint) {
      logger.log("Setting up commitlint...")

      // Create .commitlintrc.json
      const commitlintConfig = {
        extends: ["@commitlint/config-conventional"],
      }
      const commitlintrcPath = path.join(projectRoot, ".commitlintrc.json")
      await fs.writeFile(
        commitlintrcPath,
        JSON.stringify(commitlintConfig, null, 2) + "\n"
      )

      // Create commit-msg hook
      const commitMsgCommand =
        packageManager === "npm"
          ? "npx"
          : packageManager === "pnpm"
            ? "pnpm exec"
            : packageManager === "bun"
              ? "bunx"
              : null

      if (commitMsgCommand) {
        const hookContent = `#!/usr/bin/env sh\n${commitMsgCommand} commitlint --edit \${1}\n`
        const hookPath = path.join(projectRoot, ".husky", "commit-msg")
        await fs.writeFile(hookPath, hookContent)
        // Make the hook executable
        execSync(`chmod +x ${hookPath}`)
      }
    }

    return true
  } catch (error) {
    logger.error(
      `Failed to initialize husky: ${error instanceof Error ? error.message : String(error)}`
    )
    return false
  }
}
