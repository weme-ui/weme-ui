<script lang="ts" setup>
import { ref } from 'vue'
import AnimatedSelectIcon from '../animated-select-icon.vue'

const selected = ref(false)
</script>

<template>
  <button
    type="button"
    class="text-sm inline-flex gap-2 items-center"
    @click="selected = !selected"
  >
    <AnimatedSelectIcon
      icon="ri:heart-line"
      selected-icon="ri:heart-fill"
      :selected="selected"
      class="text-lg text-error"
    />
    Toggle
  </button>
</template>
