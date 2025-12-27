<script lang="ts" setup>
import Skeleton from '../skeleton.vue'
</script>

<template>
  <div class="mx-auto flex-(~ center) gap-3 w-40 h-8">
    <Skeleton variant="circle" class="w-10 h-10" />
    <Skeleton variant="text" :lines="2" class="flex-1" />
  </div>
</template>
