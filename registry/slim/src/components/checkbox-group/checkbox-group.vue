<script lang="ts" setup>
import type { CheckboxGroupEmits, CheckboxGroupProps, CheckboxGroupValue } from './checkbox-group.props'
import { reactivePick } from '@vueuse/core'
import { CheckboxGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Checkbox from '../checkbox/checkbox.vue'
import { useCheckboxGroupStyle } from './checkbox-group.style'

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  orientation: 'vertical',
  align: 'start',
})

const emits = defineEmits<CheckboxGroupEmits>()
const delegated = reactivePick(props, 'as', 'defaultValue', 'disabled', 'dir', 'loop', 'max', 'modelValue', 'name', 'required', 'orientation', 'rovingFocus')
const forwarded = useForwardPropsEmits(delegated, emits)

const formFieldContext = useFormFieldContext()

const id = computed(() => props.id ?? formFieldContext.fieldId.value)
const name = computed(() => props.name ?? formFieldContext.name.value)
const disabled = computed(() => props.disabled ?? formFieldContext.disabled.value)
const required = computed(() => props.required ?? formFieldContext.required.value)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const ui = computed(() => useCheckboxGroupStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  orientation: props.orientation,
  align: props.align,
  disabled: disabled.value,
  inverted: toBoolValue(props.inverted),
  unstyled: toBoolValue(props.unstyled),
}))

function handleUpdate(value: CheckboxGroupValue[]) {
  emits('change', value)
}
</script>

<template>
  <CheckboxGroupRoot
    v-bind="{ ...forwarded, ...dataAttributes }"
    :id="id"
    :name="name"
    :disabled="disabled"
    :required="required"
    :data-slot="$attrs['data-slot'] ?? 'checkbox-group'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <template v-for="item in items" :key="item.value">
      <Checkbox
        :disabled="item.disabled || disabled"
        :variant="variant"
        :size="size"
        :radius="radius"
        :align="align"
        :indicator="indicator"
        :inverted="inverted"
        :unstyled="unstyled"
        :label="item.label"
        :description="item.description"
        :value="item.value"
        :indeterminate-icon="item.indeterminateIcon || indeterminateIcon"
        :indeterminate-icon-class="item.indeterminateIconClass || indeterminateIconClass"
        :checked-icon="item.checkedIcon || checkedIcon"
        :checked-icon-class="item.checkedIconClass || checkedIconClass"
        :class="cn(ui.item(), props.ui?.item, item.class)"
        :ui="{
          indicator: cn(ui.indicator(), props.ui?.indicator),
          checkedIcon: cn(ui.checkedIcon(), props.ui?.checkedIcon),
          indeterminateIcon: cn(ui.indeterminateIcon(), props.ui?.indeterminateIcon),
          content: cn(ui.content(), props.ui?.content),
          label: cn(ui.label(), props.ui?.label),
          description: cn(ui.description(), props.ui?.description),
        }"
      >
        <template v-if="!!$slots.indicator" #indicator="{ state }">
          <slot name="indicator" :state="state" />
        </template>

        <template v-if="!!$slots.label" #label="{ state }">
          <slot name="label" :state="state" />
        </template>

        <template v-if="!!$slots.description" #description="{ state }">
          <slot name="description" :state="state" />
        </template>
      </Checkbox>
    </template>
  </CheckboxGroupRoot>
</template>
