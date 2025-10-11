import fs from "fs/promises"
import path from "path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

import { init } from "../../src/commands/init"
import * as envSetup from "../../src/creators/env"
import * as gitSetup from "../../src/creators/git"
import * as projectCreator from "../../src/creators/project"
import * as analyticsSetup from "../../src/creators/typescript/next/analytics"
import * as authSetup from "../../src/creators/typescript/next/auth"
import * as micsSetup from "../../src/creators/typescript/next/mics"
import * as monitoringSetup from "../../src/creators/typescript/next/monitoring"
import * as serviceLayerSetup from "../../src/creators/typescript/next/service-layer"
import {
  AnalyticsProvider,
  AuthProvider,
  HuskyAndCommitLintProvider,
  LintFormatProvider,
  MonitoringProvider,
  ProjectType,
  type OneKitConfig,
} from "../../src/utils/config-defaults"
import * as configPrompts from "../../src/utils/config-prompts"
import * as packageManager from "../../src/utils/get-package-manager"
import * as installer from "../../src/utils/run-install"

// Mock all dependencies
vi.mock("../../src/utils/config-prompts")
vi.mock("../../src/utils/get-package-manager")
vi.mock("../../src/creators/project")
vi.mock("../../src/creators/typescript/next/auth")
vi.mock("../../src/creators/typescript/next/analytics")
vi.mock("../../src/creators/typescript/next/monitoring")
vi.mock("../../src/creators/typescript/next/service-layer")
vi.mock("../../src/creators/typescript/next/mics")
vi.mock("../../src/creators/env")
vi.mock("../../src/creators/git")
vi.mock("../../src/utils/run-install")
vi.mock("fs/promises")

describe("init command", () => {
  const testProjectPath = path.join(__dirname, "../fixtures/test-project")
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

    // Setup default mock implementations
    vi.mocked(configPrompts.promptForConfig).mockResolvedValue(defaultConfig)
    vi.mocked(packageManager.getPackageManager).mockResolvedValue("npm")
    vi.mocked(projectCreator.createProject).mockImplementation(async () => {})
    vi.mocked(authSetup.setupAuth).mockImplementation(async () => true)
    vi.mocked(analyticsSetup.setupAnalytics).mockImplementation(
      async () => true
    )
    vi.mocked(monitoringSetup.setupMonitoring).mockImplementation(
      async () => true
    )
    vi.mocked(serviceLayerSetup.setupServiceLayer).mockImplementation(
      async () => true
    )
    vi.mocked(micsSetup.setupMics).mockImplementation(async () => true)
    vi.mocked(envSetup.setupEnv).mockImplementation(async () => true)
    vi.mocked(gitSetup.setupGit).mockImplementation(async () => true)
    vi.mocked(installer.runInstall).mockImplementation(async () => true)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  test("should create a new project with default options", async () => {
    // Execute init command
    await init.parseAsync(["node", "test", "init"])

    // Verify config was prompted
    expect(configPrompts.promptForConfig).toHaveBeenCalled()

    // Verify package manager was detected
    expect(packageManager.getPackageManager).toHaveBeenCalledWith(
      process.cwd(),
      { withFallback: true }
    )

    // Verify project creation was called with correct config
    expect(projectCreator.createProject).toHaveBeenCalledWith(
      expect.objectContaining({
        projectName: defaultConfig.projectName,
        framework: defaultConfig.framework,
        fileManager: expect.any(Object),
      }),
      "npm"
    )

    // Verify no optional setups were called
    expect(authSetup.setupAuth).not.toHaveBeenCalled()
    expect(analyticsSetup.setupAnalytics).not.toHaveBeenCalled()
    expect(monitoringSetup.setupMonitoring).not.toHaveBeenCalled()
    expect(serviceLayerSetup.setupServiceLayer).not.toHaveBeenCalled()

    // Verify required setups were called with correct parameters
    expect(micsSetup.setupMics).toHaveBeenCalledWith(
      expect.objectContaining({
        projectName: defaultConfig.projectName,
        framework: defaultConfig.framework,
        huskyAndCommitLint: defaultConfig.huskyAndCommitLint,
      }),
      "npm"
    )

    expect(envSetup.setupEnv).toHaveBeenCalledWith(
      expect.objectContaining({
        projectName: defaultConfig.projectName,
        auth: defaultConfig.auth,
        analytics: defaultConfig.analytics,
        monitoring: defaultConfig.monitoring,
      })
    )

    expect(gitSetup.setupGit).toHaveBeenCalledWith(
      expect.objectContaining({
        projectName: defaultConfig.projectName,
        framework: defaultConfig.framework,
      })
    )

    expect(installer.runInstall).toHaveBeenCalledWith(
      "npm",
      defaultConfig.projectName
    )

    // Verify the order of operations
    expect(
      vi.mocked(projectCreator.createProject).mock.invocationCallOrder[0]
    ).toBeLessThan(vi.mocked(micsSetup.setupMics).mock.invocationCallOrder[0])
    expect(
      vi.mocked(micsSetup.setupMics).mock.invocationCallOrder[0]
    ).toBeLessThan(vi.mocked(envSetup.setupEnv).mock.invocationCallOrder[0])
    expect(
      vi.mocked(envSetup.setupEnv).mock.invocationCallOrder[0]
    ).toBeLessThan(vi.mocked(gitSetup.setupGit).mock.invocationCallOrder[0])
    expect(
      vi.mocked(gitSetup.setupGit).mock.invocationCallOrder[0]
    ).toBeLessThan(vi.mocked(installer.runInstall).mock.invocationCallOrder[0])
  })

  test("should set up optional features when configured", async () => {
    const configWithFeatures: OneKitConfig = {
      ...defaultConfig,
      auth: AuthProvider.CLERK,
      analytics: AnalyticsProvider.GOOGLE_ANALYTICS,
      monitoring: MonitoringProvider.SENTRY,
      serviceLayer: true,
    }

    vi.mocked(configPrompts.promptForConfig).mockResolvedValue(
      configWithFeatures
    )

    // Execute init command
    await init.parseAsync(["node", "test", "init"])

    // Verify all optional setups were called with correct parameters
    expect(authSetup.setupAuth).toHaveBeenCalledWith(
      expect.objectContaining({
        auth: AuthProvider.CLERK,
        framework: defaultConfig.framework,
        projectName: defaultConfig.projectName,
      })
    )

    expect(analyticsSetup.setupAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        analytics: AnalyticsProvider.GOOGLE_ANALYTICS,
        framework: defaultConfig.framework,
        projectName: defaultConfig.projectName,
      })
    )

    expect(monitoringSetup.setupMonitoring).toHaveBeenCalledWith(
      expect.objectContaining({
        monitoring: MonitoringProvider.SENTRY,
        framework: defaultConfig.framework,
        projectName: defaultConfig.projectName,
      })
    )

    expect(serviceLayerSetup.setupServiceLayer).toHaveBeenCalledWith(
      expect.objectContaining({
        serviceLayer: true,
        framework: defaultConfig.framework,
        projectName: defaultConfig.projectName,
      })
    )

    // Verify the order of optional setups
    const authOrder = vi.mocked(authSetup.setupAuth).mock.invocationCallOrder[0]
    const analyticsOrder = vi.mocked(analyticsSetup.setupAnalytics).mock
      .invocationCallOrder[0]
    const monitoringOrder = vi.mocked(monitoringSetup.setupMonitoring).mock
      .invocationCallOrder[0]
    const serviceLayerOrder = vi.mocked(serviceLayerSetup.setupServiceLayer)
      .mock.invocationCallOrder[0]

    expect(authOrder).toBeLessThan(analyticsOrder)
    expect(analyticsOrder).toBeLessThan(monitoringOrder)
    expect(monitoringOrder).toBeLessThan(serviceLayerOrder)

    // Verify env setup was called with updated config
    expect(envSetup.setupEnv).toHaveBeenCalledWith(
      expect.objectContaining({
        auth: AuthProvider.CLERK,
        analytics: AnalyticsProvider.GOOGLE_ANALYTICS,
        monitoring: MonitoringProvider.SENTRY,
      })
    )
  })
})
