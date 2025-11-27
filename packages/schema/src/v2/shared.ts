import { z } from 'zod'

export const InlineCssVar = z.record(z.string().trim(), z.string().trim())
export const NestedCssVar = z.record(z.string().trim(), z.record(z.string().trim(), z.string().trim()))

export type IInlineCssVar = z.infer<typeof InlineCssVar>
export type INestedCssVar = z.infer<typeof NestedCssVar>
