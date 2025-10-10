<script lang="ts" setup>
import Textarea from '@registry/std/components/textarea/textarea.vue'

const value = ref('')
</script>

<template>
  <Textarea v-model="value" :max-length="100" show-count />
</template>
