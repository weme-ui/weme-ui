<script lang="ts" setup>
import { ref } from 'vue'
import Spinner from '../spinner.vue'

const loading = ref(true)
</script>

<template>
  <Spinner v-model="loading" description="wait a moment">
    <div class="flex-(~ center) h-20 bg-muted">
      The quick brown fox jumps over the lazy fox.
    </div>
  </Spinner>
</template>
