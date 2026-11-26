import type { Plugin } from 'vite'
import type { Options } from './types'
import { exactRegex } from '@rolldown/pluginutils'
import { loadConfig } from './loader'

const VIRTUAL_ID = 'virtual:weme-ui-config'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

export default function VitePlugin(options?: Options): Plugin {
  const { configFile = 'weme.config.json' } = options ?? {}
  const resolvedId = `\0${VIRTUAL_ID}`

  function asArray<T = string>(v: unknown): T[] {
    return Array.isArray(v) ? (v.filter((x) => x != null) as T[]) : []
  }

  function emitCode(name: string, value: unknown) {
    return `export const ${name} = ${JSON.stringify(asArray(value))};`
  }

  return {
    name: 'weme-ui:config',
    enforce: 'pre',
    resolveId: {
      filter: { id: exactRegex(VIRTUAL_ID) },
      handler() {
        return RESOLVED_ID
      },
    },
    load: {
      filter: { id: exactRegex(RESOLVED_ID) },
      handler() {
        const config = loadConfig(configFile)
        if (!config || !config.theme) {
          return `export const accentColors = [];\nexport const neutralColors = [];`
        }

        const codes: string[] = [
          emitCode('accentColors', config.theme.accentColors),
          emitCode('neutralColors', config.theme.neutralColors),
        ]

        return codes.join('\n')
      },
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
