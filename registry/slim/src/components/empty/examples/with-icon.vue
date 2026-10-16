<script lang="ts" setup>
import Empty from '../empty.vue'
</script>

<template>
  <div class="flex flex-col gap-8 w-full">
    <Empty icon="ri:search-line">
      <template #title>
        Icon string
      </template>
      <template #description>
        Pass an Iconify name to `icon`.
      </template>
    </Empty>
    <Empty
      :icon="{
        icon: 'ri:folder-open-line',
        color: 'accent',
        variant: 'soft',
      }"
    >
      <template #title>
        IconTile props
      </template>
      <template #description>
        Pass an object to customize `IconTile`.
      </template>
    </Empty>
  </div>
</template>
