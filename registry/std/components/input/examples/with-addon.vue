<script lang="ts" setup>
import Input from '../input.vue'

const variants = ['soft', 'outline', 'line', 'none'] as const
</script>

<template>
  <div class="flex-(~ center wrap) gap-6">
    <template v-for="variant in variants" :key="variant">
      <Input
        name="input"
        placeholder="Enter your text here"
        autocomplete="off"
        prepend="https://"
        class="min-w-80"
        :variant="variant"
        :invalid="false"
        clear
      />
    </template>
  </div>

  <div class="flex-(~ center wrap) gap-6 mt-6">
    <template v-for="variant in variants" :key="variant">
      <Input
        name="input"
        placeholder="Enter your text here"
        autocomplete="off"
        append="$"
        class="min-w-80"
        :variant="variant"
        :invalid="false"
        clear
      />
    </template>
  </div>
</template>
