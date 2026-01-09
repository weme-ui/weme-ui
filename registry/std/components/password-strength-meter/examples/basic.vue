<script lang="ts" setup>
import type { PasswordStrengthMeterUserOptions } from '../password-strength-meter.props'
import PasswordInput from '../../password-input/password-input.vue'
import PasswordStrengthMeter from '../password-strength-meter.vue'

const value = ref('')

const options = {
  weak: { minDiversity: 2, minLength: 6 },
  medium: { minDiversity: 3, minLength: 8 },
  strong: { minDiversity: 4, minLength: 10 },
} satisfies PasswordStrengthMeterUserOptions
</script>

<template>
  <div class="flex-(~ center) mt-4">
    <PasswordStrengthMeter :value="value" :options="options">
      <PasswordInput
        v-model="value"
        name="password"
        prefix-icon="lucide:lock"
        placeholder="Password"
        class="min-w-80"
      />
    </PasswordStrengthMeter>
  </div>
</template>
