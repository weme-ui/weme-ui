import type { ContentNavigationItem, DocsCollectionItem } from '@nuxt/content'

export function useContent() {
  const page = inject<Ref<DocsCollectionItem | null>>('page', ref(null))
  const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

  const config = useConfig()

  return {
    page: computed(() => {
      if (page.value) {
        return {
          ...page.value,
          topLevel: `/${page.value.path.split('/')[1]}`,
          navs: page.value.navs || config.value.header?.navs,
          theme: {
            ...page.value.theme,
          },
        }
      }
    }),
    navigation,
  }
}
