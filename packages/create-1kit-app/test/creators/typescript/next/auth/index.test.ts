import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { setupAuth } from "../../../../../src/creators/typescript/next/auth"
import { setupClerkAuth } from "../../../../../src/creators/typescript/next/auth/clerk"
import {
  AnalyticsProvider,
  AuthProvider,
  HuskyAndCommitLintProvider,
  LintFormatProvider,
  MonitoringProvider,
  ProjectType,
  type OneKitConfig,
} from "../../../../../src/utils/config-defaults"
import { writePackages } from "../../../../../src/utils/package-manager"

// Mock dependencies
vi.mock("../../../../../src/creators/typescript/next/auth/clerk")
vi.mock("../../../../../src/utils/package-manager")

describe("auth setup", () => {
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
    vi.mocked(setupClerkAuth).mockResolvedValue(true)
    vi.mocked(writePackages).mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe("setupAuth", () => {
    it("should set up Clerk auth when selected", async () => {
      const config = {
        ...defaultConfig,
        auth: AuthProvider.CLERK,
      }

      const result = await setupAuth(config)

      expect(result).toBe(true)
      expect(setupClerkAuth).toHaveBeenCalledWith(config)
      expect(setupClerkAuth).toHaveBeenCalledTimes(1)
    })

    it("should return true when no auth is selected", async () => {
      const config = {
        ...defaultConfig,
        auth: AuthProvider.NONE,
      }

      const result = await setupAuth(config)

      expect(result).toBe(true)
      expect(setupClerkAuth).not.toHaveBeenCalled()
    })

    it("should throw error for unsupported auth provider", async () => {
      const config = {
        ...defaultConfig,
        auth: "unsupported" as (typeof AuthProvider)[keyof typeof AuthProvider],
      }

      await expect(setupAuth(config)).rejects.toThrow(
        "Auth provider unsupported not supported"
      )
    })

    it("should handle Clerk auth setup failure", async () => {
      const config = {
        ...defaultConfig,
        auth: AuthProvider.CLERK,
      }

      vi.mocked(setupClerkAuth).mockRejectedValue(
        new Error("Clerk setup failed")
      )

      await expect(setupAuth(config)).rejects.toThrow("Clerk setup failed")
    })
  })
})
