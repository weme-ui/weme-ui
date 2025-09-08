<script lang="ts" setup>
import { version } from '../../../package.json'
import DarkMode from './dark-mode.vue'
import Logo from './logo.vue'

defineProps<{
  class?: any
}>()
</script>

<template>
  <div class="relative flex">
    <div class="fixed top-6 left-8 size-8 z-10">
      <Logo />
    </div>
    <div class="fixed top-8 right-8 z-10">
      <DarkMode />
    </div>

    <div class="relative flex-1 px-32 py-20">
      <main class="flex-(~ col) gap-10" :class="$props.class">
        <slot />
      </main>
    </div>

    <small class="fixed font-mono text-(3 toned) bottom-6 left-6 z-10">ver: {{ version }}</small>
    <small class="fixed font-mono text-(3 toned) bottom-6 right-6 z-10">
      designed with ♥︎
    </small>
  </div>
</template>
