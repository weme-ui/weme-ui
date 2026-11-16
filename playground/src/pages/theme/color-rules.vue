<script lang="ts" setup>
import ColorPalette from '@/components/color-palette.vue'
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'
</script>

<template>
  <Example name="Color rules" description="Discover all color rules.">
    <Preview name="Theme Colors" class="flex gap-4">
      <ColorPalette class="bg-accent" />
      <ColorPalette class="bg-neutral" />
      <ColorPalette class="bg-info" />
      <ColorPalette class="bg-success" />
      <ColorPalette class="bg-warning" />
      <ColorPalette class="bg-error" />
    </Preview>

    <Preview name="Foreground" class="flex gap-4">
      <ColorPalette class="bg-text-highlighted" />
      <ColorPalette class="bg-text" />
      <ColorPalette class="bg-text-subtle" />
      <ColorPalette class="bg-text-muted" />
      <ColorPalette class="bg-text-inverted" />
    </Preview>

    <Preview name="Background" class="flex gap-4">
      <ColorPalette class="bg-default" />
      <ColorPalette class="bg-muted" />
      <ColorPalette class="bg-elevated" />
      <ColorPalette class="bg-inverted" />
    </Preview>

    <Preview name="Border" class="flex gap-4">
      <ColorPalette class="bg-border" />
      <ColorPalette class="bg-border-elevated" />
      <ColorPalette class="bg-border-inverted" />
    </Preview>
  </Example>
</template>
