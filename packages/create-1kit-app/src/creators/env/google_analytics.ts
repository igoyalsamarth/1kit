import { setEnv, setEnvExample } from "@/src/utils/env-utils"

export async function setupGoogleAnalyticsEnv(): Promise<boolean> {
  const key = "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"
  const placeholder = "G-***"

  await setEnv({ [key]: placeholder })
  await setEnvExample({ [key]: placeholder })

  return true
}
