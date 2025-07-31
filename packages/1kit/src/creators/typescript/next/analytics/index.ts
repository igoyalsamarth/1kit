import {
  AnalyticsProvider,
  AuthProvider,
  OneKitConfig,
} from "../../../../utils/config-defaults"
import { setupClientProvider } from "../client-provider"
import { setupGoogleAnalytics } from "./google-analytics"
import { setupMixpanel } from "./mixpanel"

export async function setupAnalytics(config: OneKitConfig): Promise<boolean> {
  const { analytics } = config

  await setupClientProvider(config)
  switch (analytics) {
    case AnalyticsProvider.MIXPANEL:
      return await setupMixpanel(config)
    case AnalyticsProvider.GOOGLE_ANALYTICS:
      return await setupGoogleAnalytics(config)
    default:
      throw new Error(`Analytics provider ${analytics} not supported`)
  }
}
