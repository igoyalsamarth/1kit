import path from "node:path"
import fs from "fs-extra"

import { PackageConfig } from "../types"

/**
 * Adds dependencies to package.json
 * @param projectName Name of the project/directory containing package.json
 * @param packages Array of package configurations
 * @returns Promise<void>
 */
export async function writePackages(
  projectName: string,
  packages: PackageConfig[]
): Promise<void> {
  try {
    // Read existing package.json
    const packageJsonPath = path.join(
      process.cwd(),
      projectName,
      "package.json"
    )
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8")
    const packageJson = JSON.parse(packageJsonContent)

    // Initialize dependencies objects if they don't exist
    packageJson.dependencies = packageJson.dependencies || {}
    packageJson.devDependencies = packageJson.devDependencies || {}

    // Add each package
    for (const pkg of packages) {
      const version = pkg.version || "latest"
      const targetObject = pkg.isDev
        ? packageJson.devDependencies
        : packageJson.dependencies

      // Only add if not already present
      if (!targetObject[pkg.name]) {
        targetObject[pkg.name] = version
      }
    }

    // Write back to package.json with proper formatting
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n"
    )
  } catch (error) {
    console.error("Failed to update package.json:", error)
    throw error
  }
}
