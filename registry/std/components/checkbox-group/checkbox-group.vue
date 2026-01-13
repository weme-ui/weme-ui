<script lang="ts" setup>
import type { CheckboxGroupEmits, CheckboxGroupProps } from './checkbox-group.props'
import { reactivePick } from '@vueuse/core'
import { CheckboxGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, watch } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { cn } from '~/utils/styles'
import Checkbox from '../checkbox/checkbox.vue'
import { useCheckboxGroupStyle } from './checkbox-group.style'

const props = defineProps<CheckboxGroupProps>()
const emits = defineEmits<CheckboxGroupEmits>()
const rootProps = reactivePick(props, 'as', 'defaultValue', 'dir', 'loop', 'modelValue', 'orientation', 'rovingFocus')
const checkboxProps = reactivePick(props, 'color', 'size', 'radius', 'indicator', 'checkedIcon', 'indeterminateIcon', 'align')
const forwarded = useForwardPropsEmits(rootProps, emits)

const { name, size, radius, disabled, required } = useFormField<CheckboxGroupProps>(props)

const ui = computed(() => useCheckboxGroupStyle({
  ...props,
  size: size.value,
  radius: radius.value,
}))

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined && value !== null)
      emits('change', value)
  },
)
</script>

<template>
  <CheckboxGroupRoot
    v-bind="forwarded"
    data-slot="checkbox-group"
    :name="name"
    :disabled="disabled"
    :required="required"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <template v-for="(item, index) in items" :key="index">
      <Checkbox
        v-bind="{ ...item, ...checkboxProps }"
        :disabled="item.disabled || disabled"
        :class="cn(ui.item(), props.ui?.item, item.class)"
        :ui="{
          indicator: cn(ui.indicator(), props.ui?.indicator, item.ui?.indicator),
          label: cn(ui.label(), props.ui?.label, item.ui?.label),
          description: cn(ui.description(), props.ui?.description, item.ui?.description),
          leading: cn(ui.leading(), props.ui?.leading, item.ui?.leading),
          trailing: cn(ui.trailing(), props.ui?.trailing, item.ui?.trailing),
        }"
      >
        <template v-if="!!$slots.indicator" #indicator="{ state }">
          <slot name="indicator" v-bind="{ state }" />
        </template>

        <template v-if="!!$slots.label" #label="{ state }">
          <slot name="label" v-bind="{ state }" />
        </template>

        <template v-if="!!$slots.description" #description="{ state }">
          <slot name="description" v-bind="{ state }" />
        </template>

        <template v-if="!!$slots.leading" #leading="{ state }">
          <slot name="leading" v-bind="{ state }" />
        </template>

        <template v-if="!!$slots.trailing" #trailing="{ state }">
          <slot name="trailing" v-bind="{ state }" />
        </template>

        <template v-if="!!$slots.default" #default="{ state }">
          <slot v-bind="{ state }" />
        </template>
      </Checkbox>
    </template>
  </CheckboxGroupRoot>
</template>
