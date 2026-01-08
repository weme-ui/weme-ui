<script lang="ts" setup>
import type { PasswordInputEmits, PasswordInputProps } from './password-input.props'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Input from '../input/input.vue'
import { usePasswordInputStyle } from './password-input.style'

const props = withDefaults(defineProps<PasswordInputProps>(), {
  visibility: true,
  visibleIcon: 'lucide:eye-off',
  hiddenIcon: 'lucide:eye',
})

const emits = defineEmits<PasswordInputEmits>()
const delegated = reactiveOmit(props, 'type', 'hiddenIcon', 'visibleIcon', 'visibility')
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
  <Input v-bind="forwarded" data-slot="password-input" :type="type">
    <slot />

    <template v-if="visibility" #suffix>
      <slot name="visibility" v-bind="{ visible }">
        <button
          data-slot="password-input-visibility"
          :class="cn(ui.visibilityButton(), props.ui?.visibilityButton)"
          @click="onChangeVisible"
        >
          <Icon :name="visible ? hiddenIcon : visibleIcon" />
        </button>
      </slot>
    </template>
  </Input>
</template>
