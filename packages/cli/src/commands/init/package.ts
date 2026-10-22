import { writeFile } from '../../utils'

const defaultPackageJson = `{
  "name": "weme-ui-project",
  "type": "module",
  "version": "0.0.0",
  "sideEffects": false,
  "engines": {
    "node": ">=22.14.0",
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@weme-ui/schema": "latest"
  }
}
`

export async function generateDefaultPackage(root: string) {
  return await writeFile(root, 'package.json', defaultPackageJson)
}
