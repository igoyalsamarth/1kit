/**
 * Configuration for a package dependency
 */
export interface PackageConfig {
  /**
   * Name of the package
   */
  name: string

  /**
   * Version of the package (optional, defaults to 'latest')
   */
  version?: string

  /**
   * Whether this is a dev dependency
   */
  isDev?: boolean
}
