<script lang="ts" setup>
import type { TocLink } from '@nuxt/content'

defineProps<{
  items: TocLink[]
}>()
</script>

<template>
  <ul>
    <template v-for="item in items" :key="item.id">
      <li>
        <NuxtLink :to="`#${item.id}`">
          {{ item.text }}
        </NuxtLink>

        <AppPageOutlineTree
          v-if="item.children"
          :items="item.children"
        />
      </li>
    </template>
  </ul>
</template>
