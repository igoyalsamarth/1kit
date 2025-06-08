import { Node, SyntaxKind } from "ts-morph"

import { PackageConfig } from "../../../types"
import { OneKitConfig } from "../../config-defaults"
import { writePackages } from "../../package-manager"

export async function setupClerkAuth(config: OneKitConfig) {
  const { projectName, fileManager } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // Install required dependencies
  const dependencies: PackageConfig[] = [
    { name: "@clerk/nextjs", version: "^4.29.0" },
    { name: "@clerk/themes", version: "^1.7.9" },
  ]

  await writePackages(projectName, dependencies)

  // Create middleware.ts
  await fileManager.createFile(
    "middleware.ts",
    `import { authMiddleware } from '@clerk/nextjs'
 
export default authMiddleware({
  publicRoutes: ["/"]
})
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}`
  )

  // Update layout.tsx with Clerk Provider
  const layoutFile = await fileManager.getOrCreateFile("app/layout.tsx")

  // Add Clerk imports
  await fileManager.addImports(layoutFile, [
    { name: "ClerkProvider", path: "@clerk/nextjs" },
    { name: "SignInButton", path: "@clerk/nextjs" },
    { name: "SignUpButton", path: "@clerk/nextjs" },
    { name: "SignedIn", path: "@clerk/nextjs" },
    { name: "SignedOut", path: "@clerk/nextjs" },
    { name: "UserButton", path: "@clerk/nextjs" },
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

  // Create the new JSX structure
  const clerkProviderJsx = `<ClerkProvider>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          ${existingChildren.map((child) => child.getText()).join("\n")}
        </ClerkProvider>`

  // Replace the body content with the new structure
  bodyTag.getJsxChildren().forEach((child) => {
    if (Node.isJsxElement(child)) {
      child.replaceWithText("")
    }
  })
  bodyTag.setBodyText(clerkProviderJsx)

  await layoutFile.save()
  await fileManager.formatFile(layoutFile)

  return true
}
