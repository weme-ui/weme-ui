<script lang="ts" setup>
import Textarea from '../textarea.vue'

const variants = ['soft', 'outline'] as const
const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-6 mt-4">
    <template v-for="radius in radiuses" :key="radius">
      <template v-for="variant in variants" :key="variant">
        <Textarea
          name="textarea"
          placeholder="Enter your text here"
          class="min-w-80"
          :variant="variant"
          :radius="radius"
        />
      </template>
    </template>
  </div>
</template>
