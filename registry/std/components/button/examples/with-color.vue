<script lang="ts" setup>
import { THEME_COLORS } from '@weme-ui/unocss-preset'
import Button from '../button.vue'

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
    <template v-for="color in THEME_COLORS" :key="color">
      <span class="text-(sm toned)">{{ color }}</span>
      <template v-for="variant in variants" :key="variant">
        <Button :label="variant" :color="color" :variant="variant" class="place-self-center" />
      </template>
    </template>
  </div>
</template>
