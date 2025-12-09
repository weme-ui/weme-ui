import type { ContentNavigationItem } from '@nuxt/content'
import { findPageChildren } from '@nuxt/content/utils'

export function useNavigation(navigation: Ref<ContentNavigationItem[] | undefined>) {
  const rootNavigation = computed(() =>
    navigation.value?.[0]?.children?.map(
      item => processNavigationItem(item),
    ) as ContentNavigationItem[] || [],
  )

  const childNavigation = computed(() => {
    const route = useRoute()
    const { registry } = useRegistry()

    const slug = route.params.slug?.[0] as string
    const children = findPageChildren(
      navigation.value,
      slug === 'components' ? `/docs/${slug}/${registry.value}` : `/docs/${slug}`,
      { indexAsChild: true },
    )

    return groupChildren(children)
  })

  return {
    rootNavigation,
    childNavigation,
  }
}

function groupChildren(items: ContentNavigationItem[]): ContentNavigationItem[] {
  if (!items.length) {
    return []
  }

  const grouped: ContentNavigationItem[] = []
  const ungrouped: ContentNavigationItem[] = []

  for (const item of items) {
    if (item.children?.length) {
      grouped.push(item)
    }
    else {
      ungrouped.push(item)
    }
  }

  if (ungrouped.length > 1) {
    return ungrouped.concat(grouped)
  }

  if (ungrouped.length === 1 && !ungrouped[0]?.stem?.endsWith('index')) {
    return items
  }

  return grouped
}

function processNavigationItem(
  item: ContentNavigationItem,
  parent?: ContentNavigationItem,
): ContentNavigationItem | ContentNavigationItem[] {
  return {
    ...item,
    title: parent?.title || item.title,
    badge: parent?.badge || item.badge,
    icon: parent?.icon || item.icon,
    children: item.children?.length ? item.children?.flatMap(child => processNavigationItem(child)) : undefined,
  }
}
