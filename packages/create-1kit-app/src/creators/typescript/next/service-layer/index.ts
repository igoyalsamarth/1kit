import { OneKitConfig } from "../../../../utils/config-defaults"
import { setupClientProvider } from "../client-provider"
import { setupAxios } from "./axios"
import { setupReactQuery } from "./react-query"

export async function setupServiceLayer(
  config: OneKitConfig
): Promise<boolean> {
  const { serviceLayer } = config

  await setupClientProvider(config)
  await setupAxios(config)
  await setupReactQuery(config)
  return true
}
