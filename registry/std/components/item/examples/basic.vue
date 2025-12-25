<script lang="ts" setup>
import IconBox from '../../icon-box/icon-box.vue'
import Item from '../item.vue'
</script>

<template>
  <div class="h-full py-4 gap-6">
    <Item icon="user" title="Title" description="Description" variant="outline" arrow clickable>
      <template #indicator>
        <IconBox name="user" variant="outline" radius="full" />
      </template>
      Content
    </Item>
  </div>
</template>
