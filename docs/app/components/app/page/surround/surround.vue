<script lang="ts" setup>
const route = useRoute()

const { data: surround } = await useAsyncData(
  computed(() => normalizePath('surround', route.path)),
  () => queryCollectionItemSurroundings('docs', route.path, { fields: ['description'] }),
)
</script>

<template>
  <CardGroup :columns="2">
    <template v-for="(item, index) in surround" :key="index">
      <Card
        v-if="item"
        :title="item.title"
        :href="item.path"
        :icon="index === 0 ? 'lucide:circle-arrow-left' : 'lucide:circle-arrow-right'"
        :right="index === 1"
      >
        {{ item.description }}
      </Card>
      <div v-else />
    </template>
  </CardGroup>
</template>
