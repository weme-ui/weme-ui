<script lang="ts" setup>
import Icon from '../../../../std/components/icon/icon.vue'
import List from '../list.vue'
</script>

<template>
  <List
    variant="none"
    :items="[
      { indicator: 'lucide:circle-dashed', text: 'Item 1' },
      { indicator: 'lucide:circle-dashed', text: 'Item 2' },
      { indicator: 'check', text: 'Item 3' },
    ]"
  >
    <template #indicator="{ item }">
      <Icon v-if="item.indicator" :name="item.indicator" />
    </template>
  </List>
</template>
