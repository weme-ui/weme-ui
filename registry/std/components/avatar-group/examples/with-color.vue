<script lang="ts" setup>
import Avatar from '../../avatar/avatar.vue'
import AvatarGroup from '../avatar-group.vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="grid-(~ cols-4) gap-6">
    <template v-for="color in colors" :key="color">
      <AvatarGroup :color="color">
        <Avatar src="https://github.com/antfu.png" />
        <Avatar src="https://github.com/posva.png" />
        <Avatar src="https://github.com/yyx990803.png" />
        <Avatar fallback="A" />
      </AvatarGroup>
    </template>
  </div>
</template>
