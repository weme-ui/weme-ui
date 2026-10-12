<script lang="ts" setup>
import PasswordStrength from '../password-strength.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <PasswordStrength
      disabled
      password="Abcdefgh1!"
      show-message
    />
  </div>
</template>
