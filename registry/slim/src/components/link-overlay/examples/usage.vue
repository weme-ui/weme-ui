<script lang="ts" setup>
import LinkOverlay from '../link-overlay.vue'
</script>

<template>
  <article class="p-4 border border-border-base rounded-lg max-w-sm transition-colors relative hover:bg-background-muted">
    <h3 class="text-base font-medium">
      <LinkOverlay href="#getting-started">
        Getting Started
      </LinkOverlay>
    </h3>
    <p class="text-sm text-foreground-muted mt-1">
      整张卡片可点击，标题仍是语义化链接。
    </p>
  </article>
</template>
