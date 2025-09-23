import { setEnv, setEnvExample } from "@/src/utils/env-utils"

export async function setupMixpanelEnv(cwd?: string): Promise<boolean> {
  const pairs = {
    NEXT_PUBLIC_MIXPANEL_TOKEN: "***",
  }

  await setEnv(pairs, { cwd })
  await setEnvExample(pairs, { cwd })

  return true
}
