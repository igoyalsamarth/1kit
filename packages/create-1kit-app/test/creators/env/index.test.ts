import path from "path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

import { setupEnv } from "../../../src/creators/env"
import { setupApiEnv } from "../../../src/creators/env/api_url"
import { setupClerkEnv } from "../../../src/creators/env/clerk"
import { setupGoogleAnalyticsEnv } from "../../../src/creators/env/google_analytics"
import { setupMixpanelEnv } from "../../../src/creators/env/mixpanel"
import { setupSentryEnv } from "../../../src/creators/env/sentry"
import {
  AnalyticsProvider,
  AuthProvider,
  HuskyAndCommitLintProvider,
  MonitoringProvider,
  type OneKitConfig,
} from "../../../src/utils/config-defaults"
import * as envUtils from "../../../src/utils/env-utils"

// Mock all env setup functions
vi.mock("../../../src/creators/env/api_url")
vi.mock("../../../src/creators/env/clerk")
vi.mock("../../../src/creators/env/google_analytics")
vi.mock("../../../src/creators/env/mixpanel")
vi.mock("../../../src/creators/env/sentry")
vi.mock("../../../src/utils/env-utils")

describe("env creators", () => {
  const defaultProjectPath = path.resolve(
    __dirname,
    "../../fixtures/creator-env/project-default"
  )
  const allFeaturesProjectPath = path.resolve(
    __dirname,
    "../../fixtures/creator-env/project-all-features"
  )

  const defaultConfig: OneKitConfig = {
    projectName: "project-default",
    framework: {
      name: "next",
      typescript: true,
      eslint: "eslint",
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

  const allFeaturesConfig: OneKitConfig = {
    ...defaultConfig,
    projectName: "project-all-features",
    auth: AuthProvider.CLERK,
    analytics: AnalyticsProvider.GOOGLE_ANALYTICS,
    monitoring: MonitoringProvider.SENTRY,
    serviceLayer: true,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    process.chdir(path.resolve(__dirname, "../../.."))

    // Setup default mock implementations
    vi.mocked(setupApiEnv).mockResolvedValue(true)
    vi.mocked(setupClerkEnv).mockResolvedValue(true)
    vi.mocked(setupGoogleAnalyticsEnv).mockResolvedValue(true)
    vi.mocked(setupMixpanelEnv).mockResolvedValue(true)
    vi.mocked(setupSentryEnv).mockResolvedValue(true)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  test("should not create any env files with default config", async () => {
    const result = await setupEnv(defaultConfig)

    // Verify no env setups were called
    expect(setupApiEnv).not.toHaveBeenCalled()
    expect(setupClerkEnv).not.toHaveBeenCalled()
    expect(setupGoogleAnalyticsEnv).not.toHaveBeenCalled()
    expect(setupMixpanelEnv).not.toHaveBeenCalled()
    expect(setupSentryEnv).not.toHaveBeenCalled()

    expect(result).toBe(true)
  })

  test("should create all env files when all features are enabled", async () => {
    const result = await setupEnv(allFeaturesConfig)
    const expectedProjectPath = path.resolve(
      process.cwd(),
      allFeaturesConfig.projectName
    )

    // Verify all env setups were called with correct path
    expect(setupClerkEnv).toHaveBeenCalledWith(expectedProjectPath)
    expect(setupGoogleAnalyticsEnv).toHaveBeenCalledWith(expectedProjectPath)
    expect(setupSentryEnv).toHaveBeenCalledWith(expectedProjectPath)
    expect(setupApiEnv).toHaveBeenCalledWith(expectedProjectPath)

    // Verify Mixpanel was not called (using Google Analytics instead)
    expect(setupMixpanelEnv).not.toHaveBeenCalled()

    expect(result).toBe(true)
  })

  test("should create only Mixpanel env when Mixpanel analytics is selected", async () => {
    const mixpanelConfig: OneKitConfig = {
      ...defaultConfig,
      analytics: AnalyticsProvider.MIXPANEL,
    }

    const result = await setupEnv(mixpanelConfig)
    const expectedProjectPath = path.resolve(
      process.cwd(),
      mixpanelConfig.projectName
    )

    // Verify only Mixpanel setup was called
    expect(setupMixpanelEnv).toHaveBeenCalledWith(expectedProjectPath)

    // Verify other setups were not called
    expect(setupClerkEnv).not.toHaveBeenCalled()
    expect(setupGoogleAnalyticsEnv).not.toHaveBeenCalled()
    expect(setupSentryEnv).not.toHaveBeenCalled()
    expect(setupApiEnv).not.toHaveBeenCalled()

    expect(result).toBe(true)
  })

  test("should throw error for unsupported analytics provider", async () => {
    const invalidConfig: OneKitConfig = {
      ...defaultConfig,
      analytics: "invalid" as any,
    }

    await expect(setupEnv(invalidConfig)).rejects.toThrow(
      "Analytics provider invalid not supported"
    )
  })

  test("should throw error for unsupported auth provider", async () => {
    const invalidConfig: OneKitConfig = {
      ...defaultConfig,
      auth: "invalid" as any,
    }

    await expect(setupEnv(invalidConfig)).rejects.toThrow(
      "Auth provider invalid not supported"
    )
  })

  test("should throw error for unsupported monitoring provider", async () => {
    const invalidConfig: OneKitConfig = {
      ...defaultConfig,
      monitoring: "invalid" as any,
    }

    await expect(setupEnv(invalidConfig)).rejects.toThrow(
      "Monitoring provider invalid not supported"
    )
  })

  test("should throw error for invalid service layer value", async () => {
    const invalidConfig: OneKitConfig = {
      ...defaultConfig,
      serviceLayer: "invalid" as any,
    }

    await expect(setupEnv(invalidConfig)).rejects.toThrow(
      "Service layer invalid not supported"
    )
  })
})
