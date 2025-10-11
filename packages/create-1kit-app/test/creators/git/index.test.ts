import childProcess from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { setupGit } from "../../../src/creators/git"
import {
  AnalyticsProvider,
  AuthProvider,
  HuskyAndCommitLintProvider,
  LintFormatProvider,
  MonitoringProvider,
  OneKitConfig,
  ProjectType,
} from "../../../src/utils/config-defaults"

// Mock node modules
vi.mock("node:child_process")
vi.mock("node:fs")
vi.mock("node:path")

describe("setupGit", () => {
  const mockConfig: OneKitConfig = {
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
    auth: AuthProvider.CLERK,
    analytics: AnalyticsProvider.MIXPANEL,
    monitoring: MonitoringProvider.SENTRY,
    serviceLayer: true,
    huskyAndCommitLint: HuskyAndCommitLintProvider.HUSKY_COMMIT_LINT,
  }

  const mockProjectCwd = "/mock/path/test-project"

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks()

    // Mock path.resolve to return a consistent path
    vi.mocked(path.resolve).mockReturnValue(mockProjectCwd)
    vi.mocked(path.join).mockImplementation((...args) => args.join("/"))

    // Mock process.cwd()
    vi.spyOn(process, "cwd").mockReturnValue("/mock/path")
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should create a new git repository with initial commit", async () => {
    // Mock fs operations
    vi.mocked(fs.existsSync).mockReturnValue(false)
    vi.mocked(fs.writeFileSync).mockImplementation(() => undefined)

    // Mock child process execSync
    const execSyncMock = vi.mocked(childProcess.execSync)

    const result = await setupGit(mockConfig)

    // Verify git commands were called correctly
    expect(execSyncMock).toHaveBeenCalledTimes(3)
    expect(execSyncMock).toHaveBeenCalledWith(
      "git init --initial-branch=main",
      {
        cwd: mockProjectCwd,
      }
    )
    expect(execSyncMock).toHaveBeenCalledWith("git add .", {
      cwd: mockProjectCwd,
    })
    expect(execSyncMock).toHaveBeenCalledWith(
      'git commit -m "Initial commit by create-1kit-app" --no-verify',
      { cwd: mockProjectCwd }
    )

    expect(result).toBe(true)
  })

  it("should update existing .gitignore file if !.env.example is missing", async () => {
    // Mock existing .gitignore without !.env.example
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue("node_modules/\n.env\n")
    const writeFileSyncMock = vi.mocked(fs.writeFileSync)

    await setupGit(mockConfig)

    // Verify .gitignore was updated
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      `${mockProjectCwd}/.gitignore`,
      "node_modules/\n.env\n\n!.env.example"
    )
  })

  it("should not modify .gitignore if !.env.example already exists", async () => {
    // Mock existing .gitignore with !.env.example
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(
      "node_modules/\n.env\n!.env.example"
    )
    const writeFileSyncMock = vi.mocked(fs.writeFileSync)

    await setupGit(mockConfig)

    // Verify .gitignore was not modified
    expect(writeFileSyncMock).not.toHaveBeenCalledWith(
      `${mockProjectCwd}/.gitignore`,
      expect.any(String)
    )
  })

  it("should create .gitignore with !.env.example if file doesn't exist", async () => {
    // Mock non-existing .gitignore
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const writeFileSyncMock = vi.mocked(fs.writeFileSync)

    await setupGit(mockConfig)

    // Verify .gitignore was created with !.env.example
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      `${mockProjectCwd}/.gitignore`,
      "\n!.env.example"
    )
  })

  it("should handle errors during git operations", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    vi.mocked(childProcess.execSync).mockImplementation(() => {
      throw new Error("Git error")
    })

    await expect(setupGit(mockConfig)).rejects.toThrow("Git error")
  })
})
