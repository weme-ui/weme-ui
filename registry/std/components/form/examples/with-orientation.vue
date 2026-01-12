<script lang="ts" setup>
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'
</script>

<template>
  <div class="flex-(~ col) gap-8">
    <div class="w-120 mx-auto">
      <FormField name="input" label="Label" hint="Optional" help="This is a help text" description="This is a description" required>
        <Input placeholder="Enter your text here" />
      </FormField>
    </div>

    <div class="flex-(~ col) gap-8 mx-auto">
      <FormField name="input" label="Label" description="This is a description" hint="Optional" help="This is a help text" orientation="horizontal" required>
        <Input placeholder="Enter your text here" />
      </FormField>

      <FormField name="input" label="Long Label" description="This is a description" hint="Optional" help="This is a help text" orientation="horizontal" required>
        <Input placeholder="Enter your text here" />
      </FormField>

      <FormField name="input" label="Long Long Label" description="This is a description" hint="Optional" help="This is a help text" orientation="horizontal" required>
        <Input placeholder="Enter your text here" />
      </FormField>
    </div>
  </div>
</template>
