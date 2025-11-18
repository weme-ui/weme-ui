<script lang="ts" setup>
import { createReusableTemplate } from '@vueuse/core'
import { useNavigationListStyle } from './navigation-list.style'

interface NavigationItem {
  title: string
  icon?: string
  path: string
  badge?: string
  children?: NavigationItem[]
}

defineProps<{
  navigation: NavigationItem[]
  class?: any
}>()

const route = useRoute()
const ui = useNavigationListStyle()

const [
  DefineNavigationListItem,
  ReuseNavigationListItem,
] = createReusableTemplate()

function isActive(path: string): boolean {
  return route.path === path
}
</script>

<template>
  <DefineNavigationListItem v-slot="{ icon, title, badge, path }">
    <a
      :href="path"
      :rel="path.startsWith('http') ? 'noopener noreferrer' : ''"
      :target="path.startsWith('http') ? '_blank' : ''"
    >
      <ProseIcon v-if="icon" :name="icon" :class="ui.itemIcon({ active: isActive(path) })" />
      <span :class="ui.itemTitle({ active: isActive(path) })">{{ title }}</span>
      <UiBadge v-if="badge" :text="badge" />
    </a>
  </DefineNavigationListItem>

  <ul :class="ui.base({ class: $props.class })">
    <template v-for="item in navigation" :key="item.path">
      <li v-if="item.children && item.children.length" :class="ui.group()">
        <div :class="ui.groupHeader()">
          <ProseIcon v-if="item.icon" :name="item.icon" :class="ui.groupHeaderIcon()" />
          <span :class="ui.groupHeaderTitle()">{{ item.title }}</span>
          <UiBadge v-if="item.badge" :text="item.badge" />
        </div>

        <ul :class="ui.groupContent()">
          <li v-for="child in item.children" :key="child.path">
            <ReuseNavigationListItem
              :class="ui.item({ inset: true, active: isActive(child.path) })"
              :icon="child.icon"
              :title="child.title"
              :path="child.path"
              :badge="child.badge"
            />
          </li>
        </ul>
      </li>

      <li v-else>
        <ReuseNavigationListItem
          :class="ui.item({ active: isActive(item.path) })"
          :icon="item.icon"
          :title="item.title"
          :path="item.path"
          :badge="item.badge"
        />
      </li>
    </template>
  </ul>
</template>
