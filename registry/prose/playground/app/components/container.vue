<script lang="ts" setup>
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'

defineProps<{
  name?: string
  description?: string
}>()

const open = ref(true)
</script>

<template>
  <CollapsibleRoot v-model:open="open" class="flex-(~ col) gap-y-6 container px-4 py-3 mx-auto rounded-lg transition-colors last:mb-0 state-open:h-[calc(100vh-11rem)] state-closed:ring-(~ default) state-closed:shadow-sm">
    <div class="flex-(~ y-center) w-full h-6">
      <div class="flex-(~ 1 y-center) gap-3">
        <h2 class="text-highlighted font-medium">
          {{ name }}
        </h2>

        <p v-if="description" class="op-50 text-3 pl-3 b-(l default)">
          {{ description }}
        </p>
      </div>

      <CollapsibleTrigger class="flex-(~ center) rounded-full size-8 text-4">
        <svg v-if="open" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 20l5-5l5 5M7 4l5 5l5-5" />
        </svg>

        <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 15l5 5l5-5M7 9l5-5l5 5" />
        </svg>
      </CollapsibleTrigger>
    </div>

    <CollapsibleContent class="flex-(~ 1 center) b-(~ default) p-8 rounded-lg">
      <div>
        <slot />
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
