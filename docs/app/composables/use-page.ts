import type { DocsCollectionItem } from '@nuxt/content'

export function usePage() {
  const config = useConfig()
  const page = inject<Ref<DocsCollectionItem | null>>('page', ref(null))

  return computed(() => ({
    ...page.value,

    navs: page.value?.navs || config.value.header?.navs,

    theme: {
      sidebar: {
        enabled: page.value?.theme?.sidebar?.enabled ?? true,
        splitNav: page.value?.theme?.sidebar?.splitNav ?? true,
      },
      footer: page.value?.theme?.footer ?? true,
      outline: page.value?.theme?.outline ?? true,
      fillContainer: page.value?.theme?.fillContainer ?? false,
      custom: page.value?.theme?.custom ?? false,
    },
  } as DocsCollectionItem))
}
