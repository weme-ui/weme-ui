<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'] as const
const fonts = ['font-sans', 'font-serif', 'font-mono'] as const
const lineHeights = ['leading-none', 'leading-tight', 'leading-snug', 'leading-normal', 'leading-relaxed', 'leading-loose'] as const
</script>

<template>
  <Example name="Font Size" description="Discover all font-size.">
    <Preview v-for="size in sizes" :key="size" :name="size">
      <p :class="size">
        The quick brown fox jumps over the lazy dog.
      </p>
    </Preview>
  </Example>

  <Example name="Font Family" description="Discover all font-family.">
    <Preview v-for="font in fonts" :key="font" :name="font">
      <p :class="font">
        The quick brown fox jumps over the lazy dog.
      </p>
    </Preview>
  </Example>

  <Example name="Line Height" description="Discover all line-height.">
    <Preview v-for="lineHeight in lineHeights" :key="lineHeight" :name="lineHeight">
      <p :class="lineHeight">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet consequatur quam harum blanditiis ipsam dicta fuga alias saepe inventore. Tenetur nostrum excepturi minus odio iusto rerum mollitia, ipsum inventore eum?
      </p>
    </Preview>
  </Example>
</template>
