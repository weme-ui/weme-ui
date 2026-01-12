<script lang="ts" setup>
import Input from '../../input/input.vue'
import FormField from '../form-field.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex-(~ col) gap-8 w-120 mx-auto">
    <template v-for="size in sizes" :key="size">
      <FormField
        name="input"
        label="Label"
        hint="Optional"
        help="This is a help text"
        description="This is a description"
        :size="size"
        :ui="{ control: '[&>*]:w-full' }"
        required
      >
        <Input placeholder="Enter your text here" />
      </FormField>
    </template>
  </div>
</template>
