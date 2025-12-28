<script lang="ts" setup>
import Avatar from '../../avatar/avatar.vue'
import AvatarGroup from '../avatar-group.vue'
</script>

<template>
  <AvatarGroup :max="2">
    <Avatar src="https://github.com/antfu.png" />
    <Avatar src="https://github.com/posva.png" />
    <Avatar src="https://github.com/yyx990803.png" />
  </AvatarGroup>
</template>
