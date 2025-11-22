<script lang="ts" setup>
import { useColorMode, useCycleList } from '@vueuse/core'
import { watchEffect } from 'vue'

const mode = useColorMode({
  emitAuto: true,
})

const { state, next } = useCycleList(['dark', 'light'] as const, { initialValue: mode })

watchEffect(() => mode.value = state.value)
</script>

<template>
  <button class="text-4 cursor-pointer" @click="next()">
    <div v-if="mode" class="i-lucide-sun" />
    <div v-else class="i-lucide-moon" />
  </button>
</template>
