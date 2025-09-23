import path from "node:path"

import {
  AnalyticsProvider,
  AuthProvider,
  MonitoringProvider,
  OneKitConfig,
} from "../../utils/config-defaults"
import { setupApiEnv } from "./api_url"
import { setupClerkEnv } from "./clerk"
import { setupGoogleAnalyticsEnv } from "./google_analytics"
import { setupMixpanelEnv } from "./mixpanel"
import { setupSentryEnv } from "./sentry"

export async function setupEnv(config: OneKitConfig): Promise<boolean> {
  const { analytics, auth, monitoring, serviceLayer, projectName } = config
  const projectCwd = path.resolve(process.cwd(), projectName)

  switch (analytics) {
    case AnalyticsProvider.MIXPANEL:
      await setupMixpanelEnv(projectCwd)
      break
    case AnalyticsProvider.GOOGLE_ANALYTICS:
      await setupGoogleAnalyticsEnv(projectCwd)
      break
    default:
      throw new Error(`Analytics provider ${analytics} not supported`)
  }

  switch (auth) {
    case AuthProvider.CLERK:
      await setupClerkEnv(projectCwd)
      break
    default:
      throw new Error(`Auth provider ${auth} not supported`)
  }

  switch (monitoring) {
    case MonitoringProvider.SENTRY:
      await setupSentryEnv(projectCwd)
      break
    default:
      throw new Error(`Monitoring provider ${monitoring} not supported`)
  }

  switch (serviceLayer) {
    case true:
      await setupApiEnv(projectCwd)
      break
    default:
      throw new Error(`Service layer ${serviceLayer} not supported`)
  }

  return true
}
