export function useConfig(): ComputedRef<DocsConfig>
export function useConfig<K extends keyof DocsConfig>(key: K): ComputedRef<DocsConfig[K]>
export function useConfig<K extends keyof DocsConfig>(key?: K): ComputedRef<DocsConfig | DocsConfig[K]> {
  const appConfig = computed<DocsConfig>(() => useAppConfig()?.docs || {})

  return computed(() => {
    if (!key) {
      return appConfig.value
    }

    return appConfig.value[key]
  })
}
