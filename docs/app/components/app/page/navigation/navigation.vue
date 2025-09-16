<script lang="ts" setup>
import type { DocsCollectionItem } from '@nuxt/content'
import { usePageNavigationStyle } from './navigation.style'

const { page } = defineProps<{
  page?: DocsCollectionItem
}>()

const isSplitNav = computed(() => page?.theme?.sidebar?.splitNav || false)
const { root, navs } = useNavigation(isSplitNav.value).value

const isActive = (path: string) => path.startsWith(root)

const treeItems = computed(() => isSplitNav.value
  ? navs?.find(item => isActive(item.path || ''))?.children || []
  : navs || [],
)

const ui = computed(() => usePageNavigationStyle())
</script>

<template>
  <AppPageNavigationSwitch />
  <hr :class="ui.separator()">

  <template v-if="isSplitNav">
    <ul :class="ui.list()">
      <li v-for="nav in navs" :key="nav.path || nav.redirect">
        <NuxtLink
          :to="nav.path || nav.redirect"
          :class="ui.item({ active: isActive(nav.path || nav.redirect || '') })"
        >
          <div :class="ui.icon({ active: isActive(nav.path || nav.redirect || '') })">
            <AppIcon v-if="nav.icon" :name="nav.icon" />
          </div>
          <span :class="ui.label()">
            {{ nav.title }}
          </span>

          <UiBadge
            v-if="nav.badge"
            variant="outline"
            radius="full"
            size="xs"
            :icon="nav.badge.icon"
            :text="nav.badge.label"
          />
        </NuxtLink>
      </li>
    </ul>

    <hr v-if="treeItems && treeItems.length" :class="ui.separator()">
  </template>

  <AppPageNavigationTree :items="treeItems" />
</template>
