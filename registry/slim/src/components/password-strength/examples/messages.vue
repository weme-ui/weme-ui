<script lang="ts" setup>
import PasswordStrength from '../password-strength.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <PasswordStrength
      password="Abcdefgh1!@"
      show-message
      :messages="{
        tooWeak: '太弱',
        weak: '较弱',
        medium: '一般',
        strong: '很强',
      }"
    />
  </div>
</template>
