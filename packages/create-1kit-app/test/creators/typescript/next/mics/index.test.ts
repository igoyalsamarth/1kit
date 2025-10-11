import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { setupMics } from "../../../../../src/creators/typescript/next/mics"
import { setupHusky } from "../../../../../src/creators/typescript/next/mics/husky"
import { setupPrettier } from "../../../../../src/creators/typescript/next/mics/prettier"
import {
  AnalyticsProvider,
  AuthProvider,
  HuskyAndCommitLintProvider,
  LintFormatProvider,
  MonitoringProvider,
  ProjectType,
  type OneKitConfig,
} from "../../../../../src/utils/config-defaults"

// Mock dependencies
vi.mock("../../../../../src/creators/typescript/next/mics/husky")
vi.mock("../../../../../src/creators/typescript/next/mics/prettier")

describe("mics setup", () => {
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
    // Mock successful returns
    vi.mocked(setupHusky).mockResolvedValue(true)
    vi.mocked(setupPrettier).mockResolvedValue(true)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe("setupMics", () => {
    describe("ESLint and Prettier setup", () => {
      it("should set up Prettier when ESLint with Prettier is selected", async () => {
        const config = {
          ...defaultConfig,
          framework: {
            ...defaultConfig.framework,
            eslint: LintFormatProvider.ESLINT_PRETTIER,
          },
        }

        const result = await setupMics(config, "npm")

        expect(result).toBe(true)
        expect(setupPrettier).toHaveBeenCalledWith(config)
        expect(setupPrettier).toHaveBeenCalledTimes(1)
      })

      it("should not set up Prettier when ESLint only is selected", async () => {
        const config = {
          ...defaultConfig,
          framework: {
            ...defaultConfig.framework,
            eslint: LintFormatProvider.ESLINT,
          },
        }

        const result = await setupMics(config, "npm")

        expect(result).toBe(true)
        expect(setupPrettier).not.toHaveBeenCalled()
      })

      it("should not set up Prettier when Biome is selected", async () => {
        const config = {
          ...defaultConfig,
          framework: {
            ...defaultConfig.framework,
            eslint: LintFormatProvider.BIOME,
          },
        }

        const result = await setupMics(config, "npm")

        expect(result).toBe(true)
        expect(setupPrettier).not.toHaveBeenCalled()
      })

      it("should throw error for unsupported linting provider", async () => {
        const config = {
          ...defaultConfig,
          framework: {
            ...defaultConfig.framework,
            eslint:
              "unsupported" as (typeof LintFormatProvider)[keyof typeof LintFormatProvider],
          },
        }

        await expect(setupMics(config, "npm")).rejects.toThrow(
          "Linting provider unsupported not supported"
        )
      })
    })

    describe("Husky setup", () => {
      it("should set up Husky with commitlint when both are selected", async () => {
        const config = {
          ...defaultConfig,
          huskyAndCommitLint: HuskyAndCommitLintProvider.HUSKY_COMMIT_LINT,
        }

        const result = await setupMics(config, "npm")

        expect(result).toBe(true)
        expect(setupHusky).toHaveBeenCalledWith(config, "npm", true)
        expect(setupHusky).toHaveBeenCalledTimes(1)
      })

      it("should set up Husky without commitlint when only Husky is selected", async () => {
        const config = {
          ...defaultConfig,
          huskyAndCommitLint: HuskyAndCommitLintProvider.HUSKY,
        }

        const result = await setupMics(config, "npm")

        expect(result).toBe(true)
        expect(setupHusky).toHaveBeenCalledWith(config, "npm", false)
        expect(setupHusky).toHaveBeenCalledTimes(1)
      })

      it("should not set up Husky when none is selected", async () => {
        const config = {
          ...defaultConfig,
          huskyAndCommitLint: HuskyAndCommitLintProvider.NONE,
        }

        const result = await setupMics(config, "npm")

        expect(result).toBe(true)
        expect(setupHusky).not.toHaveBeenCalled()
      })

      it("should throw error for unsupported Husky provider", async () => {
        const config = {
          ...defaultConfig,
          huskyAndCommitLint:
            "unsupported" as (typeof HuskyAndCommitLintProvider)[keyof typeof HuskyAndCommitLintProvider],
        }

        await expect(setupMics(config, "npm")).rejects.toThrow(
          "Husky and Commit Lint provider unsupported not supported"
        )
      })
    })

    describe("Combined scenarios", () => {
      it("should handle both Prettier and Husky setup success", async () => {
        const config = {
          ...defaultConfig,
          framework: {
            ...defaultConfig.framework,
            eslint: LintFormatProvider.ESLINT_PRETTIER,
          },
          huskyAndCommitLint: HuskyAndCommitLintProvider.HUSKY_COMMIT_LINT,
        }

        const result = await setupMics(config, "npm")

        expect(result).toBe(true)
        expect(setupPrettier).toHaveBeenCalledWith(config)
        expect(setupHusky).toHaveBeenCalledWith(config, "npm", true)
      })

      it("should handle Prettier success but Husky failure", async () => {
        const config = {
          ...defaultConfig,
          framework: {
            ...defaultConfig.framework,
            eslint: LintFormatProvider.ESLINT_PRETTIER,
          },
          huskyAndCommitLint: HuskyAndCommitLintProvider.HUSKY_COMMIT_LINT,
        }

        vi.mocked(setupHusky).mockResolvedValue(false)

        const result = await setupMics(config, "npm")

        expect(result).toBe(false)
        expect(setupPrettier).toHaveBeenCalledWith(config)
        expect(setupHusky).toHaveBeenCalledWith(config, "npm", true)
      })

      it("should handle Prettier failure but Husky success", async () => {
        const config = {
          ...defaultConfig,
          framework: {
            ...defaultConfig.framework,
            eslint: LintFormatProvider.ESLINT_PRETTIER,
          },
          huskyAndCommitLint: HuskyAndCommitLintProvider.HUSKY_COMMIT_LINT,
        }

        vi.mocked(setupPrettier).mockResolvedValue(false)

        const result = await setupMics(config, "npm")

        expect(result).toBe(false)
        expect(setupPrettier).toHaveBeenCalledWith(config)
        expect(setupHusky).toHaveBeenCalledWith(config, "npm", true)
      })
    })
  })
})
