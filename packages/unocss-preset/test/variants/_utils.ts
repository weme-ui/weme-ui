import { theme } from '~/theme/default'

export function createContext(themeOverrides = {}) {
  return {
    theme: {
      ...theme({}),
      ...themeOverrides,
    },
    generator: {
      config: {
        separators: [':'],
      },
      userConfig: {},
    },
  } as any
}

export function applyHandle(result: any, input: Record<string, any> = {}) {
  return result.handle({
    selector: '.x',
    parent: '',
    prefix: '',
    entries: [['color', 'red']],
    ...input,
  }, (nextInput: unknown) => nextInput)
}

export function matchVariant(variant: any, matcher: string, ctx = createContext()) {
  return variant.match?.(matcher, ctx)
}
