import { readFileSync } from 'node:fs'

export function readPackageJson() {
  return JSON.parse(readFileSync('package.json', 'utf8'))
}
