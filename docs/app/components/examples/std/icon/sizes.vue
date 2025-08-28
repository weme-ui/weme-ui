<script lang="ts" setup>
import IconBox from '@registry/std/components/icon/icon-box.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="grid-(~ cols-5) items-center gap-12">
    <IconBox
      v-for="size in sizes"
      :key="size"
      :size="size"
      name="info"
    />
  </div>
</template>
