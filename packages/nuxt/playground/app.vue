<script lang="ts" setup>
import { createColorCompoundVariants, createColorVariants } from '#weme/weme.style'

const variants = createColorVariants({
  variant: 'solid',
  states: ['normal', 'active', 'hover'],
})

const withSlot = createColorVariants({
  variant: 'solid',
  states: ['normal', 'active', 'hover'],
  slot: 'base',
})

const withPlaceholder = createColorVariants({
  variant: 'solid',
  defaults: '',
  states: 'normal',
})

const compounds = createColorCompoundVariants({
  variants: ['solid', 'soft'],
  states: 'normal',
})
</script>

<template>
  <Html data-theme="default">
    <main class="container mx-auto py-8 space-y-4">
      <details>
        <summary class="py-4">
          Color variants
        </summary>
        <pre class="p-6 ui-accent rounded-lg"><code>{{ variants }}</code></pre>
      </details>

      <details>
        <summary class="py-4">
          Color variants with slot
        </summary>
        <pre class="p-6 ui-accent rounded-lg"><code>{{ withSlot }}</code></pre>
      </details>

      <details>
        <summary class="py-4">
          Color variants with placeholder
        </summary>
        <pre class="p-6 ui-accent rounded-lg"><code>{{ withPlaceholder }}</code></pre>
      </details>

      <details>
        <summary class="py-4">
          Color compound variants
        </summary>
        <pre class="p-6 ui-accent rounded-lg"><code>{{ compounds }}</code></pre>
      </details>
    </main>
  </Html>
</template>
