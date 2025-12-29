<script lang="ts" setup>
import { ref } from 'vue'
import Steps from '../steps.vue'

const value = ref(1)
</script>

<template>
  <div class="flex-(~ col) gap-6">
    <Steps
      v-model="value"
      :items="[
        { icon: 'lucide:panda', completedIcon: 'lucide:ice-cream-bowl', title: 'Title 1', description: 'Description 1' },
        { icon: 'lucide:cat', completedIcon: 'lucide:heart', title: 'Title 2', description: 'Description 2' },
        { icon: 'lucide:dog', completedIcon: 'lucide:ice-cream-cone', title: 'Title 3', description: 'Description 3' },
      ]"
    />
  </div>
</template>
