<script lang="ts" setup>
import Link from '../link.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4 items-center">
    <Link to="/" label="With prefix" prefix-icon="ri:arrow-left-line" />
    <Link to="/" label="With suffix" suffix-icon="ri:arrow-right-line" />
  </div>
</template>
