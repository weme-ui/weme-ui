<script lang="ts" setup>
import PasswordStrength from '../password-strength.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <PasswordStrength
      unstyled
      password="Abcdefgh1!"
      show-message
      class="flex flex-col gap-1 w-full"
      :ui="{
        track: 'flex gap-1 h-1.5 w-full',
        indicator: 'flex-1 rounded-sm bg-muted',
        message: 'text-xs text-subtle',
      }"
    />
  </div>
</template>
