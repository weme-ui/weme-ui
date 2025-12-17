<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiCollapsible orientation="top" disabled>
      <template #trigger="{ open }">
        <button>{{ open ? 'Open' : 'Close' }}</button>
      </template>

      <template #default>
        <div class="p-6 box-primary rounded-lg" />
      </template>
    </UiCollapsible>
  </Container>
</template>
