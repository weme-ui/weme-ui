<script lang="ts" setup>
import Avatar from '../../avatar/avatar.vue'
import AvatarGroup from '../avatar-group.vue'

const radiuses = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6">
    <template v-for="radius in radiuses" :key="radius">
      <AvatarGroup :radius="radius">
        <Avatar src="https://github.com/antfu.png" />
        <Avatar src="https://github.com/posva.png" />
        <Avatar src="https://github.com/yyx990803.png" />
      </AvatarGroup>
    </template>
  </div>
</template>
