<script lang="ts" setup>
import ListExampleBasic from '@prose/list/examples/basic.vue'
import ListExampleWithColor from '@prose/list/examples/with-color.vue'
import ListExampleWithIcon from '@prose/list/examples/with-icon.vue'
import ListExampleWithVariant from '@prose/list/examples/with-variant.vue'
</script>

<template>
  <Example title="Basic" class="px-4">
    <ListExampleBasic />
  </Example>

  <Example title="With Variant" class="px-4">
    <ListExampleWithVariant />
  </Example>

  <Example title="With Color" class="px-4">
    <ListExampleWithColor />
  </Example>

  <Example title="With Icon" class="px-4">
    <ListExampleWithIcon />
  </Example>
</template>
