<script lang="ts" setup>
import type { AlertEmits, AlertProps } from './alert.props'
import { Presence, Primitive } from 'reka-ui'
import { computed, useSlots, watch } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import LinkOverlay from '../link-overlay/link-overlay.vue'
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

const clickable = computed(() => !!props.href || props.clickable)
const resolvedIcon = computed(() => props.status && !props.icon ? props.status : props.icon)
const resolvedColor = computed(() => props.status ? props.status as AlertProps['color'] : props.color)

const { t } = useLocale()

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
    <Primitive :as="as" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="alert">
      <slot v-if="$slots.icon || resolvedIcon" name="icon">
        <Icon v-if="resolvedIcon" :name="resolvedIcon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>

      <div :class="cn(ui.wrapper(), props.ui?.wrapper)" data-slot="alert-wrapper">
        <slot v-if="$slots.title || title" name="title">
          <h3 v-if="title" :class="cn(ui.title(), props.ui?.title)" data-slot="alert-title">
            {{ title }}
          </h3>
        </slot>
        <slot v-if="$slots.default || content" name="content">
          <p v-if="content" :class="cn(ui.content(), props.ui?.content)" data-slot="alert-content">
            {{ content }}
          </p>
        </slot>
      </div>

      <slot v-if="$slots.actions || clickable" name="actions">
        <div :class="cn(ui.actions(), props.ui?.actions)" data-slot="alert-actions">
          <slot name="actions">
            <Icon v-if="target === '_blank' || rel === 'noopener noreferrer' || href?.startsWith('http')" name="external" />
          </slot>
        </div>
      </slot>

      <button v-if="closable" :aria-label="t('alert.close')" :class="cn(ui.close(), props.ui?.close)" data-slot="alert-close" @click="onClose">
        <slot name="close">
          <Icon name="close" />
        </slot>
      </button>
      <LinkOverlay v-if="href" :href="href" :target="target" :rel="rel" :as-child="!!$slots['link-overlay']">
        <slot name="link-overlay" />
      </LinkOverlay>
    </Primitive>
  </Presence>
</template>
