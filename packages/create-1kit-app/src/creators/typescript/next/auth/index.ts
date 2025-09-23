import { AuthProvider, OneKitConfig } from "../../../../utils/config-defaults"
import { setupClerkAuth } from "./clerk"

export async function setupAuth(config: OneKitConfig): Promise<boolean> {
  const { auth } = config

  switch (auth) {
    case AuthProvider.CLERK:
      return await setupClerkAuth(config)
    default:
      throw new Error(`Auth provider ${auth} not supported`)
  }
}
