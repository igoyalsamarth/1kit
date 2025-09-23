import { PackageConfig } from "../../../../types"
import { OneKitConfig } from "../../../../utils/config-defaults"
import { writePackages } from "../../../../utils/package-manager"

export async function setupAxios(config: OneKitConfig) {
  const { fileManager, projectName } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // Install axios package
  const packages: PackageConfig[] = [
    {
      name: "axios",
      version: "^1.8.4",
    },
  ]

  await writePackages(projectName, packages)

  // Create service/api.ts file
  await fileManager.createFile(
    "service/api.ts",
    `import axios from "axios";

// Create axios instance with default config
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
`
  )

  return true
}
