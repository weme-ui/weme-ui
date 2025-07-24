import consola from 'consola'
import { resolve } from 'pathe'
import { FileReader } from './file.mjs'
import { handlebars } from './handlebars.mjs'

export function renderString(template, data) {
  return handlebars.compile(template)(data)
}

export function renderTemplate(path, data) {
  try {
    const templates = resolve('./scripts/templates')
    const reader = new FileReader(templates)
    const template = reader.read(path)

    return renderString(template, data)
  }
  catch (e) {
    consola.debug(e)
  }
}
