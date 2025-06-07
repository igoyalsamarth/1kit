import { Command } from "commander"

import { oneKitConfigSchema } from "../utils/config-defaults"
import { promptForConfig } from "../utils/config-prompts"
import { createProject } from "../utils/creators/project"
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

      // Detect package manager
      const packageManager = await getPackageManager(process.cwd(), {
        withFallback: true,
      })

      // Create the project based on the configuration
      await createProject(validConfig, packageManager)

      logger.log(
        `${highlighter.success("Success!")} Project initialization completed.`
      )
      logger.break()
    } catch (error) {
      logger.break()
      handleError(error)
    }
  })
