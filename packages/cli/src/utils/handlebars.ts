import handlebars from 'handlebars'
import { camelCase, kebabCase, pascalCase, titleCase } from 'scule'

handlebars.registerHelper('titleCase', value => titleCase(value))
handlebars.registerHelper('kebabCase', value => kebabCase(value))
handlebars.registerHelper('camelCase', value => camelCase(value))
handlebars.registerHelper('pascalCase', value => pascalCase(value))
handlebars.registerHelper('lowerCase', value => value.toLowerCase())
handlebars.registerHelper('erase', (value, target) => value.replaceAll(target, ''))

export function compile(input: string, data?: Record<string, any>) {
  return handlebars.compile(input)(data)
}
