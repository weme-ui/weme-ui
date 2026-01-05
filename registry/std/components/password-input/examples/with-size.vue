<script lang="ts" setup>
import PasswordInput from '../password-input.vue'

const variants = ['soft', 'outline'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <template v-for="variant in variants" :key="variant">
        <PasswordInput
          name="input"
          placeholder="Enter your password here"
          autocomplete="off"
          class="min-w-80"
          prefix-icon="lucide:lock"
          :variant="variant"
          :size="size"
        />
      </template>
    </template>
  </div>
</template>
