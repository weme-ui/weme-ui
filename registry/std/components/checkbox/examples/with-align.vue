<script lang="ts" setup>
import Checkbox from '../checkbox.vue'

const aligns = ['start', 'center', 'end'] as const
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <template v-for="align in aligns" :key="align">
      <Checkbox :align="align" label="Checkbox" description="This is a description." />
    </template>
  </div>
</template>
