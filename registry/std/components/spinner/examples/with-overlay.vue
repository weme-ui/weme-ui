<script lang="ts" setup>
import { ref } from 'vue'
import Switch from '../../switch/switch.vue'
import Spinner from '../spinner.vue'

const loading = ref(true)
</script>

<template>
  <div class="flex-(~ center) mb-4">
    <Switch v-model="loading" />
  </div>
  <Spinner :loading="loading" description="wait a moment">
    <div class="flex-(~ center) h-20 bg-muted">
      The quick brown fox jumps over the lazy fox.
    </div>
  </Spinner>
</template>
