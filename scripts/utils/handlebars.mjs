import handlebars from 'handlebars'
import { camelCase, kebabCase, pascalCase, titleCase } from 'scule'

handlebars.registerHelper('titleCase', titleCase)
handlebars.registerHelper('kebabCase', kebabCase)
handlebars.registerHelper('camelCase', camelCase)
handlebars.registerHelper('pascalCase', pascalCase)

handlebars.registerHelper('lowerCase', value => value.toLowerCase())

export {
  handlebars,
}
