import path from "node:path"
import fs from "fs-extra"

type EnvPairs = Record<string, string>

async function upsertEnvFile(
  targetDir: string,
  fileName: ".env" | ".env.local" | ".env.example",
  pairs: EnvPairs
): Promise<void> {
  const filePath = path.resolve(targetDir, fileName)

  await fs.ensureFile(filePath)

  const existingRaw = await fs.readFile(filePath, "utf8").catch(() => "")
  const existingLines = existingRaw.split(/\r?\n/)

  const keyToIndex = new Map<string, number>()
  for (let i = 0; i < existingLines.length; i++) {
    const line = existingLines[i]
    if (!line || line.trim().startsWith("#")) continue
    const eq = line.indexOf("=")
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    if (key) keyToIndex.set(key, i)
  }

  const lines = [...existingLines]
  const ensureTrailingNewline = () => {
    if (lines.length === 0) return
    const last = lines[lines.length - 1]
    if (last !== "") lines.push("")
  }

  for (const [key, value] of Object.entries(pairs)) {
    const sanitizedKey = key.trim()
    const sanitizedValue = value ?? ""
    const valueString = needsQuoting(sanitizedValue)
      ? JSON.stringify(sanitizedValue)
      : sanitizedValue

    if (keyToIndex.has(sanitizedKey)) {
      const idx = keyToIndex.get(sanitizedKey) as number
      lines[idx] = `${sanitizedKey}=${valueString}`
    } else {
      ensureTrailingNewline()
      lines.push(`${sanitizedKey}=${valueString}`)
    }
  }

  const output = lines.join("\n").replace(/\s+$/g, "").concat("\n")
  await fs.writeFile(filePath, output, "utf8")
}

function needsQuoting(value: string): boolean {
  // Quote when value contains spaces, leading/trailing spaces, #, ", ', or =
  return /\s|#|"|'|=/.test(value) || value !== value.trim()
}

export async function setEnv(
  pairs: EnvPairs,
  options: { cwd?: string } = {}
): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  await upsertEnvFile(cwd, ".env", pairs)
}

export async function setEnvLocal(
  pairs: EnvPairs,
  options: { cwd?: string } = {}
): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  await upsertEnvFile(cwd, ".env.local", pairs)
}

export async function setEnvExample(
  pairs: EnvPairs,
  options: { cwd?: string } = {}
): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const keysOnlyPairs: EnvPairs = Object.fromEntries(
    Object.keys(pairs).map((key) => [key, ""])
  )
  await upsertEnvFile(cwd, ".env.example", keysOnlyPairs)
}
