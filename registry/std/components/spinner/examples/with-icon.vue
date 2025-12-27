<script lang="ts" setup>
import Spinner from '../spinner.vue'
</script>

<template>
  <div class="flex-(~ center) h-full">
    <Spinner icon="svg-spinners:gooey-balls-1" :ui="{ indicator: 'animate-unset' }" />
  </div>
</template>
