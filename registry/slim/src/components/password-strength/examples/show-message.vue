<script lang="ts" setup>
import PasswordStrength from '../password-strength.vue'
</script>

<template>
  <div class="flex flex-col gap-4 max-w-sm w-full">
    <PasswordStrength password="Abcdefgh1!" show-message />
    <PasswordStrength password="Abcdefgh1!" />
  </div>
</template>
