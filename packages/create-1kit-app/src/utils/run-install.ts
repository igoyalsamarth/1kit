import { execSync } from "child_process"

import { logger } from "./logger"

export async function runInstall(packageManager: string) {
  const installCmd = `${packageManager} install`
  logger.log("Installing dependencies...")

  try {
    execSync(installCmd, { stdio: "inherit" })
    return true
  } catch (error) {
    logger.error(
      `Failed to install dependencies: ${error instanceof Error ? error.message : String(error)}`
    )
    return false
  }
}
