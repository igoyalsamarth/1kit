import { setEnv, setEnvExample, setEnvLocal } from "@/src/utils/env-utils"

export async function setupClerkEnv(): Promise<boolean> {
  const prodPairs = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_live_*****",
    CLERK_SECRET_KEY: "sk_live_***",
  }

  const devPairs = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_*****",
    CLERK_SECRET_KEY: "sk_test_***",
  }

  await setEnv(prodPairs)
  await setEnvExample(prodPairs)
  await setEnvLocal(devPairs)

  return true
}
