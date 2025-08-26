<script lang="ts" setup>
import { useFeaturesStyle } from '~/styles/features.style'

const { list } = defineProps<{
  icon?: string
  list?: string[]
}>()

const { page } = useContent()

const { data: features } = await useAsyncData(
  computed(() => `features:${page.value?.path}`),
  () => list ? Promise.all(list.map(item => parseMarkdown(item))) : Promise.resolve([]),
)

const ui = useFeaturesStyle()
</script>

<template>
  <ul v-if="features && features.length" :class="ui.base()">
    <li v-for="(item, index) in features" :key="index" :class="ui.item()">
      <span :class="ui.icon()">
        <AppIcon :name="icon || 'check'" class="size-4" />
      </span>

      <ContentRenderer tag="strong" unwrap="p" :class="ui.label()" :value="item" />
    </li>
  </ul>
</template>
