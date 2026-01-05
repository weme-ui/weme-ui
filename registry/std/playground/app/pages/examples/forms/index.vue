<script lang="ts" setup>
import InputExample from './input.vue'
import NumberInputExample from './number-input.vue'
import PasswordInputExample from './password-input.vue'
</script>

<template>
  <Example title="输入框" description="Input">
    <InputExample />
  </Example>

  <Example title="密码输入框" description="Password Input">
    <PasswordInputExample />
  </Example>

  <Example title="数字输入框" description="Number Input">
    <NumberInputExample />
  </Example>
</template>
