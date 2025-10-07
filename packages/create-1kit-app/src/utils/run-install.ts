import { execSync } from "child_process"
import path from "node:path"

import { logger } from "./logger"

export async function runInstall(packageManager: string, projectName: string) {
  const installCmd = `${packageManager} install`
  logger.log("Installing dependencies...")

  try {
    const projectRoot = path.resolve(process.cwd(), projectName)
    execSync(installCmd, {
      stdio: "inherit",
      cwd: projectRoot,
    })
    return true
  } catch (error) {
    logger.error(
      `Failed to install dependencies: ${error instanceof Error ? error.message : String(error)}`
    )
    return false
  }
}
