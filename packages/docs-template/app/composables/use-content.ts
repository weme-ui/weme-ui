import type { ContentNavigationItem, DocsCollectionItem } from '@nuxt/content'
import { createSharedComposable } from '@vueuse/core'

function _useContent() {
  const page = inject<Ref<DocsCollectionItem | null>>('page')
  const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

  return {
    page: computed(() => page?.value),
    navigation: computed(() => navigation?.value),
  }
}

export const useContent = /* @__PURE__ */ createSharedComposable(_useContent)
