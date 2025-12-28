<script lang="ts" setup>
import Avatar from '../../avatar/avatar.vue'
import AvatarGroup from '../avatar-group.vue'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6">
    <template v-for="size in sizes" :key="size">
      <AvatarGroup :size="size">
        <Avatar src="https://github.com/antfu.png" />
        <Avatar src="https://github.com/posva.png" />
        <Avatar src="https://github.com/yyx990803.png" />
      </AvatarGroup>
    </template>
  </div>
</template>
