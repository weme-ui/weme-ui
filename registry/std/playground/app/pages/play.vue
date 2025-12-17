<script lang="ts" setup>
import type { StepItem } from '../../../components/steps/steps.props'

const items: StepItem[] = [
  { title: 'Step 1', description: 'This is the first step.' },
  { title: 'Step 2', description: 'This is the second step.' },
  { title: 'Step 3', description: 'This is the third step.' },
]

const stepper = useTemplateRef('stepper')
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <div class="flex-(~ col) gap-10 w-260">
      <UiSteps ref="stepper" :items="items" orientation="vertical" size="sm" color="primary" variant="solid" />

      <UiButtonGroup>
        <UiButton label="Prev" :disabled="!stepper?.hasPrev" @click="stepper?.prev()" />
        <UiButton label="Next" :disabled="!stepper?.hasNext" @click="stepper?.next()" />
      </UiButtonGroup>
    </div>
  </Container>
</template>
