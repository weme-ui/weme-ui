<script lang="ts" setup>
import ColorPalette from '@/components/color-palette.vue'
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'
</script>

<template>
  <Example name="Color rules" description="Discover all color rules.">
    <Preview name="Theme Colors" class="flex gap-4">
      <ColorPalette class="bg-primary" />
      <ColorPalette class="bg-secondary" />
      <ColorPalette class="bg-neutral" />
      <ColorPalette class="bg-info" />
      <ColorPalette class="bg-success" />
      <ColorPalette class="bg-warning" />
      <ColorPalette class="bg-danger" />
    </Preview>

    <Preview name="Foreground" class="flex gap-4">
      <ColorPalette class="bg-fg-highlighted" />
      <ColorPalette class="bg-fg" />
      <ColorPalette class="bg-fg-toned" />
      <ColorPalette class="bg-fg-muted" />
    </Preview>

    <Preview name="Background" class="flex gap-4">
      <ColorPalette class="bg-elevated" />
      <ColorPalette class="bg-muted" />
      <ColorPalette class="bg-dimmed" />
      <ColorPalette class="bg-default" />
    </Preview>

    <Preview name="Border" class="flex gap-4">
      <ColorPalette class="bg-border" />
      <ColorPalette class="bg-border-elevated" />
    </Preview>
  </Example>
</template>
