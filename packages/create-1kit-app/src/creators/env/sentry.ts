import { setEnv, setEnvExample, setEnvLocal } from "@/src/utils/env-utils"

export async function setupSentryEnv(cwd?: string): Promise<boolean> {
  const pairs = {
    NEXT_PUBLIC_SENTRY_DSN: "https://***.ingest.de.sentry.io/***",
  }

  await setEnv(pairs, { cwd })
  await setEnvLocal(pairs, { cwd })
  await setEnvExample(pairs, { cwd })

  return true
}
