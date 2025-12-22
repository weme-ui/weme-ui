<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiModal icon="lucide:album" title="Title" description="This is a description." variant="normal" size="md" radius="xl" placement="right" translucent closable>
      <UiButton label="Open" />

      <template #content>
        <div>
          Hello World
        </div>
      </template>

      <template #footer="{ close }">
        <UiButtonGroup radius="md">
          <UiButton label="Apply" variant="solid" class="shadow-xs" />
          <UiButton label="Cancel" class="shadow-xs" @click="close" />
        </UiButtonGroup>
      </template>
    </UiModal>
  </Container>
</template>
