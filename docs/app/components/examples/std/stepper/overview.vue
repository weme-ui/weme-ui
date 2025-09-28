<script lang="ts" setup>
import type { StepperItem } from '@registry/std/components/stepper/stepper.props'
import Stepper from '@registry/std/components/stepper/stepper.vue'
import Switch from '@registry/std/components/switch/switch.vue'
import { useTemplateRef } from 'vue'

const steps: StepperItem[] = [
  {
    icon: 'lucide:diamond',
    title: 'Succeeded',
    description: 'This is a success step.',
  },
  {
    icon: 'lucide:hexagon',
    title: 'Processing',
    description: 'This is a processing step.',
  },
  {
    icon: 'lucide:circle-dashed',
    title: 'Pending',
    description: 'This is a pending step.',
  },
] as const

const current = ref(1)
const isHorizontal = ref(false)
const stepperRef = useTemplateRef('stepper')
</script>

<template>
  <div class="flex-(~ col) gap-8">
    <div class="flex-(~ y-center) justify-end gap-3" :class="{ 'text-highlighted': isHorizontal }">
      <Switch v-model="isHorizontal" />
      Horizontal
    </div>

    <div class="flex" :class="{ 'flex-col gap-8': isHorizontal, 'flex-row gap-12': !isHorizontal }">
      <Stepper ref="stepper" v-model="current" :orientation="isHorizontal ? 'horizontal' : 'vertical'" :steps="steps" />

      <div class="flex-(~ 1 center) p-6 rounded-lg b-(~ dashed default) bg-dimmed">
        <p>
          This is the <span class="text-highlighted font-medium">step {{ current + 1 }}</span> content.
        </p>
      </div>
    </div>

    <div class="flex-(~ center) justify-end gap-x-2">
      <UiButton text="Prev" variant="soft" class="min-w-24" :disabled="!stepperRef?.hasPrev" @click="stepperRef?.prev()" />
      <UiButton class="min-w-24" :text="stepperRef?.hasNext ? 'Next' : 'Done'" @click="stepperRef?.hasNext && stepperRef?.next()" />
    </div>
  </div>
</template>
