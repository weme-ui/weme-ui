<script lang="ts" setup>
import HighlightExampleBasic from '@prose/highlight/examples/basic.vue'
import HighlightExampleWithAll from '@prose/highlight/examples/with-all.vue'
import HighlightExampleWithCase from '@prose/highlight/examples/with-case.vue'
</script>

<template>
  <Example title="Basic">
    <HighlightExampleBasic />
  </Example>

  <Example title="With IgnoreCase">
    <HighlightExampleWithCase />
  </Example>

  <Example title="With MatchAll">
    <HighlightExampleWithAll />
  </Example>
</template>
