<script lang="ts" setup generic="T extends DropdownItem">
import type { DropdownItem } from '../dropdown/dropdown.props'
import type { ContextMenuEmits, ContextMenuProps } from './context-menu.props'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { ContextMenuRoot, ContextMenuTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useDropdownStyle } from '../dropdown/dropdown.style'
import ContextMenuContent from './context-menu-content.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuProps>(), {
  checkedIcon: 'check',
  loadingIcon: 'loading',
  externalIcon: 'external',
  side: 'right',
  radius: 'lg',
  translucent: false,
  portal: true,
})

const emits = defineEmits<ContextMenuEmits>()
const delegated = reactivePick(props, 'modal', 'dir', 'pressOpenDelay')
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
  <ContextMenuRoot v-bind="forwarded">
    <ContextMenuTrigger :disabled="disabled" :class="cn(ui.trigger(), props.ui?.trigger)" data-slot="context-menu-trigger" as-child>
      <slot />
    </ContextMenuTrigger>

    <ContextMenuContent
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
        <slot name="top" />
      </template>

      <template #bottom>
        <slot name="bottom" />
      </template>
    </ContextMenuContent>
  </ContextMenuRoot>
</template>
