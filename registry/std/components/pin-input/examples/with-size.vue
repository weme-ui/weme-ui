<script lang="ts" setup>
import PinInput from '../pin-input.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-5) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <template v-for="size in sizes" :key="size">
        <div class="text-center w-1/5">
          <PinInput :variant="variant" :size="size" />
        </div>
      </template>
    </template>
  </div>
</template>
