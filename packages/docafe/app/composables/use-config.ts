export function useConfig(): ComputedRef<DocafeConfig>
export function useConfig<K extends keyof DocafeConfig>(key: K): ComputedRef<DocafeConfig[K]>
export function useConfig<K extends keyof DocafeConfig>(key?: K): ComputedRef<DocafeConfig | DocafeConfig[K]> {
  const appConfig = computed<DocafeConfig>(() => useAppConfig()?.docafe || {})

  return computed(() => {
    if (!key) {
      return appConfig.value
    }

    return appConfig.value[key]
  })
}
