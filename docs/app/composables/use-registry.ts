import manifest from '../../../registry/manifest.json'

export function useRegistry() {
  const registry = useCookie('weme-ui-registry', { default: () => 'std' })

  const registries = computed(() => manifest.map(m => ({
    id: m.id,
    name: m.name,
    version: m.version,
  })))

  return {
    registries,
    registry,
  }
}
