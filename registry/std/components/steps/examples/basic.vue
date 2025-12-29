<script lang="ts" setup>
import { ref } from 'vue'
import Steps from '../steps.vue'

const value = ref(1)
</script>

<template>
  <Steps
    v-model="value"
    :items="[
      { title: 'Title 1', description: 'Description 1' },
      { title: 'Title 2', description: 'Description 2' },
      { title: 'Title 3', description: 'Description 3' },
    ]"
  />
</template>
