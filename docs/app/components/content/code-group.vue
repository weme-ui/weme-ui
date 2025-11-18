<script lang="ts" setup>
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { useCodeGroupStyle } from '~/styles/content/code-group.style'

withDefaults(defineProps<{
  defaultValue?: string
  class?: any
}>(), {
  defaultValue: '0',
})

const slots = defineSlots<{
  default: (props?: object) => any
}>()

const model = defineModel<string>()

const ui = useCodeGroupStyle()

const items = computed<{
  index: number
  label: string
  icon: string
  component: any
}[]>(() => {
  return slots.default?.()?.flatMap(transformSlot).filter(Boolean) || []
})

function transformSlot(slot: any, index: number) {
  if (typeof slot.type === 'symbol') {
    return slot.children?.map(transformSlot)
  }

  return {
    label: slot.props?.filename || slot.props?.label || `${index}`,
    icon: slot.props?.icon,
    component: slot,
  }
}
</script>

<template>
  <TabsRoot v-model="model" :default-value="defaultValue" :unmount-on-hide="false" :class="ui.base({ class: $props.class })">
    <TabsList :class="ui.list()">
      <TabsIndicator :class="ui.indicator()" />
      <TabsTrigger v-for="(item, index) of items" :key="index" :value="String(index)" :class="ui.trigger()">
        <CodeIcon :icon="item.icon" :filename="item.label" />
        <span>{{ item.label }}</span>
      </TabsTrigger>
    </TabsList>

    <TabsContent v-for="(item, index) of items" :key="index" :value="String(index)" as-child>
      <component :is="item.component" hide-header tabindex="-1" />
    </TabsContent>
  </TabsRoot>
</template>
