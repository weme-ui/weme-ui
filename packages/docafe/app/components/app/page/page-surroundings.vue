<script lang="ts" setup>
import type { DocsCollectionItem } from '@nuxt/content'

const { page } = defineProps<{
  page?: DocsCollectionItem
}>()

const { data: surround } = await useAsyncData(
  computed(() => normalizePath('surround', page?.path || '/')),
  () => queryCollectionItemSurroundings('docs', page?.path || '/'),
)
</script>

<template>
  {{ surround }}
</template>
