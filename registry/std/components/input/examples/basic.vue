<script lang="ts" setup>
import Input from '../input.vue'

const text = ref('')
</script>

<template>
  <div class="text-center mt-4">
    <Input
      v-model="text"
      name="input"
      prefix-icon="user"
      placeholder="Enter your text here"
      class="min-w-80"
      clear
    />
  </div>
</template>
