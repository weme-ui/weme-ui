<script lang="ts" setup>
import Separator from '../separator.vue'
</script>

<template>
  <div class="flex-(~ col) gap-4 py-4">
    <Separator label="Default" />
    <Separator label="Start" label-placement="start" />
    <Separator label="End" label-placement="end" />
  </div>
</template>
