<script lang="ts" setup>
import MarkExampleBasic from '@prose/mark/examples/basic.vue'
import MarkExampleWithColor from '@prose/mark/examples/with-color.vue'
import MarkExampleWithRadius from '@prose/mark/examples/with-radius.vue'
import MarkExampleWithVariant from '@prose/mark/examples/with-variant.vue'
</script>

<template>
  <Example title="Basic">
    <MarkExampleBasic />
  </Example>

  <Example title="With Variant">
    <MarkExampleWithVariant />
  </Example>

  <Example title="With Color">
    <MarkExampleWithColor />
  </Example>

  <Example title="With Radius">
    <MarkExampleWithRadius />
  </Example>
</template>
