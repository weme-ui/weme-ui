<script lang="ts" setup>
import TagsInput from '../tags-input.vue'

const value = ref(['tag1', 'tag2', 'tag3'])
const variants = ['soft', 'outline', 'line', 'none'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <template v-for="variant in variants" :key="variant">
        <TagsInput
          v-model="value"
          placeholder="Enter your tags here"
          :variant="variant"
          :size="size"
        />
      </template>
    </template>
  </div>
</template>
