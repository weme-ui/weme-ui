import type { ContentNavigationItem } from '@nuxt/content'

export function useNavigation(split: boolean) {
  const route = useRoute()
  const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))

  const registry = ref('/docs/components/std')
  const rootPath = computed(() => `/${route.path.split('/')[1]}`)
  const root = computed(() => navigation.value.find(item => item.path === rootPath.value))

  function normalize(item: ContentNavigationItem): NavigationItem[] {
    return split && item.path === registry.value
      ? item.children!.map(normalize).flat()
      : [
          {
            icon: item.icon as string || undefined,
            title: item.title,
            path: item.path,
            redirect: item.redirect as string || undefined,
            badge: item.badge as { icon?: string, label?: string } || undefined,
            children: item.children?.map(normalize).flat(),
          },
        ]
  }

  return computed(() => ({
    root: rootPath.value,
    navs: root.value?.children?.reduce(
      (acc, item) => {
        return [
          ...acc,
          ...normalize(item),
        ]
      },
      [] as NavigationItem[],
    ),
  }))
}
