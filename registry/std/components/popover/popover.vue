<script lang="ts" setup>
import type { PopoverEmits, PopoverProps } from './popover.props'
import { reactiveOmit } from '@vueuse/core'
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { usePopoverStyle } from './popover.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverProps>(), {
  side: 'bottom',
  radius: 'md',
  translucent: false,
  closable: false,
  showArrow: false,
})

const emits = defineEmits<PopoverEmits>()

const delegated = reactiveOmit(props, 'class', 'ui', 'side', 'radius', 'translucent', 'portal', 'content', 'asChild')
const forwarded = useForwardPropsEmits(delegated, emits)

const contentProps = computed(() => ({
  ...props.content,
  side: props.side,
  sideOffset: props.content?.sideOffset ?? 6,
}))

const config = useAppConfig()

const ui = computed(() => usePopoverStyle({
  ...props,
  translucent: props.translucent ? !!props.translucent : config.weme.translucent,
}))
</script>

<template>
  <PopoverRoot v-slot="{ open }" v-bind="forwarded">
    <PopoverTrigger :class="cn(ui.trigger(), props.ui?.trigger)" :as-child="asChild">
      <slot name="trigger" :open="open" />
    </PopoverTrigger>

    <PopoverPortal v-bind="portal">
      <PopoverContent v-bind="contentProps" :class="cn(ui.base(), props.class, props.ui?.base)">
        <slot />

        <PopoverClose v-if="closable" :class="cn(ui.close(), props.ui?.close)">
          <Icon name="close" />
        </PopoverClose>

        <PopoverArrow v-if="showArrow" :class="cn(ui.arrow(), props.ui?.arrow)" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
