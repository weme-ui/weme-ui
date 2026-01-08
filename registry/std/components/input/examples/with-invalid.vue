<script lang="ts" setup>
import Input from '../input.vue'

const text = ref('Hello World')

const variants = ['soft', 'outline', 'line', 'none'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <div v-for="variant in variants" :key="variant">
        <Input
          v-model="text"
          name="input"
          placeholder="Enter your text here"
          autocomplete="off"
          prefix-icon="user"
          suffix-icon="info"
          append="Append"
          prepend="Prepend"
          class="min-w-80"
          :variant="variant"
          :size="size"
          invalid
          clear
        />
      </div>
    </template>
  </div>
</template>
