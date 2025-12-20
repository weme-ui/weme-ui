<script lang="ts" setup>
const show = ref(false)
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiButton label="Open" @click="show = true" />

    <UiActionSheet v-model="show">
      <template #selection>
        3 selected
      </template>
      <template #actions>
        <UiButton icon="lucide:star" label="Like" variant="outline" />
        <UiButton icon="lucide:share-2" label="Share" variant="outline" />
      </template>
    </UiActionSheet>
  </Container>
</template>
