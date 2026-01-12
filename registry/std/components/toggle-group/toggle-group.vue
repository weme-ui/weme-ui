<script lang="ts" setup>
import type { ToggleGroupEmits, ToggleGroupProps } from './toggle-group.props'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupItem, ToggleGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Toggle from '../toggle/toggle.vue'
import { useToggleGroupStyle } from './toggle-group.style'

const props = defineProps<ToggleGroupProps>()
const emits = defineEmits<ToggleGroupEmits>()
const delegated = reactiveOmit(props, 'items', 'color', 'variant', 'size', 'radius', 'class', 'ui')
const forwarded = useForwardPropsEmits(delegated, emits)

const items = computed(() => props.items || [])

const ui = computed(() => useToggleGroupStyle({
  orientation: props.orientation,
}))
</script>

<template>
  <ToggleGroupRoot
    v-bind="forwarded"
    data-slot="toggle-group"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <ToggleGroupItem
      v-for="(item, index) in items"
      :key="index"
      :value="item.value"
      :data-order="index === 0
        ? 'first'
        : index === items.length - 1
          ? 'last'
          : 'middle'"
      :class="cn(ui.item(), props.ui?.item, item.class)"
      as-child
    >
      <Toggle
        data-slot="toggle-group-item"
        v-bind="{ color, variant, radius, size }"
        :label="item.label"
        :icon="item.icon"
        :off-icon="item.offIcon"
      />
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>
