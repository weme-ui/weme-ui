import type { ContentNavigationItem, DocsCollectionItem } from '@nuxt/content'

export function useContent() {
  const page = inject<Ref<DocsCollectionItem | null>>('page', ref(null))
  const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

  const config = useConfig()

  return {
    page: computed(() => {
      if (page.value) {
        const isCustomPage = getUseValue(page.value.theme?.custom, config.value.theme?.custom, false)

        const theme = {
          ...page.value.theme,

          bordered: getUseValue(page.value.theme?.bordered, config.value.theme?.bordered, !isCustomPage),
          fillContainer: getUseValue(page.value.theme?.fillContainer, config.value.theme?.fillContainer, true),
          custom: isCustomPage,
        }

        return {
          ...page.value,

          theme,

          header: {
            ...page.value.header,

            bordered: getUseValue(
              page.value.header?.bordered,
              page.value.theme?.bordered,
              config.value.header?.bordered,
              theme.bordered,
              !isCustomPage,
            ),
          },

          sidebar: {
            ...page.value.sidebar,

            spiltLevel: getUseValue(
              page.value.sidebar?.spiltLevel,
              config.value.sidebar?.spiltLevel,
            ),

            bordered: getUseValue(
              page.value.sidebar?.bordered,
              page.value.theme?.bordered,
              config.value.sidebar?.bordered,
              theme.bordered,
              !isCustomPage,
            ),
          },

          footer: {
            ...page.value.footer,

            enable: getUseValue(page.value.footer?.enable, !isCustomPage),

            bordered: getUseValue(
              page.value.footer?.bordered,
              page.value.theme?.bordered,
              config.value.footer?.bordered,
              theme.bordered,
              !isCustomPage,
            ),
          },

          outline: {
            ...page.value.outline,

            enable: getUseValue(page.value.outline?.enable, !isCustomPage),
          },
        }
      }
    }),
    navigation,
  }
}
