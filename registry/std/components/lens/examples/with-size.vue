<script lang="ts" setup>
import Image from '../../image/image.vue'
import Lens from '../lens.vue'
</script>

<template>
  <div class="flex-(~ center)">
    <Lens :size="200" :zoom="2.5" class="rounded-lg">
      <Image src="https://images.unsplash.com/photo-1713869820987-519844949a8a?q=80&amp;w=3500&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" width="500" height="500" />
    </Lens>
  </div>
</template>
