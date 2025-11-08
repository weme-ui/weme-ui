<script lang="ts" setup>
import type { AlertEmits, AlertProps } from './alert.props'
import { AnimatePresence, Motion } from 'motion-v'
import { computed, nextTick, useSlots } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useAlertStyle } from './alert.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AlertProps>(), {
  color: 'accent',
  variant: 'soft',
  radius: 'lg',
  clickable: false,
  closable: false,
})

const emits = defineEmits<AlertEmits>()
const slots = useSlots()
const visible = defineModel<boolean>({ default: true })

const animate = computed(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))

const tag = computed(() => props.href ? 'a' : 'div')
const resolvedIcon = computed(() => props.type && !props.icon ? props.type : props.icon)
const resolvedColor = computed(() => props.type ? props.type as AlertProps['color'] : props.color)

const ui = computed(() => useAlertStyle({
  ...props,
  color: resolvedColor.value,
  inline: slots.title === undefined && !props.title,
  clickable: !!props.href || props.clickable,
}))

function onClose() {
  nextTick(() => {
    visible.value = false
  })

  emits('close')
}
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="visible"
      v-bind="animate"
      :as="tag"
      :href="href"
      :target="target"
      :rel="rel"
      :class="cn(ui.base(), props.class, props.ui?.base)"
    >
      <slot name="icon">
        <Icon v-if="resolvedIcon" :name="resolvedIcon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>

      <div :class="cn(ui.wrapper(), props.ui?.wrapper)">
        <slot v-if="slots.title || title" name="title">
          <h3 v-if="title" :class="cn(ui.title(), props.ui?.title)">
            {{ title }}
          </h3>
        </slot>
        <slot v-if="slots.default || content">
          <p v-if="content" :class="cn(ui.content(), props.ui?.content)">
            {{ content }}
          </p>
        </slot>
      </div>

      <button v-if="closable" :class="cn(ui.close(), props.ui?.close)" @click="onClose">
        <slot name="close">
          <Icon name="close" />
        </slot>
      </button>
    </Motion>
  </AnimatePresence>
</template>
