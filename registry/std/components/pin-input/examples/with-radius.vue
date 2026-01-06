<script lang="ts" setup>
import PinInput from '../pin-input.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-5) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <template v-for="radius in radiuses" :key="radius">
        <div class="text-center w-1/5">
          <PinInput :variant="variant" :radius="radius" />
        </div>
      </template>
    </template>
  </div>
</template>
