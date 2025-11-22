<script lang="ts" setup>
defineProps<{
  name: string
  class?: any
  wrapperClass?: any
}>()
</script>

<template>
  <fieldset class="b-(~ default) p-4 rounded-lg" :class="$props.wrapperClass">
    <legend class="b-(~ default) px-2 py-1.5 rounded-lg bg-neutral-1">
      <div class="text-(3 highlighted) font-mono leading-none">
        {{ name }}
      </div>
    </legend>

    <div :class="$props.class">
      <slot />
    </div>
  </fieldset>
</template>
