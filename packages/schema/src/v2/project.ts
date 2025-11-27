import { z } from 'zod'
import { RegistryItemType } from './registry'
import { InlineCssVar } from './shared'

export const ProjectRegistryName = z.templateLiteral([
  z.string().lowercase().trim(),
  '/',
  z.string().lowercase().trim(),
  '/',
  z.string().lowercase().trim(),
])

export const ProjectRegistry = z.object({
  /**
   * Name of the registry.
   *
   * @example `<owner>/<repo>/<scope>`: 'weme-ui/weme-ui/std'
   */
  registry: ProjectRegistryName,

  /**
   * Prefix for the registry item's files.
   *
   * @example Add components to `${paths.components}/ui` -> `UiComponentName`
   * @default 'ui'
   */
  prefix: z.string().toLowerCase().trim().default('ui').optional(),

  /**
   * Whether to use this registry as the default one.
   *
   * @default false
   */
  default: z.boolean().default(false).optional(),

  /**
   * Version of the repository.
   *
   * @example `1.0.0`
   */
  version: z.string().trim().optional(),
})

export const ProjectPaths = z.object({
  components: z.string().trim().default('~/components'),
  composables: z.string().trim().default('~/composables').optional(),
  layouts: z.string().trim().default('~/layouts').optional(),
  pages: z.string().trim().default('~/pages').optional(),
  plugins: z.string().trim().default('~/plugins').optional(),
  themes: z.string().trim().default('~/themes').optional(),
  types: z.string().trim().default('~/types').optional(),
  utils: z.string().trim().default('~/utils').optional(),
})

export const ProjectCustomColor = z.record(z.string().lowercase().trim(), z.string().lowercase().trim())

export const ProjectUnoCss = z.object({
  /**
   * Prefix for the CSS variables.
   *
   * @default 'ui'
   */
  variablePrefix: z.string().lowercase().trim().default('ui').optional(),

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
  accentColors: ProjectCustomColor.optional(),

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
  neutralColors: ProjectCustomColor.optional(),

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
  cssVars: InlineCssVar.optional(),
})

export const ProjectItem = z.object({
  /**
   * Type of the item.
   *
   * - component
   * - layout
   * - theme
   * - block
   * - page
   */
  type: RegistryItemType,

  /**
   * Path of the item.
   *
   * @example `~/components/<prefix>/<name>`
   */
  path: z.string().trim(),
})

export const ProjectSchema = z.object({
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
   *       "registry": "weme-ui/weme-ui/std",
   *       "prefix": "ui",
   *       "version": "1.0.0",
   *       "default": true
   *     }
   *   ]
   * }
   * ```
   */
  repos: z.array(ProjectRegistry),

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
  paths: ProjectPaths,

  /**
   * UnoCSS Preset options.
   */
  unocss: ProjectUnoCss.optional(),

  /**
   * Installed items.
   *
   * @example
   * ```json
   * {
   *   "items": {
   *     "weme-ui/weme-ui/std": [
   *       { "type": "component", "path": "~/components/ui/badge" }
   *     ]
   *   }
   * }
   * ```
   */
  items: z.record(ProjectRegistryName, z.array(ProjectItem))
    .optional()
    .optional(),
})

export type IProject = z.infer<typeof ProjectSchema>
export type IProjectRegistry = z.infer<typeof ProjectRegistry>
export type IProjectRegistryName = z.infer<typeof ProjectRegistryName>
export type IProjectPaths = z.infer<typeof ProjectPaths>
export type IProjectUnoCss = z.infer<typeof ProjectUnoCss>
export type IProjectItem = z.infer<typeof ProjectItem>
