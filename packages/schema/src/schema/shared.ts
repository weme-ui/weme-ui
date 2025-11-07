import { z } from 'zod'

export const inlineCssVars = z.record(z.string().trim(), z.string().trim())
export const nestedCssVars = z.record(z.string().trim(), z.record(z.string().trim(), z.string().trim()))

export type InlineCssVars = z.infer<typeof inlineCssVars>
export type NestedCssVars = z.infer<typeof nestedCssVars>
