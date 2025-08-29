<script lang="ts" setup>
import type { BadgeEmits, BadgeProps } from './badge.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useBadgeStyle } from './badge.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BadgeProps>(), {
  color: 'accent',
  variant: 'soft',
  size: 'sm',
  radius: 'sm',
  disabled: false,
  closable: false,
  clickable: false,
})

const emits = defineEmits<BadgeEmits>()
const delegated = reactivePick(props, 'asChild', 'href', 'target', 'rel')
const tag = computed(() => props.href ? 'a' : 'span')

const ui = computed(() => useBadgeStyle({
  ...props,
  square: !!props.icon && !props.text,
  disabled: !!props.disabled,
  closable: !!props.closable,
  clickable: !!props.href || props.clickable,
}))

function onClose() {
  emits('close')
}
</script>

<template>
  <Primitive
    v-bind="delegated"
    :as="tag"
    :class="cn(ui.base(), props.class, props.ui?.base)"
  >
    <slot v-if="$slots.icon || icon" name="icon">
      <Icon v-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>

    <slot>{{ text }}</slot>

    <button v-if="closable" :class="cn(ui.close(), props.ui?.close)" @click="onClose">
      <Icon name="close" />
    </button>
  </Primitive>
</template>
