import { Command } from "commander"

import { setupAuth } from "../creators/auth"
import { createProject } from "../creators/project"
import { oneKitConfigSchema } from "../utils/config-defaults"
import { promptForConfig } from "../utils/config-prompts"
import { TSFileManager } from "../utils/file-manager"
import { getPackageManager } from "../utils/get-package-manager"
import { handleError } from "../utils/handle-error"
import { highlighter } from "../utils/highlighter"
import { logger } from "../utils/logger"

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .action(async (opts) => {
    try {
      // Use interactive prompts to get configuration
      const config = await promptForConfig()

      // Validate config against schema
      const validConfig = oneKitConfigSchema.parse(config)

      // Initialize the file manager
      const fileManager = new TSFileManager(validConfig.projectName)
      const configWithManager = { ...validConfig, fileManager }

      // Detect package manager
      const packageManager = await getPackageManager(process.cwd(), {
        withFallback: true,
      })

      // Create the project based on the configuration
      await createProject(configWithManager, packageManager)

      // Setup authentication if configured
      if (validConfig.auth !== "none") {
        await setupAuth(configWithManager)
      }

      logger.log(
        `${highlighter.success("Success!")} Project initialization completed.`
      )
      logger.break()
    } catch (error) {
      logger.break()
      handleError(error)
    }
  })
