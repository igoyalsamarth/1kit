import { setEnv, setEnvExample, setEnvLocal } from "@/src/utils/env-utils"

export async function setupClerkEnv(cwd?: string): Promise<boolean> {
  const prodPairs = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_live_*****",
    CLERK_SECRET_KEY: "sk_live_***",
  }

  const devPairs = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_*****",
    CLERK_SECRET_KEY: "sk_test_***",
  }

  await setEnv(prodPairs, { cwd })
  await setEnvExample(prodPairs, { cwd })
  await setEnvLocal(devPairs, { cwd })

  return true
}
