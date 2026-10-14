<script lang="ts" setup>
import { ref } from 'vue'
import AnimatedSelectIcon from '../animated-select-icon.vue'

const selected = ref(true)
</script>

<template>
  <button
    type="button"
    class="text-sm inline-flex gap-2 items-center"
    @click="selected = !selected"
  >
    <AnimatedSelectIcon
      icon="ri:star-line"
      :selected="selected"
      class="text-lg text-warning"
    />
    Same icon when selected
  </button>
</template>
