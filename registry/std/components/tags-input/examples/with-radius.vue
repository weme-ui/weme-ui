<script lang="ts" setup>
import TagsInput from '../tags-input.vue'

const value = ref(['tag1', 'tag2', 'tag3'])
const variants = ['soft', 'outline', 'line', 'none'] as const
const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6 mt-4">
    <template v-for="radius in radiuses" :key="radius">
      <template v-for="variant in variants" :key="variant">
        <TagsInput
          v-model="value"
          placeholder="Enter your tags here"
          :variant="variant"
          :radius="radius"
        />
      </template>
    </template>
  </div>
</template>
