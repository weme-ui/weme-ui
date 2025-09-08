<script lang="ts" setup>
defineProps<{
  name: string
  class?: any
}>()
</script>

<template>
  <fieldset class="b-(~ default) p-4 rounded-lg">
    <legend class="b-(~ default) px-2 py-1.5 rounded-lg">
      <div class="text-(3 highlighted) font-mono leading-none">
        {{ name }}
      </div>
    </legend>

    <div :class="$props.class">
      <slot />
    </div>
  </fieldset>
</template>
