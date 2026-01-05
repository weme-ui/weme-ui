<script lang="ts" setup>
import Input from '../input.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ center wrap) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <div v-for="variant in variants" :key="variant">
        <Input
          name="input"
          placeholder="Enter your text here"
          autocomplete="off"
          prefix-icon="user"
          suffix-icon="info"
          class="min-w-80"
          counter
          :max-length="10"
          :variant="variant"
          :size="size"
        />
      </div>
    </template>
  </div>
</template>
