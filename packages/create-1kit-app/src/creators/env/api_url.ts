import { setEnv, setEnvExample, setEnvLocal } from "@/src/utils/env-utils"

export async function setupApiEnv(cwd?: string): Promise<boolean> {
  const prodPairs = {
    NEXT_PUBLIC_API_URL: "https://api.***.***",
  }
  const devPairs = {
    NEXT_PUBLIC_API_URL: "http://localhost:8000",
  }

  await setEnv(prodPairs, { cwd })
  await setEnvLocal(devPairs, { cwd })
  await setEnvExample(prodPairs, { cwd })

  return true
}
