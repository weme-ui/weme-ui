<script lang="ts" setup>
import type { TagEmits, TagProps } from './tag.props'
import { reactivePick } from '@vueuse/core'
import { Presence, Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useTagStyle } from './tag.style'

const props = withDefaults(defineProps<TagProps>(), {
  closeIcon: 'close',
  color: 'primary',
  variant: 'soft',
  size: 'sm',
  radius: 'sm',
  disabled: false,
  closable: false,
})

const emits = defineEmits<TagEmits>()
const delegated = reactivePick(props, 'as', 'asChild')
const forwarded = useForwardPropsEmits(delegated, emits)
const visible = defineModel<boolean>({ default: true })

const { t } = useLocale()

const ui = computed(() => useTagStyle({
  ...props,
  disabled: toBoolValue(props.disabled),
}))

function onClose() {
  visible.value = false
  emits('close')
}
</script>

<template>
  <Presence v-if="visible" :present="visible">
    <Primitive v-bind="forwarded" :class="cn(ui.base(), props.ui?.base, props.class)">
      <span :class="cn(ui.label(), props.ui?.label)">
        <slot>{{ label }}</slot>
      </span>
      <button v-if="closable" :aria-label="t('tag.close')" :class="cn(ui.close(), props.ui?.close)" @click="onClose">
        <slot name="close">
          <Icon :name="closeIcon" />
        </slot>
      </button>
    </Primitive>
  </Presence>
</template>
