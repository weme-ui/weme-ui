import { z } from 'zod'
import { inlineCssVars } from './shared'

export const projectRepo = z.strictObject({
  /**
   * Repository name.
   *
   * @example 'https://github.com/weme-ui/weme-ui'
   */
  repo: z.string().trim(),

  /**
   * Registry name.
   *
   * @example 'weme-ui/std'
   */
  registry: z.string().toLowerCase().trim(),

  /**
   * Whether to use this registry as the default one.
   *
   * @default false
   */
  default: z.boolean().default(false).optional(),

  /**
   * Prefix for the registry item's files.
   *
   * @example Add components to `${paths.components}/ui` -> `UiComponentName`
   * @default 'ui'
   */
  prefix: z.string().toLowerCase().trim().default('ui').optional(),

  /**
   * License for the private registry.
   */
  license: z.string().trim().optional(),
})

export const projectPaths = z.strictObject({
  components: z.string().trim().default('~/components'),
  composables: z.string().trim().default('~/composables').optional(),
  layouts: z.string().trim().default('~/layouts').optional(),
  pages: z.string().trim().default('~/pages').optional(),
  plugins: z.string().trim().default('~/plugins').optional(),
  themes: z.string().trim().default('~/themes').optional(),
  types: z.string().trim().default('~/types').optional(),
  utils: z.string().trim().default('~/utils').optional(),
})

export const projectUnoCssColors = z.record(z.string().trim(), z.string().trim())

export const projectSchema = z.strictObject({
  /**
   * Schema URL.
   */
  $schema: z.url().trim(),

  /**
   * Repos to fetch the components from.
   *
   * @example
   * ```json
   * {
   *   "repos": [
   *     {
   *       "repo": "@weme-ui/weme-ui",
   *       "registry": "weme-ui/std",
   *       "prefix": "ui"
   *     }
   *   ]
   * }
   * ```
   */
  repos: z.array(projectRepo),

  /**
   * Paths for the project.
   *
   * Registry item files will be written to these paths.
   *
   * @example
   * ```json
   * {
   *   "paths": {
   *     "components": "~/components",
   *     "composables": "~/composables",
   *     "layouts": "~/layouts",
   *     "pages": "~/pages",
   *     "plugins": "~/plugins",
   *     "themes": "~/themes",
   *     "types": "~/types",
   *     "utils": "~/utils"
   *   }
   * }
   * ```
   */
  paths: projectPaths,

  /**
   * UnoCSS Preset options.
   */
  unocss: z.object({
    /**
     * Prefix for the CSS variables.
     *
     * @default 'ui'
     */
    variablePrefix: z.string().toLowerCase().trim().default('ui').optional(),

    /**
     * Custom accent colors for the project.
     *
     * @example
     * ```json
     * {
     *   "accentColors": {
     *     "ocean": "#0072e6"
     *   }
     * }
     * ```
     */
    accentColors: projectUnoCssColors.optional(),

    /**
     * Custom neutral colors for the project.
     *
     * @example
     * ```json
     * {
     *   "neutralColors": {
     *     "grey": "#f1f5f9"
     *   }
     * }
     * ```
     */
    neutralColors: projectUnoCssColors.optional(),

    /**
     * Custom CSS variables for the project.
     *
     * @example
     *
     * `--${unocss.prefix}-component-property`: `value`;
     *
     * ```json
     * {
     *   "cssVars": {
     *     "component": {
     *       "property": "value"
     *     }
     *   }
     * }
     * ```
     */
    cssVars: inlineCssVars.optional(),
  }).optional(),
})

export type ProjectSchema = z.infer<typeof projectSchema>
export type ProjectRepo = z.infer<typeof projectRepo>
export type ProjectPaths = z.infer<typeof projectPaths>
export type ProjectUnoCssColors = z.infer<typeof projectUnoCssColors>
