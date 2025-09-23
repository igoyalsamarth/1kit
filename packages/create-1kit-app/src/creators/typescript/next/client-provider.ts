import { Node, SyntaxKind } from "ts-morph"

import { OneKitConfig } from "../../../utils/config-defaults"

export async function setupClientProvider(config: OneKitConfig) {
  const { fileManager } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // Check if client-provider.tsx already exists
  const clientProviderPath = "providers/client-provider.tsx"
  try {
    const existingFile = await fileManager.getOrCreateFile(clientProviderPath)
    const content = existingFile.getFullText().trim()
    if (content) {
      return true
    }
  } catch {
    // File doesn't exist or is empty, continue with creation
  }

  // Create the initial client provider file
  const newFile = await fileManager.createFile(
    clientProviderPath,
    `'use client'

import { ReactNode } from 'react'

interface ClientProviderProps {
  children: ReactNode
}

export function ClientProvider({ children }: ClientProviderProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
`
  )

  // Ensure the file is saved and formatted before continuing
  await newFile.save()
  await fileManager.formatFile(newFile)

  // Update layout.tsx with ClientProvider
  const layoutFile = await fileManager.getOrCreateFile("app/layout.tsx")

  // Check if ClientProvider import already exists
  const existingImports = layoutFile.getImportDeclarations()
  const hasClientProviderImport = existingImports.some((importDecl) => {
    const namedImports = importDecl.getNamedImports()
    return (
      namedImports.some((named) => named.getName() === "ClientProvider") &&
      importDecl.getModuleSpecifierValue() === "@/providers/client-provider"
    )
  })

  // Only add import if it doesn't exist
  if (!hasClientProviderImport) {
    await fileManager.addImports(layoutFile, [
      { name: "ClientProvider", path: "@/providers/client-provider" },
    ])
  }

  // Find the body tag in the layout file
  const bodyTag = layoutFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .find(
      (node) => node.getOpeningElement().getTagNameNode().getText() === "body"
    )

  if (!bodyTag) {
    throw new Error("Could not find body tag in layout file")
  }

  // Check if ClientProvider already exists
  const existingClientProvider = layoutFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .find(
      (node) =>
        node.getOpeningElement().getTagNameNode().getText() === "ClientProvider"
    )

  if (existingClientProvider) {
    // ClientProvider already exists, no need to add it again
    return true
  }

  // Get the existing children of the body tag
  const existingChildren = bodyTag.getJsxChildren()

  // Create the new JSX structure with ClientProvider
  const clientProviderJsx = `<ClientProvider>
          ${existingChildren.map((child) => child.getText()).join("\n")}
        </ClientProvider>`

  // Replace the body content with the new structure
  bodyTag.getJsxChildren().forEach((child) => {
    if (Node.isJsxElement(child) || Node.isJsxText(child)) {
      child.replaceWithText("")
    }
  })
  bodyTag.setBodyText(clientProviderJsx)

  await layoutFile.save()
  await fileManager.formatFile(layoutFile)

  return true
}
