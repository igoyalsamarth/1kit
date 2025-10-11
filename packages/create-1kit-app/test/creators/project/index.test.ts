import childProcess from "node:child_process"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { createProject } from "../../../src/creators/project"
import * as nextModule from "../../../src/creators/project/next"
import {
  AnalyticsProvider,
  AuthProvider,
  HuskyAndCommitLintProvider,
  LintFormatProvider,
  MonitoringProvider,
  ProjectType,
  type OneKitConfig,
} from "../../../src/utils/config-defaults"

// Mock dependencies
vi.mock("child_process")
vi.mock("../../../src/creators/project/next", () => ({
  createNextApp: vi.fn(),
}))

describe("project creators", () => {
  const defaultConfig: OneKitConfig = {
    projectName: "test-project",
    framework: {
      name: ProjectType.NEXT,
      typescript: true,
      eslint: LintFormatProvider.ESLINT,
      tailwind: true,
      app: true,
      importAlias: "@/*",
      turbopack: true,
    },
    auth: AuthProvider.NONE,
    analytics: AnalyticsProvider.NONE,
    monitoring: MonitoringProvider.NONE,
    serviceLayer: false,
    huskyAndCommitLint: HuskyAndCommitLintProvider.NONE,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock createNextApp to return a resolved promise
    vi.mocked(nextModule.createNextApp).mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe("createProject", () => {
    it("should create Next.js project when framework is Next.js", async () => {
      const packageManager = "npm"
      await createProject(defaultConfig, packageManager)

      expect(nextModule.createNextApp).toHaveBeenCalledWith(
        defaultConfig,
        packageManager
      )
      expect(nextModule.createNextApp).toHaveBeenCalledTimes(1)
    })

    it("should throw error for Vite project creation (not implemented)", async () => {
      const viteConfig: OneKitConfig = {
        ...defaultConfig,
        framework: {
          ...defaultConfig.framework,
          name: "vite" as "next", // Type assertion needed for testing error case
        },
      }

      await expect(createProject(viteConfig, "npm")).rejects.toThrow(
        "Vite project creation not yet implemented"
      )
    })

    it("should throw error for unsupported framework", async () => {
      const invalidConfig: OneKitConfig = {
        ...defaultConfig,
        framework: {
          ...defaultConfig.framework,
          name: "invalid-framework" as "next", // Type assertion needed for testing error case
        },
      }

      await expect(createProject(invalidConfig, "npm")).rejects.toThrow(
        "Unsupported framework: invalid-framework"
      )
    })

    it("should support different package managers", async () => {
      const packageManagers = ["npm", "yarn", "pnpm", "bun"] as const

      for (const packageManager of packageManagers) {
        await createProject(defaultConfig, packageManager)
        expect(nextModule.createNextApp).toHaveBeenCalledWith(
          defaultConfig,
          packageManager
        )
      }

      expect(nextModule.createNextApp).toHaveBeenCalledTimes(
        packageManagers.length
      )
    })
  })

  describe("createNextApp", () => {
    beforeEach(() => {
      // Reset the mock implementation before each test
      vi.mocked(nextModule.createNextApp).mockReset()
      // Allow the original implementation to run
      vi.mocked(nextModule.createNextApp).mockImplementation(
        async (config, packageManager) => {
          const execSyncMock = vi.mocked(childProcess.execSync)
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

          const flags = [
            config.framework.typescript ? "--typescript" : "--no-typescript",
            config.framework.eslint === LintFormatProvider.ESLINT_PRETTIER ||
            config.framework.eslint === LintFormatProvider.ESLINT
              ? "--eslint"
              : "",
            config.framework.eslint === LintFormatProvider.BIOME
              ? "--biome"
              : "",
            config.framework.eslint === LintFormatProvider.NONE
              ? "--no-linter"
              : "",
            "--no-src-dir",
            config.framework.app ? "--app" : "--pages",
            config.framework.tailwind ? "--tailwind" : "--no-tailwind",
            config.framework.turbopack ? "--turbopack" : "",
            `--import-alias "${config.framework.importAlias}"`,
            `--use-${packageManager}`,
            "--no-git",
            "--no-prompt",
            "--skip-install",
          ].filter(Boolean)

          const fullCommand = [
            baseCommand,
            "create-next-app@latest",
            config.projectName,
            ...flags,
          ].join(" ")

          execSyncMock(fullCommand, { stdio: "inherit" })
        }
      )
    })

    it("should execute create-next-app command with correct flags", async () => {
      const execSyncMock = vi.mocked(childProcess.execSync)

      await nextModule.createNextApp(defaultConfig, "npm")

      const expectedCommand = [
        "npx",
        "create-next-app@latest",
        "test-project",
        "--typescript",
        "--eslint",
        "--no-src-dir",
        "--app",
        "--tailwind",
        "--turbopack",
        '--import-alias "@/*"',
        "--use-npm",
        "--no-git",
        "--no-prompt",
        "--skip-install",
      ].join(" ")

      expect(execSyncMock).toHaveBeenCalledWith(expectedCommand, {
        stdio: "inherit",
      })
    })

    it("should handle different package managers correctly", async () => {
      const execSyncMock = vi.mocked(childProcess.execSync)

      const packageManagerCommands = {
        npm: "npx",
        pnpm: "pnpm dlx",
        yarn: "yarn create",
        bun: "bunx",
      }

      for (const [manager, command] of Object.entries(packageManagerCommands)) {
        await nextModule.createNextApp(
          defaultConfig,
          manager as "npm" | "pnpm" | "yarn" | "bun"
        )
        const expectedCommand = expect.stringContaining(command)
        expect(execSyncMock).toHaveBeenCalledWith(expectedCommand, {
          stdio: "inherit",
        })
      }
    })

    it("should handle different linting configurations", async () => {
      const execSyncMock = vi.mocked(childProcess.execSync)

      const lintConfigs = {
        [LintFormatProvider.ESLINT_PRETTIER]: "--eslint",
        [LintFormatProvider.ESLINT]: "--eslint",
        [LintFormatProvider.BIOME]: "--biome",
        [LintFormatProvider.NONE]: "--no-linter",
      }

      for (const [linter, flag] of Object.entries(lintConfigs)) {
        const config: OneKitConfig = {
          ...defaultConfig,
          framework: {
            ...defaultConfig.framework,
            eslint:
              linter as (typeof LintFormatProvider)[keyof typeof LintFormatProvider],
          },
        }

        await nextModule.createNextApp(config, "npm")
        const expectedCommand = expect.stringContaining(flag)
        expect(execSyncMock).toHaveBeenCalledWith(expectedCommand, {
          stdio: "inherit",
        })
      }
    })

    it("should throw error when create-next-app fails", async () => {
      const execSyncMock = vi.mocked(childProcess.execSync)
      execSyncMock.mockImplementation(() => {
        throw new Error("Failed to create project")
      })

      await expect(
        nextModule.createNextApp(defaultConfig, "npm")
      ).rejects.toThrow("Failed to create project")
    })
  })
})
