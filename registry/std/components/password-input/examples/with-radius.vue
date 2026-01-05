<script lang="ts" setup>
import PasswordInput from '../password-input.vue'

const variants = ['soft', 'outline'] as const
const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-6 mt-4">
    <template v-for="radius in radiuses" :key="radius">
      <template v-for="variant in variants" :key="variant">
        <PasswordInput
          name="input"
          placeholder="Enter your password here"
          autocomplete="off"
          class="min-w-80"
          prefix-icon="lucide:lock"
          :variant="variant"
          :radius="radius"
        />
      </template>
    </template>
  </div>
</template>
