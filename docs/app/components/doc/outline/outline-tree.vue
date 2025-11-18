<script lang="ts" setup>
import type { TocLink } from '@nuxt/content'

defineProps<{
  items: TocLink[]
  class?: any
}>()
</script>

<template>
  <ul :class="$props.class">
    <li v-for="item in items" :key="item.id">
      <UiLink :to="`#${item.id}`" color="neutral">
        {{ item.text }}
      </UiLink>

      <DocOutlineTree v-if="item.children" :items="item.children" />
    </li>
  </ul>
</template>
