import { Node, SyntaxKind } from "ts-morph"

import { PackageConfig } from "../../../../types"
import { OneKitConfig } from "../../../../utils/config-defaults"
import { writePackages } from "../../../../utils/package-manager"

export async function setupReactQuery(config: OneKitConfig) {
  const { fileManager, projectName } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // Install React Query packages
  const packages: PackageConfig[] = [
    {
      name: "@tanstack/react-query",
      version: "^5.74.4",
    },
    {
      name: "@tanstack/react-query-devtools",
      version: "^5.74.4",
    },
  ]

  await writePackages(projectName, packages)

  // Create lib/queryClient.ts file
  await fileManager.createFile(
    "service/queryClient.ts",
    `import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // Cache for 1 hour
    },
  },
});
`
  )

  // Update ClientProvider to include React Query
  const clientProviderFile = await fileManager.getOrCreateFile(
    "providers/client-provider.tsx"
  )

  // Add React Query imports
  await fileManager.addImports(clientProviderFile, [
    { name: "QueryClientProvider", path: "@tanstack/react-query" },
    { name: "ReactQueryDevtools", path: "@tanstack/react-query-devtools" },
    { name: "queryClient", path: "../lib/queryClient" },
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

  // Find the return statement
  const returnStatement = functionBody
    .getDescendantsOfKind(SyntaxKind.ReturnStatement)
    .find((stmt) => stmt.getParent() === functionBody)

  if (!returnStatement) {
    throw new Error("Could not find return statement in ClientProvider")
  }

  // Get the existing JSX content
  const existingJsx = returnStatement.getExpression()?.getText() || ""

  // Create new JSX with QueryClientProvider wrapper
  const newJsx = `(
    <QueryClientProvider client={queryClient}>
      ${existingJsx}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )`

  // Replace the return statement
  returnStatement.replaceWithText(`return ${newJsx}`)

  await clientProviderFile.save()
  await fileManager.formatFile(clientProviderFile)

  return true
}
