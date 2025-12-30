<script lang="ts" setup>
import Icon from '../../../../std/components/icon/icon.vue'
import List from '../list.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-7) gap-6">
    <template v-for="color in colors" :key="color">
      <List
        variant="none"
        :color="color"
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
    <template v-for="color in colors" :key="color">
      <List
        :color="color"
        :items="[
          { text: 'Item 1' },
          { text: 'Item 2' },
          { text: 'Item 3' },
        ]"
      />
    </template>
  </div>
</template>
