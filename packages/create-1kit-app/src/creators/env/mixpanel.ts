import { setEnv, setEnvExample } from "@/src/utils/env-utils"

export async function setupMixpanelEnv(): Promise<boolean> {
  const key = "NEXT_PUBLIC_MIXPANEL_TOKEN"

  await setEnv({ [key]: "" })
  await setEnvExample({ [key]: "" })

  return true
}
