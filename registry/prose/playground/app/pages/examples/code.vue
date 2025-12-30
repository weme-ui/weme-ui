<script lang="ts" setup>
import CodeExampleBasic from '@prose/code/examples/basic.vue'
import CodeExampleWithColor from '@prose/code/examples/with-color.vue'
import CodeExampleWithRadius from '@prose/code/examples/with-radius.vue'
import CodeExampleWithSize from '@prose/code/examples/with-size.vue'
import CodeExampleWithVariant from '@prose/code/examples/with-variant.vue'
</script>

<template>
  <Example title="Basic">
    <CodeExampleBasic />
  </Example>

  <Example title="With Color">
    <CodeExampleWithColor />
  </Example>

  <Example title="With Variant">
    <CodeExampleWithVariant />
  </Example>

  <Example title="With Size">
    <CodeExampleWithSize />
  </Example>

  <Example title="With Radius">
    <CodeExampleWithRadius />
  </Example>
</template>
