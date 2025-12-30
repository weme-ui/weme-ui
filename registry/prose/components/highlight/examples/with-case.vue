<script lang="ts" setup>
import Code from '../../code/code.vue'
import Highlight from '../highlight.vue'
</script>

<template>
  <div>
    <Highlight
      text="The quick brown fox jumps over the lazy fox."
      query="the"
    />
    <p class="mt-3 text-sm">
      Without  <Code>ignore-case</Code>, the query is case sensitive.
    </p>
  </div>

  <div class="mt-6">
    <Highlight
      text="The quick brown fox jumps over the lazy fox."
      query="the"
      ignore-case
    />
    <p class="mt-3 text-sm">
      With <Code>ignore-case</Code>, the query is case insensitive.
    </p>
  </div>
</template>
