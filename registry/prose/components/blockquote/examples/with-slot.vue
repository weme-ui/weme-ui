<script lang="ts" setup>
import Icon from '../../../../std/components/icon/icon.vue'
import Blockquote from '../blockquote.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <template v-for="color in colors" :key="color">
      <Blockquote variant="none" :color="color">
        The quick brown fox jumps over the lazy fox.
        <template #icon>
          <Icon name="lucide:quote" />
        </template>
        <template #caption>
          — Antfu
        </template>
      </Blockquote>
    </template>
  </div>
</template>
