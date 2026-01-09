<script lang="ts" setup>
import type { PasswordStrengthMeterUserOptions } from '../password-strength-meter.props'
import PasswordInput from '../../password-input/password-input.vue'
import PasswordStrengthMeter from '../password-strength-meter.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const value = ref('1')

const options = {
  weak: { minDiversity: 2, minLength: 6 },
  medium: { minDiversity: 3, minLength: 8 },
  strong: { minDiversity: 4, minLength: 10 },
} satisfies PasswordStrengthMeterUserOptions
</script>

<template>
  <div class="flex-(~ center wrap) gap-6 mt-4">
    <template v-for="size in sizes" :key="size">
      <PasswordStrengthMeter :value="value" :options="options" :size="size">
        <PasswordInput
          v-model="value"
          name="password"
          prefix-icon="lucide:lock"
          placeholder="Password"
          class="min-w-80"
        />
      </PasswordStrengthMeter>
    </template>
  </div>
</template>
