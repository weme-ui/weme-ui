<script lang="ts" setup>
import { ref } from 'vue'
import Progress from '../progress.vue'

const value = ref(80)
</script>

<template>
  <div class="flex-(~ y-center) gap-4">
    <Progress v-model="value" class="w-full" />
    <Progress v-model="value" label="Progress" class="w-full" />
  </div>
</template>
