<script lang="ts" setup>
import type { ToastEmits, ToastProps } from './toast.props'
import { reactivePick } from '@vueuse/core'
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { cn } from '~/utils/styles'
import Button from '../button/button.vue'
import Icon from '../icon/icon.vue'
import { useToastStyle } from './toast.style'

const props = withDefaults(defineProps<ToastProps>(), {
  color: 'primary',
  variant: 'outline',
  orientation: 'horizontal',
  radius: 'lg',
  closable: false,
  loading: false,
})

const emits = defineEmits<ToastEmits>()
const delegated = reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type')
const forwarded = useForwardPropsEmits(delegated, emits)

const { t } = useLocale()

const ui = computed(() => useToastStyle(props))

const el = ref()
const height = ref(0)

onMounted(() => {
  if (!el.value)
    return

  setTimeout(() => {
    height.value = el.value.$el.getBoundingClientRect()?.height
  }, 0)
})

defineExpose({
  height,
})
</script>

<template>
  <ToastRoot
    ref="el"
    v-bind="forwarded"
    data-slot="toast"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    :style="{ '--height': height }"
  >
    <slot v-if="icon || $slots.icon" name="icon">
      <Icon v-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>
    <div data-slot="toast-wrapper" :class="cn(ui.wrapper(), props.ui?.wrapper)">
      <ToastTitle v-if="title || $slots.title" data-slot="toast-title" :class="cn(ui.title(), props.ui?.title)">
        <slot name="title">
          {{ title }}
        </slot>
      </ToastTitle>

      <ToastDescription
        v-if="description || $slots.description"
        data-slot="toast-description"
        :class="cn(ui.description(), props.ui?.description)"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </ToastDescription>

      <div v-if="orientation === 'vertical' && actions?.length" data-slot="toast-actions" :class="cn(ui.actions(), props.ui?.actions)">
        <ToastAction
          v-for="(action, index) in actions"
          :key="index"
          :alt-text="action.label || 'Action'"
          as-child
          @click.stop
        >
          <Button
            v-bind="action"
            :variant="variant === 'solid' ? 'inverse' : action.variant || 'soft'"
            :color="color"
            size="xs"
          />
        </ToastAction>
      </div>
    </div>

    <div
      v-if="(orientation === 'horizontal' && actions?.length) || closable"
      data-slot="toast-actions"
      :class="cn(ui.actions({ orientation: 'horizontal' }), props.ui?.actions)"
    >
      <template v-if="orientation === 'horizontal' && actions?.length">
        <slot name="actions">
          <ToastAction
            v-for="(action, index) in actions"
            :key="index"
            :alt-text="action.label || 'Action'"
            as-child
            @click.stop
          >
            <Button
              v-bind="action"
              :variant="variant === 'solid' ? 'inverse' : action.variant || 'soft'"
              :color="color"
              size="xs"
            />
          </ToastAction>
        </slot>
      </template>

      <ToastClose v-if="closable || !!$slots.close" data-slot="toast-close" :aria-label="t('toast.close')" :class="cn(ui.close(), props.ui?.close)">
        <slot name="close">
          <Icon name="close" />
        </slot>
      </ToastClose>
    </div>
  </ToastRoot>
</template>
