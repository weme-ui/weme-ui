<script lang="ts" setup>
import type { ContentNavigationItem } from '@nuxt/content'

defineProps<{
  sections: ContentNavigationItem[]
  navigation: ContentNavigationItem[]
}>()
</script>

<template>
  <aside class="w-65 flex-(~ col) gap-y-6 b-(r default) py-6 pr-6">
    <template v-if="sections">
      <DocNavigationSections :sections="sections" />
      <UiSeparator variant="dotted" />
    </template>

    <DocNavigationList :navigation="navigation" />
  </aside>
</template>
