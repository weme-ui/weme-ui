<script lang="ts" setup>
import Breadcrumb from '../breadcrumb.vue'
</script>

<template>
  <Breadcrumb
    separator-icon="lucide:chevron-right"
    :items="[
      { label: 'Home', to: '/' },
      { label: 'Examples', to: '/examples' },
      { label: 'Disclosure', to: '/examples/disclosure' },
    ]"
  />
</template>
