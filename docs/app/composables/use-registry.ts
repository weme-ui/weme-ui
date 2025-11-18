import manifest from '../../../registry/manifest.json'

export function useRegistry(): { id: string, name: string, version: string } [] {
  return manifest.map(m => ({
    id: m.id,
    name: m.name,
    version: m.version,
  }))
}
