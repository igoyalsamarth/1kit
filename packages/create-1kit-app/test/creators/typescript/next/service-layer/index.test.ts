import { beforeEach, describe, expect, it, vi } from "vitest"

import { setupClientProvider } from "../../../../../src/creators/typescript/next/client-provider"
import { setupServiceLayer } from "../../../../../src/creators/typescript/next/service-layer"
import { setupAxios } from "../../../../../src/creators/typescript/next/service-layer/axios"
import { setupReactQuery } from "../../../../../src/creators/typescript/next/service-layer/react-query"
import {
  AnalyticsProvider,
  AuthProvider,
  HuskyAndCommitLintProvider,
  LintFormatProvider,
  MonitoringProvider,
  OneKitConfig,
  ProjectType,
} from "../../../../../src/utils/config-defaults"

// Mock dependencies
vi.mock("../../../../../src/creators/typescript/next/client-provider")
vi.mock("../../../../../src/creators/typescript/next/service-layer/axios")
vi.mock("../../../../../src/creators/typescript/next/service-layer/react-query")

describe("Service Layer Setup", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockConfig: OneKitConfig = {
    projectName: "test-project",
    framework: {
      name: ProjectType.NEXT,
      typescript: true,
      eslint: LintFormatProvider.ESLINT,
      tailwind: false,
      app: true,
      importAlias: "@",
      turbopack: false,
    },
    auth: AuthProvider.NONE,
    analytics: AnalyticsProvider.NONE,
    monitoring: MonitoringProvider.NONE,
    huskyAndCommitLint: HuskyAndCommitLintProvider.NONE,
    serviceLayer: true,
  }

  it("should set up service layer when enabled", async () => {
    const result = await setupServiceLayer(mockConfig)

    expect(result).toBe(true)
    expect(setupClientProvider).toHaveBeenCalledWith(mockConfig)
    expect(setupAxios).toHaveBeenCalledWith(mockConfig)
    expect(setupReactQuery).toHaveBeenCalledWith(mockConfig)
  })

  it("should skip service layer setup when disabled", async () => {
    const configWithoutServiceLayer: OneKitConfig = {
      ...mockConfig,
      serviceLayer: false,
    }

    const result = await setupServiceLayer(configWithoutServiceLayer)

    expect(result).toBe(true)
    expect(setupClientProvider).not.toHaveBeenCalled()
    expect(setupAxios).not.toHaveBeenCalled()
    expect(setupReactQuery).not.toHaveBeenCalled()
  })

  it("should handle errors from sub-setups gracefully", async () => {
    vi.mocked(setupClientProvider).mockRejectedValueOnce(
      new Error("Client provider setup failed")
    )

    await expect(setupServiceLayer(mockConfig)).rejects.toThrow(
      "Client provider setup failed"
    )
  })
})
