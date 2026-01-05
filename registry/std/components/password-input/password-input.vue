<script lang="ts" setup>
import type { PasswordInputEmits, PasswordInputProps } from './password-input.props'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Input from '../input/input.vue'
import { usePasswordInputStyle } from './password-input.style'

const props = withDefaults(defineProps<PasswordInputProps>(), {
  visibility: true,
  visibleIcon: 'lucide:eye',
  hiddenIcon: 'lucide:eye-off',
})

const emits = defineEmits<PasswordInputEmits>()
const delegated = reactiveOmit(props, 'asChild', 'type', 'hiddenIcon', 'visibleIcon', 'visibility')
const forwarded = useForwardPropsEmits(delegated, emits)

const visible = defineModel<boolean>('visible', { default: false })

const ui = computed(() => usePasswordInputStyle({
  size: props.size,
  invalid: toBoolValue(props.invalid),
}))

const type = computed(() => visible.value ? 'text' : 'password')

function onChangeVisible() {
  visible.value = !visible.value
  emits('visibleChange', visible.value)
}
</script>

<template>
  <Input v-bind="forwarded" :type="type" data-slot="password-input">
    <slot />

    <template v-if="visibility" #suffix>
      <slot name="visibility" v-bind="{ visible }">
        <button
          :class="cn(ui.visibilityButton(), props.ui?.visibilityButton)"
          data-slot="password-input-visibility"
          @click="onChangeVisible"
        >
          <Icon :name="visible ? hiddenIcon : visibleIcon" />
        </button>
      </slot>
    </template>
  </Input>
</template>
