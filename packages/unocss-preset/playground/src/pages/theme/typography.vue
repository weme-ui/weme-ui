<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'
</script>

<template>
  <Example name="Typography" description="Discover all typography.">
    <Preview name="Heading">
      <div>
        <h1 class="text-(xl highlighted) font-extrabold">
          Heading 1 <sup class="text-(xs muted) font-normal">v0.1.4</sup>
        </h1>
        <p class="text-(sm toned)">
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </Preview>

    <Preview name="Content">
      <div>
        <h1 class="text-(xl highlighted) font-extrabold">
          Heading 1 <sup class="text-(xs toned) font-normal">v0.1.4</sup>
        </h1>
        <p class="text-sm">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p class="text-(xs toned)">
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </Preview>
  </Example>
</template>
