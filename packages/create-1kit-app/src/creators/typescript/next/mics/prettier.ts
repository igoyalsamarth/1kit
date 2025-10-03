import { PackageConfig } from "../../../../types"
import { OneKitConfig } from "../../../../utils/config-defaults"
import { writePackages } from "../../../../utils/package-manager"

export async function setupPrettier(config: OneKitConfig) {
  const { fileManager, projectName } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // Install Prettier packages
  const packages: PackageConfig[] = [
    {
      name: "prettier",
      version: "^3.5.3",
    },
    {
      name: "@ianvs/prettier-plugin-sort-imports",
      version: "^4.4.2",
    },
  ]

  await writePackages(projectName, packages)

  // Create .prettierignore
  await fileManager.createFile(
    ".prettierignore",
    `dist
node_modules
.next
build`
  )

  // Create prettier.config.cjs
  await fileManager.createFile(
    "prettier.config.cjs",
    `/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@workspace/(.*)$",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/registry/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "^@/www/(.*)$",
    "",
    "^[./]",
  ],
  importOrderTypeScriptVersion: "5.8.3",
  plugins: ["@ianvs/prettier-plugin-sort-imports"]
}`
  )

  return true
}
