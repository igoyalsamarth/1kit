import { OneKitConfig } from "../../utils/config-defaults"
import { createNextApp } from "./next"

export async function createProject(
  config: OneKitConfig,
  packageManager: "yarn" | "pnpm" | "bun" | "npm" | "deno"
) {
  switch (config.framework.name.toLowerCase()) {
    case "next":
      return createNextApp(config, packageManager)
    case "vite":
      // TODO: Implement Vite project creation
      throw new Error("Vite project creation not yet implemented")
    default:
      throw new Error(`Unsupported framework: ${config.framework.name}`)
  }
}
