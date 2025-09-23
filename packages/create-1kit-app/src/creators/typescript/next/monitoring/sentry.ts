import { PackageConfig } from "../../../../types"
import { OneKitConfig } from "../../../../utils/config-defaults"
import { writePackages } from "../../../../utils/package-manager"

export async function setupSentry(config: OneKitConfig) {
  const { fileManager, projectName } = config

  if (!fileManager) {
    throw new Error("File manager instance not initialized")
  }

  // Install @sentry/nextjs package
  const packages: PackageConfig[] = [
    {
      name: "@sentry/nextjs",
      version: "^9.40.0",
    },
  ]

  await writePackages(projectName, packages)

  // Update next.config.ts with Sentry configuration
  const nextConfigFile = await fileManager.getOrCreateFile("next.config.ts")

  // Add Sentry import
  await fileManager.addImports(nextConfigFile, [
    { name: "{ withSentryConfig }", path: "@sentry/nextjs" },
  ])

  // Replace the export with Sentry-wrapped config
  const fileContent = nextConfigFile.getFullText()

  // Find and replace the export statement
  if (fileContent.includes("export default")) {
    const updatedContent = fileContent.replace(
      /export default\s+[^;]+/,
      `// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
  org: "example-org",
  project: "example-project",

  // Only print logs for uploading source maps in CI
  // Set to \`true\` to suppress logs
  silent: !process.env.CI,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});`
    )
    nextConfigFile.replaceWithText(updatedContent)
  }

  await nextConfigFile.save()
  await fileManager.formatFile(nextConfigFile)

  // Create instrumentation.ts
  await fileManager.createFile(
    "instrumentation.ts",
    `export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
`
  )

  // Create sentry.server.config.ts
  await fileManager.createFile(
    "sentry.server.config.ts",
    `import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTY_DSN,

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  integrations: [
  ],
  // Note: if you want to override the automatic release value, do not set a
  // \`release\` value here - use the environment variable \`SENTRY_RELEASE\`, so
  // that it will also get attached to your source maps
});

// This export will instrument router navigations, and is only relevant if you enable tracing.
// \`captureRouterTransitionStart\` is available from SDK version 9.12.0 onwards
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
`
  )

  // Create sentry.client.config.ts (this was called instrumentation-client.ts in the request)
  await fileManager.createFile(
    "sentry.client.config.ts",
    `import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTY_DSN,

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  integrations: [
  ],
  // Note: if you want to override the automatic release value, do not set a
  // \`release\` value here - use the environment variable \`SENTRY_RELEASE\`, so
  // that it will also get attached to your source maps
});

// This export will instrument router navigations, and is only relevant if you enable tracing.
// \`captureRouterTransitionStart\` is available from SDK version 9.12.0 onwards
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
`
  )

  // Create sentry.edge.config.ts
  await fileManager.createFile(
    "sentry.edge.config.ts",
    `import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTY_DSN,

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // \`release\` value here - use the environment variable \`SENTRY_RELEASE\`, so
  // that it will also get attached to your source maps
});
`
  )

  // Create app/global-error.tsx
  await fileManager.createFile(
    "app/global-error.tsx",
    `"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* \`NextError\` is the default Next.js error page component. Its type
        definition requires a \`statusCode\` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
`
  )

  return true
}
