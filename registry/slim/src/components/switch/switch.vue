<script lang="ts" generic="T extends boolean = boolean" setup>
import type { SwitchEmits, SwitchProps } from './switch.props'
import { reactiveOmit } from '@vueuse/core'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { computed, nextTick, ref, useSlots } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolAriaValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useSwitchStyle } from './switch.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchProps<T>>(), {
  variant: 'soft',
  size: 'md',
  radius: 'full',
  loadingIcon: 'ri:loader-line',
})

const emits = defineEmits<SwitchEmits<T>>()
const delegated = reactiveOmit(props, 'variant', 'size', 'radius', 'inverted', 'indicatorIcon', 'loadingIcon', 'checkedIcon', 'uncheckedIcon', 'unstyled', 'loading', 'invalid', 'class', 'ui')
const forwarded = useForwardPropsEmits(delegated, emits)

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const loading = computed(() => formFieldContext.loading.value || !!props.loading)
const disabled = computed(() => formFieldContext.disabled.value || !!props.disabled)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const slots = useSlots()

const hasCheckedIcon = computed(() => !!props.checkedIcon || !!slots.checkedIcon)
const hasUncheckedIcon = computed(() => !!props.uncheckedIcon || !!slots.uncheckedIcon)
const hasIndicator = computed(() => loading.value || !!props.indicatorIcon || !!slots.indicator || hasCheckedIcon.value || hasUncheckedIcon.value)

const pressed = ref(false)

const ui = computed(() => useSwitchStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  inverted: toBoolValue(props.inverted),
  unstyled: toBoolValue(props.unstyled),
  loading: loading.value,
  disabled: disabled.value,
}))

function handlePress(value: boolean) {
  nextTick(() => {
    pressed.value = value
  })
}

function handleUpdate(value: boolean) {
  emits('change', value as T)
}
</script>

<template>
  <SwitchRoot
    v-slot="{ checked }"
    data-slot="switch"
    :aria-pressed="toBoolAriaValue(pressed)"
    v-bind="{ ...forwarded, ...bindings, ...dataAttributes }"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @mousedown.stop="handlePress(true)"
    @mouseup.stop="handlePress(false)"
    @touchstart.stop="handlePress(true)"
    @touchend.stop="handlePress(false)"
    @update:model-value="handleUpdate"
  >
    <SwitchThumb :class="cn(ui.thumb(), props.ui?.thumb)">
      <slot v-if="hasIndicator" name="indicator" :checked="checked">
        <Icon v-if="loading" :name="loadingIcon" :class="cn(ui.indicator(), props.ui?.indicator)" />

        <slot v-else-if="hasCheckedIcon && checked" name="checked-icon">
          <Icon
            v-if="checkedIcon"
            :name="checkedIcon"
            :class="cn(ui.indicator(), props.ui?.indicator, ui.checkedIcon(), props.ui?.checkedIcon)"
          />
        </slot>

        <slot v-else-if="hasUncheckedIcon && !checked" name="unchecked-icon">
          <Icon
            v-if="uncheckedIcon"
            :name="uncheckedIcon"
            :class="cn(ui.indicator(), props.ui?.indicator, ui.uncheckedIcon(), props.ui?.uncheckedIcon)"
          />
        </slot>

        <Icon v-else-if="indicatorIcon" :name="indicatorIcon" :class="cn(ui.indicator(), props.ui?.indicator)" />
      </slot>
    </SwitchThumb>
  </SwitchRoot>
</template>
