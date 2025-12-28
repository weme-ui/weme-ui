<script lang="ts" setup>
import Avatar from '../../avatar/avatar.vue'
import AvatarGroup from '../avatar-group.vue'

const variants = ['solid', 'soft', 'surface', 'outline', 'inverse'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6">
    <template v-for="variant in variants" :key="variant">
      <AvatarGroup :variant="variant">
        <Avatar src="https://github.com/antfu.png" />
        <Avatar src="https://github.com/posva.png" />
        <Avatar src="https://github.com/yyx990803.png" />
        <Avatar fallback="A" />
      </AvatarGroup>
    </template>
  </div>
</template>
