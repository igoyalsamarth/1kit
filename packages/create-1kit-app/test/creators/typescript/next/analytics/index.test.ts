import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { setupAnalytics } from "../../../../../src/creators/typescript/next/analytics"
import { setupGoogleAnalytics } from "../../../../../src/creators/typescript/next/analytics/google-analytics"
import { setupMixpanel } from "../../../../../src/creators/typescript/next/analytics/mixpanel"
import { setupClientProvider } from "../../../../../src/creators/typescript/next/client-provider"
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
vi.mock(
  "../../../../../src/creators/typescript/next/analytics/google-analytics"
)
vi.mock("../../../../../src/creators/typescript/next/analytics/mixpanel")
vi.mock("../../../../../src/creators/typescript/next/client-provider")
vi.mock("../../../../../src/utils/package-manager")

describe("analytics setup", () => {
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
    vi.mocked(setupGoogleAnalytics).mockResolvedValue(true)
    vi.mocked(setupMixpanel).mockResolvedValue(true)
    vi.mocked(setupClientProvider).mockResolvedValue(true)
    vi.mocked(writePackages).mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe("setupAnalytics", () => {
    it("should set up Google Analytics when selected", async () => {
      const config = {
        ...defaultConfig,
        analytics: AnalyticsProvider.GOOGLE_ANALYTICS,
      }

      const result = await setupAnalytics(config)

      expect(result).toBe(true)
      expect(setupClientProvider).toHaveBeenCalledWith(config)
      expect(setupGoogleAnalytics).toHaveBeenCalledWith(config)
      expect(setupGoogleAnalytics).toHaveBeenCalledTimes(1)
      expect(setupMixpanel).not.toHaveBeenCalled()
    })

    it("should set up Mixpanel when selected", async () => {
      const config = {
        ...defaultConfig,
        analytics: AnalyticsProvider.MIXPANEL,
      }

      const result = await setupAnalytics(config)

      expect(result).toBe(true)
      expect(setupClientProvider).toHaveBeenCalledWith(config)
      expect(setupMixpanel).toHaveBeenCalledWith(config)
      expect(setupMixpanel).toHaveBeenCalledTimes(1)
      expect(setupGoogleAnalytics).not.toHaveBeenCalled()
    })

    it("should return true when no analytics is selected", async () => {
      const config = {
        ...defaultConfig,
        analytics: AnalyticsProvider.NONE,
      }

      const result = await setupAnalytics(config)

      expect(result).toBe(true)
      expect(setupClientProvider).toHaveBeenCalledWith(config)
      expect(setupGoogleAnalytics).not.toHaveBeenCalled()
      expect(setupMixpanel).not.toHaveBeenCalled()
    })

    it("should throw error for unsupported analytics provider", async () => {
      const config = {
        ...defaultConfig,
        analytics:
          "unsupported" as (typeof AnalyticsProvider)[keyof typeof AnalyticsProvider],
      }

      await expect(setupAnalytics(config)).rejects.toThrow(
        "Analytics provider unsupported not supported"
      )
    })

    it("should handle Google Analytics setup failure", async () => {
      const config = {
        ...defaultConfig,
        analytics: AnalyticsProvider.GOOGLE_ANALYTICS,
      }

      vi.mocked(setupGoogleAnalytics).mockRejectedValue(
        new Error("GA setup failed")
      )

      await expect(setupAnalytics(config)).rejects.toThrow("GA setup failed")
    })

    it("should handle Mixpanel setup failure", async () => {
      const config = {
        ...defaultConfig,
        analytics: AnalyticsProvider.MIXPANEL,
      }

      vi.mocked(setupMixpanel).mockRejectedValue(
        new Error("Mixpanel setup failed")
      )

      await expect(setupAnalytics(config)).rejects.toThrow(
        "Mixpanel setup failed"
      )
    })

    it("should handle client provider setup failure", async () => {
      const config = {
        ...defaultConfig,
        analytics: AnalyticsProvider.GOOGLE_ANALYTICS,
      }

      vi.mocked(setupClientProvider).mockRejectedValue(
        new Error("Client provider setup failed")
      )

      await expect(setupAnalytics(config)).rejects.toThrow(
        "Client provider setup failed"
      )
    })
  })
})
