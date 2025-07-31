import { Node, SyntaxKind } from "ts-morph"

import { PackageConfig } from "../../../../types"
import { OneKitConfig } from "../../../../utils/config-defaults"
import { writePackages } from "../../../../utils/package-manager"

export async function setupMixpanel(config: OneKitConfig) {
  const { fileManager, projectName } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // Install mixpanel-browser package
  const packages: PackageConfig[] = [
    {
      name: "mixpanel-browser",
      version: "^2.65.0",
    },
  ]

  await writePackages(projectName, packages)

  // Create lib/mixpanelClient.ts file
  await fileManager.createFile(
    "lib/mixpanelClient.ts",
    `import mixpanel from 'mixpanel-browser';
 
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
 
export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }
 
  mixpanel.init(MIXPANEL_TOKEN, { autocapture: true });
}
`
  )

  // Update ClientProvider to include Mixpanel initialization
  const clientProviderFile = await fileManager.getOrCreateFile(
    "providers/client-provider.tsx"
  )

  // Add React import for useEffect if not already present
  await fileManager.addImports(clientProviderFile, [
    { name: "useEffect", path: "react" },
    { name: "initMixpanel", path: "../../lib/mixpanelClient" },
  ])

  // Find the ClientProvider function component
  const clientProviderFunction = clientProviderFile
    .getDescendantsOfKind(SyntaxKind.FunctionDeclaration)
    .find((fn) => fn.getName() === "ClientProvider")

  if (!clientProviderFunction) {
    throw new Error("Could not find ClientProvider function")
  }

  // Get the function body
  const functionBody = clientProviderFunction.getBody()
  if (!Node.isBlock(functionBody)) {
    throw new Error("ClientProvider function body is not a block")
  }

  // Add useEffect at the beginning of the function body
  const useEffectStatement = `useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);`

  // Insert the useEffect after any existing variable declarations
  const statements = functionBody.getStatements()
  const insertIndex = statements.findIndex((stmt) =>
    Node.isReturnStatement(stmt)
  )

  if (insertIndex === -1) {
    throw new Error("Could not find return statement in ClientProvider")
  }

  functionBody.insertStatements(insertIndex, [useEffectStatement])

  await clientProviderFile.save()
  await fileManager.formatFile(clientProviderFile)

  return true
}
