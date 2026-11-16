<script lang="ts" setup>
const props = defineProps<{
  name?: string
  description?: string
  class?: any
}>()
</script>

<template>
  <div class="flex-(~ col) gap-y-4">
    <div class="flex-(~ y-center) gap-3">
      <h2 class="text-(lg highlighted) font-medium">
        {{ name }}
      </h2>

      <p v-if="description" class="op-50 text-3 pl-3 b-(l default)">
        {{ description }}
      </p>
    </div>

    <div class="flex-(~ 1 center) b-(~ default) p-8 rounded-lg">
      <div class="w-full" :class="props.class ? props.class : 'flex-(~ col) gap-y-6'">
        <slot />
      </div>
    </div>
  </div>
</template>
