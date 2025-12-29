<script lang="ts" setup>
import type { StepsEmits, StepsProps } from './steps.props'
import { reactivePick } from '@vueuse/core'
import { StepperDescription, StepperIndicator, StepperItem, StepperRoot, StepperSeparator, StepperTitle, StepperTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useStepsStyle } from './steps.style'

const props = withDefaults(defineProps<StepsProps>(), {
  completedIcon: 'check',
  color: 'primary',
  variant: 'solid',
  orientation: 'horizontal',
  size: 'md',
  items: () => [],
})

const emits = defineEmits<StepsEmits>()
const delegated = reactivePick(props, 'as', 'asChild', 'defaultValue', 'dir', 'linear', 'orientation')
const forwarded = useForwardPropsEmits(delegated, emits)

const modelValue = defineModel<number>()

const currentStepIndex = computed({
  get() {
    return modelValue.value ?? props.defaultValue ?? 1
  },
  set(value: number) {
    modelValue.value = props.items?.[value]?.step ?? value
  },
})

const hasNext = computed(() => currentStepIndex.value <= props.items?.length)
const hasPrev = computed(() => currentStepIndex.value > 1)

const items = computed(() => props.items.map((item, index) => ({
  ...item,
  step: item.step ?? index + 1,
})))

const ui = computed(() => useStepsStyle({
  ...props,
}))

defineExpose({
  next() {
    if (hasNext.value) {
      currentStepIndex.value += 1
    }
  },
  prev() {
    if (hasPrev.value) {
      currentStepIndex.value -= 1
    }
  },
  hasNext,
  hasPrev,
})
</script>

<template>
  <StepperRoot
    v-slot="{ totalSteps }"
    v-model="currentStepIndex"
    v-bind="forwarded"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    data-slot="root"
  >
    <StepperItem
      v-for="(item, index) in items"
      v-slot="{ state }"
      :key="index"
      :step="item.step"
      :completed="item.completed"
      :disabled="item.disabled"
      :class="cn(ui.item({ isLatest: index === totalSteps - 1 }), props.ui?.item)"
      data-slot="item"
    >
      <StepperTrigger :class="cn(ui.trigger({ isLatest: index === totalSteps - 1 }), props.ui?.trigger)" data-slot="trigger">
        <StepperIndicator :data-state="state" :class="cn(ui.indicator(), props.ui?.indicator)" data-slot="indicator">
          <slot v-if="item.icon || $slots.indicator" name="indicator" v-bind="{ totalSteps, state, item, modelValue }">
            <Icon
              v-if="item.icon"
              :name="state === 'completed' ? item.completedIcon || completedIcon : item.icon"
              :class="cn(ui.indicatorIcon(), props.ui?.indicatorIcon)"
              data-slot="indicatorIcon"
            />
          </slot>
          <slot v-else name="indicator" v-bind="{ totalSteps, state, item, modelValue }">
            <Icon
              v-if="state === 'completed'"
              :name="item.completedIcon || completedIcon"
              :class="cn(ui.indicatorIcon(), props.ui?.indicatorIcon)"
              data-slot="indicatorIcon"
            />
            <template v-else>
              {{ item.step }}
            </template>
          </slot>
        </StepperIndicator>
        <StepperSeparator
          v-if="orientation === 'vertical' && index < totalSteps - 1"
          :class="cn(ui.separator(), props.ui?.separator)"
          data-slot="separator"
        />
      </StepperTrigger>

      <div :class="cn(ui.wrapper(), props.ui?.wrapper)" data-slot="wrapper">
        <StepperTitle
          :data-state="state"
          :class="cn(ui.title({ isLatest: index === totalSteps - 1 }), props.ui?.title)"
          data-slot="title"
        >
          <slot name="title" v-bind="{ totalSteps, state, item, modelValue }">
            {{ item.title }}
          </slot>
          <StepperSeparator
            v-if="orientation === 'horizontal' && index < totalSteps - 1"
            :class="cn(ui.separator(), props.ui?.separator)"
            data-slot="separator"
          />
        </StepperTitle>
        <StepperDescription
          v-if="item.description"
          :data-state="state"
          :class="cn(ui.description({ isLatest: index === totalSteps - 1 }), props.ui?.description)"
          data-slot="description"
        >
          <slot name="description" v-bind="{ totalSteps, state, item, modelValue }">
            {{ item.description }}
          </slot>
        </StepperDescription>
      </div>
    </StepperItem>
  </StepperRoot>
</template>
