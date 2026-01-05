<script lang="ts" setup>
import PasswordInput from '../password-input.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
</script>

<template>
  <div class="flex-(~ center wrap) gap-6 mt-4">
    <template v-for="variant in variants" :key="variant">
      <PasswordInput
        name="input"
        placeholder="Enter your password here"
        autocomplete="off"
        class="min-w-80"
        prefix-icon="lucide:lock"
        :variant="variant"
      />
    </template>
  </div>
</template>
