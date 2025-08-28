<script lang="ts" setup>
import IconBox from '@registry/std/components/icon/icon-box.vue'

const radiuses = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-6) gap-12">
    <IconBox
      v-for="radius in radiuses"
      :key="radius"
      :radius="radius"
      name="info"
      size="lg"
    />
  </div>
</template>
