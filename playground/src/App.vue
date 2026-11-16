<script lang="ts" setup>
import Container from '@/components/container.vue'
</script>

<template>
  <Container>
    <RouterView />
  </Container>
</template>

<style>
body {
  background: var(--bg);
  color: var(--text);
}
</style>
