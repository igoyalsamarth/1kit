import {
  LintFormatProvider,
  OneKitConfig,
} from "../../../../utils/config-defaults"
import { setupPrettier } from "./prettier"

export async function setupMics(config: OneKitConfig): Promise<boolean> {
  const { framework } = config

  switch (framework.eslint) {
    case LintFormatProvider.ESLINT_PRETTIER:
      return await setupPrettier(config)
    case LintFormatProvider.NONE:
    case LintFormatProvider.ESLINT:
    case LintFormatProvider.BIOME:
      return true
    default:
      throw new Error(`Linting provider ${framework.eslint} not supported`)
  }
}
