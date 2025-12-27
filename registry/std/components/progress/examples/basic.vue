<script lang="ts" setup>
import Progress from '../progress.vue'

const value = ref(80)
</script>

<template>
  <Progress v-model="value" label="Progress" />
</template>
