import { Node, SyntaxKind } from "ts-morph"

import { PackageConfig } from "../../../../types"
import { OneKitConfig } from "../../../../utils/config-defaults"
import { writePackages } from "../../../../utils/package-manager"

export async function setupGoogleAnalytics(config: OneKitConfig) {
  const { fileManager, projectName } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // Install @next/third-parties package
  const packages: PackageConfig[] = [
    {
      name: "@next/third-parties",
      version: "latest",
    },
  ]

  await writePackages(projectName, packages)

  // Update ClientProvider to include GoogleTagManager
  const clientProviderFile = await fileManager.getOrCreateFile(
    "providers/client-provider.tsx"
  )

  // Add GoogleTagManager import
  await fileManager.addImports(clientProviderFile, [
    { name: "GoogleTagManager", path: "@next/third-parties/google" },
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

  // Find the return statement and its JSX content
  const returnStatement = functionBody.getDescendantsOfKind(
    SyntaxKind.ReturnStatement
  )[0]

  if (!returnStatement) {
    throw new Error("Could not find return statement in ClientProvider")
  }

  // Get the JSX element - look for JsxElement or JsxParenthesizedExpression
  const expression = returnStatement.getExpression()
  let jsxElement = null

  if (Node.isParenthesizedExpression(expression)) {
    jsxElement = expression.getExpression()
  } else {
    jsxElement = expression
  }

  if (
    !jsxElement ||
    (!Node.isJsxElement(jsxElement) && !Node.isJsxFragment(jsxElement))
  ) {
    throw new Error("Return statement does not contain JSX")
  }

  // Add GoogleTagManager as the first child of the div element
  if (Node.isJsxElement(jsxElement)) {
    // Find the first JSX child position and insert GoogleTagManager there
    const children = jsxElement.getJsxChildren()
    const firstChild = children[0]

    if (firstChild) {
      // Insert GoogleTagManager before the first child
      firstChild.replaceWithText(`<GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      ${firstChild.getText()}`)
    } else {
      // If no children, add GoogleTagManager as the only child
      jsxElement.setBodyText(`
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
    `)
    }
  }

  await clientProviderFile.save()
  await fileManager.formatFile(clientProviderFile)

  return true
}
