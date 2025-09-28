<script lang="ts" setup>
import type { StepperEmits, StepperItem, StepperProps } from './stepper.props'
import { reactivePick } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { Stepper } from 'reka-ui/namespaced'
import { computed } from 'vue'
import Icon from '../icon/icon.vue'
import { useStepperStyle } from './stepper.style'

const props = withDefaults(defineProps<StepperProps>(), {
  color: 'accent',
  orientation: 'horizontal',
  linear: true,
  completedIcon: 'check',
  steps: () => [],
})

const emits = defineEmits<StepperEmits>()
const modelValue = defineModel<string | number>()

const delegated = reactivePick(props, 'as', 'defaultValue', 'orientation', 'linear')
const forwarded = useForwardPropsEmits(delegated, emits)

const currentStepIndex = computed({
  get() {
    const value = modelValue.value ?? props.defaultValue

    return ((typeof value === 'string')
      ? props.steps.findIndex(step => step.value === value)
      : value) ?? 0
  },
  set(value: number) {
    modelValue.value = props.steps?.[value]?.value ?? value
  },
})

const currentStep = computed(() => props.steps?.[currentStepIndex.value])
const hasNext = computed(() => currentStepIndex.value < props.steps?.length - 1)
const hasPrev = computed(() => currentStepIndex.value > 0)

const ui = computed(() => useStepperStyle(props))

defineExpose({
  next() {
    if (hasNext.value) {
      currentStepIndex.value += 1
      emits('next', currentStep.value as StepperItem)
    }
  },
  prev() {
    if (hasPrev.value) {
      currentStepIndex.value -= 1
      emits('prev', currentStep.value as StepperItem)
    }
  },
  hasNext,
  hasPrev,
})
</script>

<template>
  <Stepper.Root
    v-slot="{ modelValue: current, totalSteps }"
    v-model="currentStepIndex"
    v-bind="forwarded"
    :class="ui.base({ class: [props.class, props.ui?.base] })"
  >
    <Stepper.Item
      v-for="(step, index) in steps"
      v-slot="{ state }"
      :key="index"
      :step="index"
      :class="ui.item({ isLatest: index === steps.length - 1, class: [props.ui?.item, step.class, step.ui?.item] })"
    >
      <Stepper.Trigger :class="ui.trigger({ isLatest: index === steps.length - 1, class: [props.ui?.trigger, step.ui?.trigger] })">
        <Stepper.Indicator :class="ui.indicator({ class: [props.ui?.indicator, step.ui?.indicator] })">
          <slot v-if="$slots.icon || step.icon" name="icon" v-bind="{ totalSteps, state, step, current }">
            <Icon
              v-if="step.icon"
              :name="state === 'completed' ? completedIcon : step.icon"
              :class="ui.icon({ class: [props.ui?.icon, step.ui?.icon] })"
            />
          </slot>

          <slot v-else name="icon" v-bind="{ totalSteps, state, step, current }">
            <span :class="ui.icon({ class: [props.ui?.icon, step.ui?.icon] })">
              {{ step }}
            </span>
          </slot>
        </Stepper.Indicator>
      </Stepper.Trigger>

      <div :class="ui.content({ class: [props.ui?.content, step.ui?.content] })">
        <Stepper.Title :class="ui.title({ isLatest: index === steps.length - 1, class: [props.ui?.title, step.ui?.title] })">
          <slot name="title" v-bind="{ totalSteps, state, step, current }">
            {{ step.title }}
          </slot>
        </Stepper.Title>

        <Stepper.Description :class="ui.description({ class: [props.ui?.description, step.ui?.description] })">
          <slot name="description" v-bind="{ totalSteps, state, step, current }">
            {{ step.description }}
          </slot>
        </Stepper.Description>
      </div>
    </Stepper.Item>
  </Stepper.Root>
</template>
