import { setEnv, setEnvExample } from "@/src/utils/env-utils"

export async function setupGoogleAnalyticsEnv(cwd?: string): Promise<boolean> {
  const key = "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"
  const placeholder = "G-***"

  await setEnv({ [key]: placeholder }, { cwd })
  await setEnvExample({ [key]: placeholder }, { cwd })

  return true
}
