import {
  AnalyticsProvider,
  AuthProvider,
  OneKitConfig,
} from "../../utils/config-defaults"
import { setupClerkEnv } from "./clerk"
import { setupGoogleAnalyticsEnv } from "./google_analytics"
import { setupMixpanelEnv } from "./mixpanel"

export async function setupEnv(config: OneKitConfig): Promise<boolean> {
  const { analytics, auth } = config

  switch (analytics) {
    case AnalyticsProvider.MIXPANEL:
      await setupMixpanelEnv()
      break
    case AnalyticsProvider.GOOGLE_ANALYTICS:
      await setupGoogleAnalyticsEnv()
      break
    default:
      throw new Error(`Analytics provider ${analytics} not supported`)
  }
  switch (auth) {
    case AuthProvider.CLERK:
      await setupClerkEnv()
      break
    default:
      throw new Error(`Auth provider ${auth} not supported`)
  }

  return true
}
