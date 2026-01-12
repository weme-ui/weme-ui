<script lang="ts" setup>
import type { FormFieldProps } from './form-field.props'
import type { FormFieldInjectedProps } from '~/types/input'
import { reactiveOmit } from '@vueuse/core'
import { Label } from 'reka-ui'
import { Field } from 'vee-validate'
import { computed, provide, ref, useId } from 'vue'
import { formFieldInjectionKey } from '~/composables/use-form-field'
import { cn } from '~/utils/styles'
import IconButton from '../icon-button/icon-button.vue'
import ToggleTooltip from '../toggle-tooltip/toggle-tooltip.vue'
import { useFormFieldStyle } from './form-field.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<FormFieldProps>(), { as: 'div', orientation: 'vertical' })
const delegated = reactiveOmit(props, 'class', 'ui', 'orientation', 'size', 'radius', 'hint', 'description', 'help', 'disabled', 'required')

const ui = computed(() => useFormFieldStyle({
  orientation: props.orientation,
  size: props.size,
}))

const id = ref(props.id ?? useId())

provide(formFieldInjectionKey, computed(() => ({
  id: id.value,
  name: props.name,
  size: props.size,
  radius: props.radius,
  disabled: props.disabled,
  required: props.required,
}) as FormFieldInjectedProps<FormFieldProps>))
</script>

<template>
  <Field
    v-slot="{ errors }"
    v-bind="delegated"
    data-slot="form-field"
    :data-orientation="orientation"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <div data-slot="form-field-wrapper" :class="cn(ui.wrapper(), props.ui?.wrapper)">
      <div v-if="label || !!$slots.label" data-slot="form-field-label-wrapper" :class="cn(ui.labelWrapper(), props.ui?.labelWrapper)">
        <Label :for="id" data-slot="form-field-label" :class="cn(ui.label(), props.ui?.label)">
          <slot name="label" :label="label">
            {{ label }}
          </slot>
          <span v-if="required" data-slot="form-field-required" :class="cn(ui.required(), props.ui?.required)">
            <slot name="required">*</slot>
          </span>
        </Label>
        <span v-if="hint || !!$slots.hint" data-slot="form-field-hint" :class="cn(ui.hint(), props.ui?.hint)">
          <slot name="hint" :hint="hint">
            {{ hint }}
          </slot>
        </span>
      </div>
      <template v-if="description || !!$slots.description">
        <p v-if="orientation === 'vertical'" data-slot="form-field-description" :class="cn(ui.description(), props.ui?.description)">
          <slot name="description" :description="description">
            {{ description }}
          </slot>
        </p>

        <ToggleTooltip v-else>
          <IconButton icon="lucide:info" color="neutral" variant="ghost" size="xs" radius="full" />
          <template #content>
            <slot name="description" :description="description">
              {{ description }}
            </slot>
          </template>
        </ToggleTooltip>
      </template>
    </div>

    <div data-slot="form-field-control" :class="cn(ui.control(), props.ui?.control)">
      <slot :invalid="!!errors.length" />

      <div v-if="errors.length" data-slot="form-field-errors" :class="cn(ui.errors(), props.ui?.errors)">
        <slot name="errors" :errors="errors">
          <ul v-if="errors.length > 1">
            <li v-for="error in errors" :key="error">
              <slot name="error" :error="error">
                {{ error }}
              </slot>
            </li>
          </ul>
          <template v-else>
            <slot name="error" :error="errors[0]">
              {{ errors[0] }}
            </slot>
          </template>
        </slot>
      </div>
      <div v-else-if="help || !!$slots.help" data-slot="form-field-help" :class="cn(ui.help(), props.ui?.help)">
        <slot name="help" :help="help">
          {{ help }}
        </slot>
      </div>
    </div>
  </Field>
</template>
