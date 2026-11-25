import type { Plugin } from 'vite'
import type { Options } from './types'
import { loadConfig } from './loader'

const VIRTUAL_ID = 'weme-ui:config'

export default function VitePlugin(options: Options): Plugin {
  const { configFile = 'weme.config.json' } = options
  const resolvedId = `\0${VIRTUAL_ID}`

  function asArray<T = string>(v: unknown): T[] {
    return Array.isArray(v) ? (v.filter((x) => x != null) as T[]) : []
  }

  function emitCode(name: string, value: unknown) {
    return `export const ${name}: string[] = ${JSON.stringify(asArray(value))};`
  }

  return {
    name: 'weme-ui:config',
    enforce: 'pre',
    resolveId(id) {
      if (id === VIRTUAL_ID) return resolvedId
    },
    load(id) {
      if (id !== resolvedId) return

      const config = loadConfig(configFile)
      if (!config || !config.theme) {
        return `export const accentColors:string[] = [];\nexport const neutralColors:string[] = [];\nexport const colorPalettes:string[] = [];`
      }

      const codes: string[] = [
        emitCode('accentColors', config.theme.accentColors),
        emitCode('neutralColors', config.theme.neutralColors),
        emitCode('colorPalettes', config.theme.colorPalettes),
      ]

      return codes.join('\n')
    },
    configureServer(server) {
      const reload = () => {
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }

      server.watcher.on('change', (file) => {
        if (file.endsWith(configFile)) {
          reload()
        }
      })
    },
  }
}
