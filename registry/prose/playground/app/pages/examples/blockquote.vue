<script lang="ts" setup>
import BlockquoteExampleBasic from '@prose/blockquote/examples/basic.vue'
import BlockquoteExampleWithAlign from '@prose/blockquote/examples/with-align.vue'
import BlockquoteExampleWithColor from '@prose/blockquote/examples/with-color.vue'
import BlockquoteExampleWithSlot from '@prose/blockquote/examples/with-slot.vue'
import BlockquoteExampleWithVariant from '@prose/blockquote/examples/with-variant.vue'
</script>

<template>
  <Example title="Basic">
    <BlockquoteExampleBasic />
  </Example>

  <Example title="With Color">
    <BlockquoteExampleWithColor />
  </Example>

  <Example title="With Variant">
    <BlockquoteExampleWithVariant />
  </Example>

  <Example title="With Align">
    <BlockquoteExampleWithAlign />
  </Example>

  <Example title="With Slot">
    <BlockquoteExampleWithSlot />
  </Example>
</template>
