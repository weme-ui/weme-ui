<script lang="ts" setup>
import Button from '../../button/button.vue'
import Steps from '../steps.vue'

const step = ref()
const value = ref(1)
</script>

<template>
  <div class="flex-(~ col) gap-6">
    <Steps
      ref="step"
      v-model="value"
      :items="[
        { title: 'Title 1', description: 'Description 1' },
        { title: 'Title 2', description: 'Description 2' },
        { title: 'Title 3', description: 'Description 3' },
      ]"
    />

    <div class="flex gap-2 mt-6">
      <Button :disabled="step && !step.hasPrev" @click="step.prev()">
        Prev
      </Button>
      <Button :disabled="step && !step.hasNext" @click="step.next()">
        Next
      </Button>
    </div>
  </div>
</template>
