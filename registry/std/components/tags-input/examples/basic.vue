<script lang="ts" setup>
import TagsInput from '../tags-input.vue'

const value = ref(['tag1', 'tag2', 'tag3'])
</script>

<template>
  <div class="text-center mt-4">
    <TagsInput
      v-model="value"
      placeholder="Enter your tags here"
      clear
      @change="console.log"
    />
  </div>
</template>
