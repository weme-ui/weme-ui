<script lang="ts" setup>
import type { AlertEmits, AlertProps } from './alert.props'
import { Presence, Primitive } from 'reka-ui'
import { computed, watch } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useAlertStyle } from './alert.style'

const props = withDefaults(defineProps<AlertProps>(), {
  color: 'primary',
  variant: 'soft',
  radius: 'md',
  closable: false,
  clickable: false,
})

const emits = defineEmits<AlertEmits>()
const visible = defineModel<boolean>({ default: true })
const slots = useSlots()

const as = computed(() => props.href ? 'a' : 'div')
const clickable = computed(() => !!props.href || props.clickable)
const resolvedIcon = computed(() => props.status && !props.icon ? props.status : props.icon)
const resolvedColor = computed(() => props.status ? props.status as AlertProps['color'] : props.color)

const ui = computed(() => useAlertStyle({
  ...props,
  color: resolvedColor.value,
  inline: slots.title === undefined && !props.title,
  clickable: clickable.value,
}))

function onClose() {
  visible.value = false
}

watch(
  visible,
  (value) => {
    emits('update:visible', value)
  },
  { immediate: true },
)
</script>

<template>
  <Presence v-if="visible" :present="visible">
    <Primitive :as="as" :href="href" :target="target" :rel="rel" :class="cn(ui.base(), props.ui?.base, props.class)">
      <slot v-if="$slots.icon || resolvedIcon" name="icon">
        <Icon v-if="resolvedIcon" :name="resolvedIcon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>

      <div :class="cn(ui.wrapper(), props.ui?.wrapper)">
        <slot v-if="$slots.title || title" name="title">
          <h3 v-if="title" :class="cn(ui.title(), props.ui?.title)">
            {{ title }}
          </h3>
        </slot>
        <slot v-if="$slots.default || content" name="content">
          <p v-if="content" :class="cn(ui.content(), props.ui?.content)">
            {{ content }}
          </p>
        </slot>
      </div>

      <slot v-if="$slots.actions || clickable" name="actions">
        <div :class="cn(ui.actions(), props.ui?.actions)">
          <slot name="actions">
            <Icon v-if="target === '_blank' || rel === 'noopener noreferrer' || href?.startsWith('http')" name="external" />
          </slot>
        </div>
      </slot>

      <button v-if="closable" :class="cn(ui.close(), props.ui?.close)" @click="onClose">
        <slot name="close">
          <Icon name="close" />
        </slot>
      </button>
    </Primitive>
  </Presence>
</template>
