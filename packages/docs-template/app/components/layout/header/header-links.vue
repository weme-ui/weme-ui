<script lang="ts" setup>
defineProps<{
  links?: TextLink[]
}>()
</script>

<template>
  <ul class="flex gap-6 justify-end">
    <li v-for="link in links" :key="link.to">
      <NuxtLink :to="link.to" :target="link.target" :rel="link.rel">
        {{ link.label }}
      </NuxtLink>
    </li>
  </ul>
</template>
