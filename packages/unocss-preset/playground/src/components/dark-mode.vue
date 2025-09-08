<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button class="text-4 cursor-pointer" @click="toggleDark()">
    <div v-if="isDark" class="i-lucide-sun" />
    <div v-else class="i-lucide-moon" />
  </button>
</template>
