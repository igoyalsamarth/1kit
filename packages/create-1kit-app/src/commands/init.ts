import { Command } from "commander"

import { setupEnv } from "../creators/env"
import { createProject } from "../creators/project"
import { setupAnalytics } from "../creators/typescript/next/analytics"
import { setupAuth } from "../creators/typescript/next/auth"
import { setupMonitoring } from "../creators/typescript/next/monitoring"
import { setupServiceLayer } from "../creators/typescript/next/service-layer"
import {
  AnalyticsProvider,
  AuthProvider,
  MonitoringProvider,
  oneKitConfigSchema,
} from "../utils/config-defaults"
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
      if (validConfig.auth !== AuthProvider.NONE) {
        await setupAuth(configWithManager)
      }

      // Setup analytics if configured
      if (validConfig.analytics !== AnalyticsProvider.NONE) {
        await setupAnalytics(configWithManager)
      }

      // Setup monitoring if configured
      if (validConfig.monitoring !== MonitoringProvider.NONE) {
        await setupMonitoring(configWithManager)
      }

      // Setup service layer if configured
      if (validConfig.serviceLayer) {
        await setupServiceLayer(configWithManager)
      }

      await setupEnv(configWithManager)

      logger.log(
        `${highlighter.success("Success!")} Project initialization completed.`
      )
      logger.break()
    } catch (error) {
      logger.break()
      handleError(error)
    }
  })
