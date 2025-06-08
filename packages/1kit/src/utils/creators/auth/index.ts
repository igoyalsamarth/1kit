import { OneKitConfig } from "../../config-defaults"
import { setupClerkAuth } from "./clerk"

export enum AuthProvider {
  CLERK = "clerk",
  // Add more providers as needed
}

export async function setupAuth(config: OneKitConfig): Promise<boolean> {
  const { auth } = config

  switch (auth) {
    case AuthProvider.CLERK:
      return await setupClerkAuth(config)
    default:
      throw new Error(`Auth provider ${auth} not supported`)
  }
}
