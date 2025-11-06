import * as p from '@clack/prompts'
import handlebars from 'handlebars'
import { camelCase, kebabCase, pascalCase, titleCase } from 'scule'

handlebars.registerHelper('titleCase', value => titleCase(value))
handlebars.registerHelper('kebabCase', value => kebabCase(value))
handlebars.registerHelper('camelCase', value => camelCase(value))
handlebars.registerHelper('pascalCase', value => pascalCase(value))
handlebars.registerHelper('lowerCase', value => value.toLowerCase())

export function compile(input: string, data?: Record<string, any>) {
  return handlebars.compile(input)(data)
}

export function merge(...packages: string[]): string[] {
  return packages.reduce((acc, item) => {
    if (!acc.includes(item))
      acc.push(item)
    return acc
  }, [] as string[])
}

export async function runStep<T>(
  loading: string,
  fn: (spinner: ReturnType<typeof p.spinner>) => Promise<T>,
): Promise<T> {
  const spinner = p.spinner()

  spinner.start(loading)

  return fn(spinner)
}
