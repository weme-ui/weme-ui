<script lang="ts" setup generic="T extends DropdownItem">
import type { DropdownEmits, DropdownItem, DropdownProps } from './dropdown.props'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { DropdownMenuRoot, DropdownMenuTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import DropdownContent from './dropdown-content.vue'
import { useDropdownStyle } from './dropdown.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownProps<T>>(), {
  checkedIcon: 'check',
  loadingIcon: 'loading',
  externalIcon: 'external',
  side: 'bottom',
  radius: 'lg',
  translucent: false,
  portal: true,
})

const emits = defineEmits<DropdownEmits>()
const delegated = reactivePick(props, 'modal', 'dir', 'defaultOpen', 'open')
const forwarded = useForwardPropsEmits(delegated, emits)

const contentProps = toRef(() => defu(props.content, { sideOffset: 8, collisionPadding: 8 }))
const arrowProps = toRef(() => props.arrow)

const indent = computed(() => props.items?.flat().some(
  item => item.type === 'checkbox' || item.type === 'radio',
))

const ui = computed(() => useDropdownStyle({
  side: props.side,
  radius: props.radius,
  translucent: toBoolValue(props.translucent),
  indent: !!indent.value,
}))
</script>

<template>
  <DropdownMenuRoot v-slot="{ open }" v-bind="forwarded">
    <DropdownMenuTrigger
      :disabled="disabled"
      :class="cn(ui.trigger(), props.ui?.trigger)"
      data-slot="dropdown-trigger"
      as-child
    >
      <slot :open="open" />
    </DropdownMenuTrigger>

    <DropdownContent
      v-bind="contentProps"
      :checked-icon="checkedIcon"
      :loading-icon="loadingIcon"
      :external-icon="externalIcon"
      :items="items"
      :portal="portal"
      :arrow="arrowProps"
      :class="cn(ui.content(), props.ui?.content, props.class)"
      :ui="ui"
    >
      <template #top>
        <slot name="top" :open="open" />
      </template>

      <template #bottom>
        <slot name="bottom" :open="open" />
      </template>
    </DropdownContent>
  </DropdownMenuRoot>
</template>
