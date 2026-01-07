<script lang="ts" setup>
import Avatar from '../../avatar/avatar.vue'
import Badge from '../../badge/badge.vue'
import Button from '../../button/button.vue'
import Float from '../float.vue'
</script>

<template>
  <div class="flex-(~ center) gap-6 mt-4">
    <div class="relative">
      <Avatar fallback="A" />
      <Float offset="2px">
        <div class="rounded-full size-3 bg-danger" />
      </Float>
    </div>

    <div class="relative">
      <Badge label="Badge" />
      <Float offset="2px">
        <div class="rounded-full size-3 bg-danger" />
      </Float>
    </div>

    <div class="relative">
      <Button label="Button" />
      <Float offset="2px">
        <div class="rounded-full size-3 bg-danger" />
      </Float>
    </div>
  </div>
</template>
