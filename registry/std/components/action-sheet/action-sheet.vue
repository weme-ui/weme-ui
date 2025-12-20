<script lang="ts" setup>
import type { ActionSheetEmits, ActionSheetProps } from './action-sheet.props'
import { onKeyStroke, reactivePick, useMounted } from '@vueuse/core'
import { Presence, Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Button from '../button/button.vue'
import { useActionSheetStyle } from './action-sheet.style'

const props = withDefaults(defineProps<ActionSheetProps>(), {
  radius: 'md',
  portal: 'body',
})
const emits = defineEmits<ActionSheetEmits>()

const delegated = reactivePick(props, 'as', 'asChild')
const forwarded = useForwardPropsEmits(delegated, emits)

const modelValue = defineModel<boolean>({ default: false })
const isMounted = useMounted()

const open = computed({
  get() {
    return modelValue.value ?? !!props.defaultOpen
  },
  set(value) {
    modelValue.value = value
  },
})

if (props.closeOnEscape) {
  onKeyStroke('Escape', () => {
    open.value = false
  })
}

const ui = computed(() => useActionSheetStyle(props))

watch(open, (value) => {
  emits('open', value)
})
</script>

<template>
  <Teleport :to="portal" :disabled="disabled" :defer="defer">
    <Presence v-if="isMounted || !!forceMount" :present="open">
      <Primitive
        v-bind="forwarded"
        role="dialog"
        :data-state="open ? 'open' : 'closed'"
        :class="cn(ui.base(), props.ui?.base, props.class)"
      >
        <div v-if="$slots.selection" :class="cn(ui.selection(), props.ui?.selection)">
          <slot name="selection" />
        </div>
        <slot v-if="$slots.selection && $slots.actions" name="separator">
          <hr :class="cn(ui.separator(), props.ui?.separator)">
        </slot>
        <div v-if="actions?.length || $slots.actions" :class="cn(ui.actions(), props.ui?.actions)">
          <slot name="actions">
            <Button v-for="(action, index) in actions" :key="index" v-bind="action" />
          </slot>
        </div>
      </Primitive>
    </Presence>
  </Teleport>
</template>
