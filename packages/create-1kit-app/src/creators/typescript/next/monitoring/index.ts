import {
  MonitoringProvider,
  OneKitConfig,
} from "../../../../utils/config-defaults"
import { setupClientProvider } from "../client-provider"
import { setupSentry } from "./sentry"

export async function setupMonitoring(config: OneKitConfig): Promise<boolean> {
  const { monitoring } = config

  await setupClientProvider(config)
  switch (monitoring) {
    case MonitoringProvider.SENTRY:
      return await setupSentry(config)
    case MonitoringProvider.NONE:
      return true
    default:
      throw new Error(`Monitoring provider ${monitoring} not supported`)
  }
}
