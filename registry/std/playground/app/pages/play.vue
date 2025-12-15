<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiComment
      avatar="https://github.com/moujinet.png"
      author="Allen Luo"
      datetime="2025-08-02 10:00:00"
      content="The quick brown fox jumps over the lazy fox."
      :actions="[
        { label: 'Reply', icon: 'lucide:reply' },
        { label: 'Like', icon: 'lucide:heart' },
      ]"
      size="sm"
      align="end"
      class="w-120"
    />
  </Container>
</template>
