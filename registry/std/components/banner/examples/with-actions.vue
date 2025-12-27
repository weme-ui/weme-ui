<script lang="ts" setup>
import Banner from '../banner.vue'
</script>

<template>
  <Banner title="😄 Banner" :actions="[{ icon: 'check', radius: 'full' }, { label: 'action', radius: 'full' }]" />
</template>
