<script lang="ts" setup>
import Item from '../../item/item.vue'
import ItemGroup from '../item-group.vue'

const variants = ['card', 'list'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-4">
    <template v-for="variant in variants" :key="variant">
      <ItemGroup :variant="variant">
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
