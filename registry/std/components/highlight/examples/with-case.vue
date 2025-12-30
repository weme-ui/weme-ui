<script lang="ts" setup>
import Highlight from '../highlight.vue'
</script>

<template>
  <div>
    <Highlight
      text="The quick brown fox jumps over the lazy fox."
      query="the"
    />
    <p class="mt-3 text-sm">
      Without  <strong>ignore-case</strong>, the query is case sensitive.
    </p>
  </div>

  <div class="mt-6">
    <Highlight
      text="The quick brown fox jumps over the lazy fox."
      query="the"
      ignore-case
    />
    <p class="mt-3 text-sm">
      With <strong>ignore-case</strong>, the query is case insensitive.
    </p>
  </div>
</template>
