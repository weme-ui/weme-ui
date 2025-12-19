<script lang="ts" setup>
const items = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}))
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiScrollArea v-slot="{ item }" class="h-80 w-100" :items="items" virtualize>
      <UiItem :label="item.title" :description="item.description" clickable />
    </UiScrollArea>
  </Container>
</template>
