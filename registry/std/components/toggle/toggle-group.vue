<script lang="ts" setup>
import type { ToggleGroupEmits, ToggleGroupProps } from './toggle-group.props'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupItem, ToggleGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useToggleGroupStyle } from './toggle-group.style'
import { useToggleStyle } from './toggle.style'

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  color: 'accent',
  radius: 'sm',
  size: 'sm',
  items: () => [],
})

const emits = defineEmits<ToggleGroupEmits>()

const delegated = reactiveOmit(props, 'class', 'ui', 'items', 'color', 'radius', 'size')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => ({
  ...useToggleGroupStyle(props),
  item: (custom?: ToggleGroupProps) => useToggleStyle({
    ...props,
    ...custom,
  }),
}))
</script>

<template>
  <ToggleGroupRoot
    v-slot="{ modelValue }"
    v-bind="forwarded"
    :class="ui.base({ class: cn(props.class, props.ui?.base) })"
  >
    <ToggleGroupItem
      v-for="(item, index) in items"
      v-bind="item"
      :key="index"
      :value="item.value"
      :class="cn(ui.item(), props.ui?.item, item.class)"
    >
      <slot v-bind="{ item, active: item.value === modelValue }">
        <Icon v-if="item.loading" name="loading" class="animate-spin" />
        <Icon v-else-if="item.icon" :name="item.icon" />
        <span v-if="item.text">{{ item.text }}</span>
      </slot>
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>
