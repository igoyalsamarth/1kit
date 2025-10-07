import childProcess from "node:child_process"
import fs from "node:fs"
import path from "node:path"

import { OneKitConfig } from "../../utils/config-defaults"

export async function setupGit(config: OneKitConfig): Promise<boolean> {
  const { projectName } = config
  const projectCwd = path.resolve(process.cwd(), projectName)

  // Read and update .gitignore
  const gitignorePath = path.join(projectCwd, ".gitignore")

  let gitignoreContent = ""
  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, "utf8")
  }

  // Add !.env.example if it doesn't exist
  if (!gitignoreContent.includes("!.env.example")) {
    gitignoreContent += "\n!.env.example"
    fs.writeFileSync(gitignorePath, gitignoreContent)
  }

  // Initialize git repo and make first commit
  const { execSync } = childProcess

  execSync("git init --initial-branch=main", { cwd: projectCwd })
  execSync("git add .", { cwd: projectCwd })
  execSync('git commit -m "Initial commit by create-1kit-app" --no-verify', {
    cwd: projectCwd,
  })

  return true
}
