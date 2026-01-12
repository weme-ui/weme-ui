<script lang="ts" setup>
import type { PasswordStrengthMeterUserOptions } from '../../password-strength-meter/password-strength-meter.props'

import ButtonGroup from '../../button-group/button-group.vue'
import Button from '../../button/button.vue'
import Input from '../../input/input.vue'
import NumberInput from '../../number-input/number-input.vue'
import PasswordInput from '../../password-input/password-input.vue'
import PasswordStrengthMeter from '../../password-strength-meter/password-strength-meter.vue'
import PinInput from '../../pin-input/pin-input.vue'
import Separator from '../../separator/separator.vue'
import Switch from '../../switch/switch.vue'
import TagsInput from '../../tags-input/tags-input.vue'
import Textarea from '../../textarea/textarea.vue'
import FormField from '../form-field.vue'

const password = ref('')
const tags = ref(['tag1', 'tag2', 'tag3'])

const options = {
  weak: { minDiversity: 2, minLength: 6 },
  medium: { minDiversity: 3, minLength: 8 },
  strong: { minDiversity: 4, minLength: 10 },
} satisfies PasswordStrengthMeterUserOptions
</script>

<template>
  <div class="flex-(~ col) gap-8 w-120 mx-auto">
    <FormField name="input" label="Input" hint="Optional" help="This is a help text" description="This is a description" required>
      <Input placeholder="Enter your text here" />
    </FormField>

    <FormField name="tags-input" label="Tags Input" hint="Optional" help="This is a help text" description="This is a description" required>
      <TagsInput v-model="tags" placeholder="Enter your text here" />
    </FormField>

    <FormField name="password-input" label="Password Input" hint="Optional" help="This is a help text" description="This is a description" required>
      <PasswordInput placeholder="Enter your text here" />
    </FormField>

    <FormField name="password-strength-meter" label="Password Strength Meter" hint="Optional" help="This is a help text" description="This is a description" required>
      <PasswordStrengthMeter :value="password" :options="options">
        <PasswordInput v-model="password" placeholder="Enter your password here" />
      </PasswordStrengthMeter>
    </FormField>

    <FormField name="number-input" label="Number Input" hint="Optional" help="This is a help text" description="This is a description" required>
      <NumberInput placeholder="Enter your text here" />
    </FormField>

    <FormField name="textarea" label="Textarea" hint="Optional" help="This is a help text" description="This is a description" required>
      <Textarea placeholder="Enter your text here" />
    </FormField>

    <FormField name="pin-input" label="Pin Input" hint="Optional" help="This is a help text" description="This is a description" orientation="horizontal" required>
      <PinInput />
    </FormField>

    <FormField name="switch" label="Switch" hint="Optional" help="This is a help text" description="This is a description" orientation="horizontal" required>
      <Switch />
    </FormField>

    <Separator />

    <ButtonGroup class="justify-end">
      <Button label="Cancel" />
      <Button label="Submit" variant="solid" />
    </ButtonGroup>
  </div>
</template>
