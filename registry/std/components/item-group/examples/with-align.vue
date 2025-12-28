<script lang="ts" setup>
import Item from '../../item/item.vue'
import ItemGroup from '../item-group.vue'

const aligns = ['start', 'center', 'end'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-4">
    <template v-for="align in aligns" :key="align">
      <ItemGroup :align="align">
        <Item icon="user" title="Title" description="Description" arrow>
          Content
        </Item>
        <Item icon="user" title="Title" description="Description" arrow>
          Content
        </Item>
        <Item icon="user" title="Title" description="Description" arrow>
          Content
        </Item>
      </ItemGroup>
    </template>
  </div>
</template>
