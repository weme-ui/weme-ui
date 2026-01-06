<script lang="ts" setup>
import Switch from '../switch.vue'

const value = ref(false)
</script>

<template>
  <div class="flex-(~ center) mt-4">
    <Switch v-model="value" />
  </div>
</template>
