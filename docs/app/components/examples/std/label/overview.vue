<script lang="ts" setup>
import Input from '@registry/std/components/input/input.vue'
import Label from '@registry/std/components/label/label.vue'
</script>

<template>
  <div class="flex-(~ y-center) gap-2">
    <Label for="input" hint="*" :ui="{ hint: 'text-error' }">
      Label
    </Label>
    <Input id="input" name="input" />
  </div>
</template>
