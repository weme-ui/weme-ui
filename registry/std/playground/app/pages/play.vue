<script lang="ts" setup>
const value = ref(80)
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiProgress v-model="value" size="sm" label="Progress" class="w-100" />
  </Container>
</template>
