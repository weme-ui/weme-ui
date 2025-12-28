<script lang="ts" setup>
import Timeline from '../timeline.vue'
</script>

<template>
  <Timeline
    :items="[
      { title: 'Title 1', description: 'Description 1' },
      { title: 'Title 2', description: 'Description 2' },
      { title: 'Title 3', description: 'Description 3' },
    ]"
  />
</template>
