<script lang="ts" setup>
import Input from '../input.vue'

const variants = ['soft', 'outline'] as const
const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <template v-for="variant in variants" :key="variant">
        <Input
          name="input"
          placeholder="Enter your text here"
          autocomplete="off"
          class="min-w-80"
          :variant="variant"
          :radius="radius"
        />
      </template>
    </template>
  </div>
</template>
