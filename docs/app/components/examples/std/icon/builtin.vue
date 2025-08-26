<script lang="ts" setup>
import Icon from '@registry/std/components/icon/icon.vue'

const icons = [
  'arrowUp',
  'arrowRight',
  'arrowDown',
  'arrowLeft',
  'up',
  'right',
  'down',
  'left',
  'select',
  'check',
  'close',
  'plus',
  'minus',
  'more',
  'search',
  'refresh',
  'info',
  'success',
  'warning',
  'error',
  'help',
  'external',
  'user',
  'loading',
]
</script>

<template>
  <div class="grid-(~ cols-12) gap-12">
    <Icon v-for="icon in icons" :key="icon" :name="icon" />
  </div>
</template>
