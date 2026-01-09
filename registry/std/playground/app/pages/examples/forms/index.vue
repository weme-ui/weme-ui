<script lang="ts" setup>
import InputExample from './input.vue'
import NumberInputExample from './number-input.vue'
import PasswordInputExample from './password-input.vue'
import PasswordStrengthMeterExample from './password-strength-meter.vue'
import PinInputExample from './pin-input.vue'
import SwitchExample from './switch.vue'
import TagsInputExample from './tags-input.vue'
import TextareaExample from './textarea.vue'
</script>

<template>
  <Example title="标签输入框" description="Tags Input">
    <TagsInputExample />
  </Example>

  <Example title="输入框" description="Input">
    <InputExample />
  </Example>

  <Example title="密码输入框" description="Password Input">
    <PasswordInputExample />
  </Example>

  <Example title="密码强度" description="Password Strength Meter">
    <PasswordStrengthMeterExample />
  </Example>

  <Example title="数字输入框" description="Number Input">
    <NumberInputExample />
  </Example>

  <Example title="PIN 输入框" description="Pin Input">
    <PinInputExample />
  </Example>

  <Example title="多行输入框" description="Textarea">
    <TextareaExample />
  </Example>

  <Example title="开关" description="Switch">
    <SwitchExample />
  </Example>
</template>
