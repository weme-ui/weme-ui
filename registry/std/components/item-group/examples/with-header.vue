<script lang="ts" setup>
import Button from '../../button/button.vue'
import Icon from '../../icon/icon.vue'
import Item from '../../item/item.vue'
import ItemGroup from '../item-group.vue'
</script>

<template>
  <ItemGroup title="Title" description="Description">
    <Item icon="user" title="Title" description="Description">
      Content
    </Item>
    <Item icon="user" title="Title" description="Description">
      Content
    </Item>
    <Item icon="user" title="Title" description="Description">
      Content
    </Item>

    <template #actions>
      <div class="flex gap-2">
        <Button icon="plus" variant="ghost" size="sm" />
        <Button icon="refresh" variant="ghost" size="sm" />
      </div>
    </template>

    <template #footer>
      <div class="flex-(~ y-center) gap-2">
        <Icon name="lucide:info" class="size-3.5" />
        Footer
      </div>
    </template>
  </ItemGroup>
</template>
