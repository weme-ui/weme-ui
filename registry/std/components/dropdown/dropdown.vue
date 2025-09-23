<script lang="ts" setup>
import type { DropdownEmits, DropdownProps } from './dropdown.props'
import { reactivePick } from '@vueuse/core'
import { DropdownMenuArrow, DropdownMenuRoot, DropdownMenuTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import DropdownContent from './dropdown-content.vue'
import { useDropdownStyle } from './dropdown.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownProps>(), {
  radius: 'lg',
  translucent: false,
  disabled: false,
  showArrow: true,
})

const emits = defineEmits<DropdownEmits>()
const delegated = reactivePick(props, 'defaultOpen', 'dir', 'modal', 'open')
const forwarded = useForwardPropsEmits(delegated, emits)

const indent = computed(() => props.items?.flat().some(
  item => item.type === 'checkbox',
))

const ui = computed(() => useDropdownStyle({
  ...props,
  indent: indent.value,
  translucent: !!props.translucent,
}))
</script>

<template>
  <DropdownMenuRoot v-slot="{ open }" v-bind="forwarded">
    <DropdownMenuTrigger :disabled="disabled" as-child>
      <slot name="trigger" :open="open" />
    </DropdownMenuTrigger>

    <DropdownContent
      v-bind="$attrs"
      :items="items"
      :side="side"
      :override="props.ui"
      :class="props.class"
      :ui="ui"
    >
      <template #top>
        <slot name="top" />
      </template>

      <template #bottom>
        <slot name="bottom" />
      </template>

      <DropdownMenuArrow v-if="showArrow" :class="cn(ui.arrow(), props.ui?.arrow)" />
    </DropdownContent>
  </DropdownMenuRoot>
</template>
