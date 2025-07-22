#!/usr/bin/env node
import { init } from "@/src/commands/init"
import { Command } from "commander"

import packageJson from "../package.json"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name("1kit")
    .description("1kit is a CLI for creating and managing 1kit projects")
    .version(
      packageJson.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )

  // Add init as a subcommand
  program.addCommand(init)

  // Make init the default action when no command is specified
  program.action(async () => {
    // Run the init command by default
    await init.parseAsync(process.argv)
  })

  program.parse()
}

main()
