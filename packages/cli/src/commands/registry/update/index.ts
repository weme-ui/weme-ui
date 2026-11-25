import type { RegistryItem } from '../utils'
import { defineCommand } from 'citty'
import { resolve } from 'node:path/posix'
import { cwd, exit } from 'node:process'
import { unwrapError } from '../../../utils'
import {
  hasDiffFiles,
  loadRegistryJson,
  resolveRegistryPaths,
  scanPath,
  writeRegistryJson,
} from '../utils'

/**
 * 更新注册表项目
 */
export default defineCommand({
  meta: {
    name: 'update',
    description: 'Update registry items from remote',
  },

  args: {
    cwd: {
      type: 'string',
      description: 'Change working directory to the project root.',
      default: cwd(),
    },
  },

  async run({ args }) {
    const cwd = resolve(args.cwd)

    try {
      const registryConfig = loadRegistryJson(cwd)
      const paths = resolveRegistryPaths(cwd, registryConfig)

      const items: RegistryItem[] = []
      const newItems: RegistryItem[] = []
      const changedItems: RegistryItem[] = []

      Object.entries(paths).forEach(([_type, path]) => {
        if (_type !== '~' && path) {
          const scannedItems = scanPath(path)
          const type = _type as RegistryItem['type']

          Object.entries(scannedItems).forEach(([name, files]) => {
            const registryItem = registryConfig.items?.find((item) => item.name === name)

            if (registryItem) {
              const hasDiff = hasDiffFiles(
                registryItem.files,
                files.map((f) => ({ ...f, path: f.path.replace(cwd + '/', '') })),
              )

              if (hasDiff) {
                changedItems.push(registryItem)
              }

              items.push(registryItem)
            } else {
              if (type !== 'component') {
                files.forEach((file) => {
                  const newItem: RegistryItem = {
                    name,
                    type,
                    when: 'on-depended',
                    files: [
                      {
                        type,
                        kind: file.kind,
                        path: file.path.replace(cwd + '/', ''),
                      },
                    ],
                  }

                  newItems.push(newItem)
                  items.push(newItem)
                })
              } else {
                const newItem: RegistryItem = {
                  name,
                  type,
                  when: 'on-depended',
                  files: files.map((file) => ({
                    type,
                    kind: file.kind,
                    path: file.path.replace(cwd + '/', ''),
                  })),
                }

                newItems.push(newItem)
                items.push(newItem)
              }
            }
          })
        }
      })

      if (newItems.length) {
        registryConfig.items = [...registryConfig.items, ...newItems]
      }

      writeRegistryJson(cwd, registryConfig)

      console.log(
        `${newItems.length} new items, ${changedItems.length} changed items, ${items.length} total items`,
      )
    } catch (err) {
      console.error(unwrapError(err))
      exit(1)
    }
  },
})
