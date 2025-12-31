<script lang="ts" setup>
import { ref } from 'vue'
import Button from '../../button/button.vue'
import Overlay from '../overlay.vue'

const open = ref(false)
</script>

<template>
  <div class="flex-(~ center)">
    <Button label="Open" @click="open = !open" />
  </div>

  <Overlay v-model="open" class="fixed" @click="open = false" />
</template>
