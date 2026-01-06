<script lang="ts" setup>
import Textarea from '../textarea.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <Textarea
        name="textarea"
        placeholder="Enter your text here"
        class="min-w-80"
        :variant="variant"
      />
    </template>
  </div>
</template>
