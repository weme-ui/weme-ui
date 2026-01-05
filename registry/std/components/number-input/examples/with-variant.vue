<script lang="ts" setup>
import NumberInput from '../number-input.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
const orientations = ['horizontal', 'vertical'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6 mt-4">
    <template v-for="orientation in orientations" :key="orientation">
      <template v-for="variant in variants" :key="variant">
        <NumberInput
          placeholder="Please enter a number"
          :variant="variant"
          :orientation="orientation"
        />
      </template>
    </template>
  </div>
</template>
