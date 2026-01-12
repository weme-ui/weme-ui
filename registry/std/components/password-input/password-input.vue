<script lang="ts" setup>
import type { PasswordInputEmits, PasswordInputProps } from './password-input.props'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useFormField } from '~/composables/use-form-field'
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
const delegated = reactiveOmit(props, 'size', 'radius', 'required', 'disabled', 'type', 'hiddenIcon', 'visibleIcon', 'visibility')
const forwarded = useForwardPropsEmits(delegated, emits)

const { id, name, size, radius, disabled, required } = useFormField<PasswordInputProps>(props)

const visible = defineModel<boolean>('visible', { default: false })

const ui = computed(() => usePasswordInputStyle({
  size: size.value,
  invalid: toBoolValue(props.invalid),
}))

const type = computed(() => visible.value ? 'text' : 'password')

function onChangeVisible() {
  visible.value = !visible.value
  emits('visibleChange', visible.value)
}
</script>

<template>
  <Input
    v-bind="forwarded"
    :id="id"
    :name="name"
    :size="size"
    :radius="radius"
    :disabled="disabled"
    :required="required"
    data-slot="password-input"
    :type="type"
  >
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
