import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: true,
  minify: true,
  target: "esnext",
  outDir: "dist",
  treeshake: true,
  banner: {
    js: `import { createRequire as topLevelCreateRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = topLevelCreateRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);`,
  },
})
