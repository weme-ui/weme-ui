<script lang="ts" setup>
import Item from '../../item/item.vue'
import ItemGroup from '../item-group.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid-(~ cols-3) gap-4">
    <template v-for="size in sizes" :key="size">
      <ItemGroup :size="size">
        <Item icon="user" title="Title" description="Description">
          Content
        </Item>
        <Item icon="user" title="Title" description="Description">
          Content
        </Item>
        <Item icon="user" title="Title" description="Description">
          Content
        </Item>
      </ItemGroup>
    </template>
  </div>
</template>
