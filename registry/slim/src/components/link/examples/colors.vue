<script lang="ts" setup>
import Link from '../link.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4 items-center">
    <Link to="/" label="Accent" color="accent" />
    <Link to="/" label="Neutral" color="neutral" />
    <Link to="/" label="Info" color="info" />
    <Link to="/" label="Success" color="success" />
    <Link to="/" label="Warning" color="warning" />
    <Link to="/" label="Error" color="error" />
  </div>
</template>
