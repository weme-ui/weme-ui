<script lang="ts" setup>
import Pagination from '@registry/std/components/pagination/pagination.vue'

const page = ref(5)
</script>

<template>
  <Pagination v-model:page="page" :total="100" show-total show-more />
</template>
