<script lang="ts" setup>
import Kbd from '../kbd.vue'

const keys = Object.keys(kbdKeysMap)
</script>

<template>
  <div class="grid-(~ cols-15) justify-center items-center h-full py-4 gap-6">
    <template v-for="key in keys" :key="key">
      <Kbd :value="key" class="place-self-center" />
    </template>
  </div>
</template>
