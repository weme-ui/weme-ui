<script lang="ts" setup>
import PinInput from '../pin-input.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
</script>

<template>
  <div class="flex-(~ y-center) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <div class="text-center w-1/4">
        <PinInput :variant="variant" />
      </div>
    </template>
  </div>
</template>
