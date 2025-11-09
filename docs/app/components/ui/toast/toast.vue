<script lang="ts" setup>
import type { ToastEmits, ToastProps } from './toast.props'
import { reactivePick } from '@vueuse/core'
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Button from '../button/button.vue'
import Icon from '../icon/icon.vue'
import { useToastStyle } from './toast.style'

const props = withDefaults(defineProps<ToastProps>(), {
  color: 'accent',
  orientation: 'vertical',
  radius: 'lg',
  closable: true,
})

const emits = defineEmits<ToastEmits>()
const delegated = reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type')
const forwarded = useForwardPropsEmits(delegated, emits)

const resolvedIcon = computed(() => props.icon || props.type)
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
    :class="cn(ui.base(), props.class, props.ui?.base)"
    :style="{ '--height': height }"
  >
    <slot v-if="resolvedIcon || $slots.icon" name="icon">
      <Icon v-if="resolvedIcon" :name="resolvedIcon" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>

    <div class="flex-(~ 1 col)">
      <ToastTitle v-if="title || $slots.title" :class="cn(ui.title(), props.ui?.title)">
        <slot name="title">
          {{ title }}
        </slot>
      </ToastTitle>

      <ToastDescription v-if="description || $slots.description" :class="cn(ui.description(), props.ui?.description)">
        <slot name="description">
          {{ description }}
        </slot>
      </ToastDescription>

      <div
        v-if="actions?.length && orientation === 'vertical'"
        :class="cn(ui.actions(), props.ui?.actions)"
      >
        <ToastAction
          v-for="(action, index) in actions"
          :key="index"
          :alt-text="action.text || 'Action'"
          as-child
          @click.stop
        >
          <Button v-bind="action" size="xs" :color="color" />
        </ToastAction>
      </div>
    </div>

    <div
      v-if="(orientation === 'horizontal' && actions?.length) || closable"
      :class="cn(ui.actions({ orientation: 'horizontal' }), props.ui?.actions)"
    >
      <template v-if="orientation === 'horizontal' && actions?.length">
        <slot name="actions">
          <ToastAction
            v-for="(action, index) in actions"
            :key="index"
            :alt-text="action.text || 'Action'"
            as-child
            @click.stop
          >
            <Button v-bind="action" size="xs" :color="color" />
          </ToastAction>
        </slot>
      </template>

      <ToastClose v-if="closable || !!$slots.close" :class="cn(ui.close(), props.ui?.close)">
        <slot name="close">
          <Icon name="close" />
        </slot>
      </ToastClose>
    </div>
  </ToastRoot>
</template>
