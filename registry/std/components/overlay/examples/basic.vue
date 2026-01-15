<script lang="ts" setup>
import { ref } from 'vue'
import Button from '../../button/button.vue'
import Overlay from '../overlay.vue'

const visible = ref(false)
</script>

<template>
  <div class="flex-(~ center)">
    <Button label="Open" @click="visible = !visible" />
  </div>

  <Overlay :visible="visible" class="fixed" @click="visible = false" />
</template>
