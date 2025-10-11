import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { setupClientProvider } from "../../../../../src/creators/typescript/next/client-provider"
import { setupMonitoring } from "../../../../../src/creators/typescript/next/monitoring"
import { setupSentry } from "../../../../../src/creators/typescript/next/monitoring/sentry"
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
vi.mock("../../../../../src/creators/typescript/next/monitoring/sentry")
vi.mock("../../../../../src/creators/typescript/next/client-provider")

describe("monitoring setup", () => {
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
    vi.mocked(setupSentry).mockResolvedValue(true)
    vi.mocked(setupClientProvider).mockResolvedValue(true)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe("setupMonitoring", () => {
    it("should set up Sentry when selected", async () => {
      const config = {
        ...defaultConfig,
        monitoring: MonitoringProvider.SENTRY,
      }

      const result = await setupMonitoring(config)

      expect(result).toBe(true)
      expect(setupClientProvider).toHaveBeenCalledWith(config)
      expect(setupSentry).toHaveBeenCalledWith(config)
      expect(setupSentry).toHaveBeenCalledTimes(1)
    })

    it("should return true when no monitoring is selected", async () => {
      const config = {
        ...defaultConfig,
        monitoring: MonitoringProvider.NONE,
      }

      const result = await setupMonitoring(config)

      expect(result).toBe(true)
      expect(setupClientProvider).toHaveBeenCalledWith(config)
      expect(setupSentry).not.toHaveBeenCalled()
    })

    it("should throw error for unsupported monitoring provider", async () => {
      const config = {
        ...defaultConfig,
        monitoring:
          "unsupported" as (typeof MonitoringProvider)[keyof typeof MonitoringProvider],
      }

      await expect(setupMonitoring(config)).rejects.toThrow(
        "Monitoring provider unsupported not supported"
      )
    })
  })
})
