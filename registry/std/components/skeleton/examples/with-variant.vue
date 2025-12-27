<script lang="ts" setup>
import Skeleton from '../skeleton.vue'
</script>

<template>
  <div class="grid-(~ cols-3) gap-3 h-8 mb-2">
    <Skeleton variant="circle" class="w-10 h-10" />
    <Skeleton variant="rect" class="w-10 h-10" />
    <Skeleton variant="text" :lines="2" class="w-20" />
  </div>
</template>
