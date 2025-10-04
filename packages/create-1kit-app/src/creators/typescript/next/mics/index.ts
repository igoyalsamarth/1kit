import {
  HuskyAndCommitLintProvider,
  LintFormatProvider,
  OneKitConfig,
} from "../../../../utils/config-defaults"
import { setupHusky } from "./husky"
import { setupPrettier } from "./prettier"

export async function setupMics(
  config: OneKitConfig,
  packageManager: string
): Promise<boolean> {
  const { framework, huskyAndCommitLint } = config

  // Handle ESLint configuration
  let eslintSuccess = true
  if (framework.eslint === LintFormatProvider.ESLINT_PRETTIER) {
    eslintSuccess = await setupPrettier(config)
  } else if (
    ![
      LintFormatProvider.NONE,
      LintFormatProvider.ESLINT,
      LintFormatProvider.BIOME,
    ].includes(framework.eslint)
  ) {
    throw new Error(`Linting provider ${framework.eslint} not supported`)
  }

  // Handle Husky configuration
  let huskySuccess = true
  if (
    huskyAndCommitLint === HuskyAndCommitLintProvider.HUSKY_COMMIT_LINT ||
    huskyAndCommitLint === HuskyAndCommitLintProvider.HUSKY
  ) {
    const withCommitLint =
      huskyAndCommitLint === HuskyAndCommitLintProvider.HUSKY_COMMIT_LINT
    huskySuccess = await setupHusky(config, packageManager, withCommitLint)
  } else if (huskyAndCommitLint !== HuskyAndCommitLintProvider.NONE) {
    throw new Error(
      `Husky and Commit Lint provider ${huskyAndCommitLint} not supported`
    )
  }

  return eslintSuccess && huskySuccess
}
