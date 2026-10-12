<script lang="ts" setup>
import PasswordStrength from '../password-strength.vue'

const sample = 'Abcdefgh1!'
</script>

<template>
  <div class="flex flex-col gap-4 max-w-sm w-full">
    <PasswordStrength :password="sample" size="sm" show-message />
    <PasswordStrength :password="sample" size="md" show-message />
    <PasswordStrength :password="sample" size="lg" show-message />
  </div>
</template>
