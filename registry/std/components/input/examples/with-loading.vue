<script lang="ts" setup>
import Input from '../input.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
</script>

<template>
  <div class="flex-(~ center wrap) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <Input
        name="input"
        placeholder="Enter your text here"
        prefix-icon="user"
        class="min-w-80"
        :variant="variant"
        :invalid="false"
        clear
        loading
      />
    </template>
  </div>
</template>
