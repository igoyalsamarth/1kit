import { Node, SyntaxKind } from "ts-morph"

import { OneKitConfig } from "../../../utils/config-defaults"

export async function setupClientProvider(config: OneKitConfig) {
  const { fileManager } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // Create client-provider.tsx file
  await fileManager.createFile(
    "providers/client-provider.tsx",
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

  // Update layout.tsx with ClientProvider
  const layoutFile = await fileManager.getOrCreateFile("app/layout.tsx")

  // Add ClientProvider import
  await fileManager.addImports(layoutFile, [
    { name: "ClientProvider", path: "@/providers/client-provider" },
  ])

  // Find the body tag in the layout file
  const bodyTag = layoutFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .find(
      (node) => node.getOpeningElement().getTagNameNode().getText() === "body"
    )

  if (!bodyTag) {
    throw new Error("Could not find body tag in layout file")
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
