<script lang="ts" setup>
import Switch from '../switch.vue'

const value = ref(false)
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <Switch v-model="value" />
    <Switch v-model="value" disabled />
  </div>
</template>
