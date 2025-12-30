<script lang="ts" setup>
import Button from '../button.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const

const variants = [
  'solid',
  'soft',
  'surface',
  'outline',
  'ghost',
  'plain',
  'inverse',
] as const
</script>

<template>
  <div class="grid-(~ cols-8) items-center gap-5 flex-wrap">
    <template v-for="color in colors" :key="color">
      <span class="text-(sm toned)">{{ color }}</span>
      <template v-for="variant in variants" :key="variant">
        <Button :label="variant" :color="color" :variant="variant" class="place-self-center" />
      </template>
    </template>
  </div>
</template>
