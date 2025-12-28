<script lang="ts" setup>
import Timeline from '../timeline.vue'
</script>

<template>
  <Timeline
    :items="[
      { avatar: 'https://github.com/antfu.png', title: 'Antfu', description: 'UnoCSS is awesome!' },
      { avatar: 'https://github.com/yyx990803.png', title: 'Evan You', description: 'Vue is awesome!' },
      { avatar: 'https://github.com/posva.png', title: 'Posva', description: 'Vite is awesome!' },
    ]"
  />
</template>
