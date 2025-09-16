<script lang="ts" setup>
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { usePageNavigationTreeStyle } from './navigation-tree.style'

defineProps<{
  items: NavigationItem[]
}>()

const route = useRoute()
const isActive = (path: string) => route.path.startsWith(path)

const ui = usePageNavigationTreeStyle()
</script>

<template>
  <ul :class="ui.base()">
    <template v-for="item in items" :key="item.path">
      <CollapsibleRoot v-if="item.children" as="li" :default-open="isActive(item.path || '')" :class="ui.group()">
        <CollapsibleTrigger :class="ui.trigger()">
          <AppPageNavigationTreeItem :item="item" :class="cn(ui.item(), 'font-medium')">
            <AppIcon name="right" :class="ui.expandIcon()" />
          </AppPageNavigationTreeItem>
        </CollapsibleTrigger>
        <CollapsibleContent as="ul" :class="ui.groupContent()">
          <template v-for="child in item.children" :key="child.path">
            <AppPageNavigationTreeItem
              as="a"
              :item="child"
              :class="ui.item({ active: isActive(child.path || '') })"
            />
          </template>
        </CollapsibleContent>
      </CollapsibleRoot>

      <li v-else>
        <AppPageNavigationTreeItem
          as="a"
          :item="item"
          :class="ui.item()"
        />
      </li>
    </template>
  </ul>
</template>
