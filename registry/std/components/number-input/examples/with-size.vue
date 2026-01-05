<script lang="ts" setup>
import NumberInput from '../number-input.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
const orientations = ['horizontal', 'vertical'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6 mt-4">
    <template v-for="orientation in orientations" :key="orientation">
      <template v-for="variant in variants" :key="variant">
        <template v-for="size in sizes" :key="size">
          <NumberInput
            placeholder="Please enter a number"
            :variant="variant"
            :orientation="orientation"
            :size="size"
          />
        </template>
      </template>
    </template>
  </div>
</template>
