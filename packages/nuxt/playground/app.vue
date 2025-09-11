<script lang="ts" setup>
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'

const variants = createColorVariants({
  type: 'btn',
  variant: 'solid',
})

const withSlot = createColorVariants({
  type: 'btn',
  variant: 'solid',
  slot: 'base',
})

const withPlaceholder = createColorVariants({
  type: 'btn',
  variant: 'solid',
  defaults: '',
})

const compounds = createColorCompoundVariants({
  type: 'btn',
  variants: ['solid', 'soft'],
})

const withAlias = createColorCompoundVariants({
  type: 'btn',
  variants: { primary: 'solid', secondary: 'soft' },
})

const withExtends = createColorCompoundVariants({
  type: 'btn',
  variants: { primary: 'solid', secondary: 'soft' },
  extra: { size: 'lg' },
})
</script>

<template>
  <main class="container mx-auto py-8 space-y-4">
    <details>
      <summary class="py-4">
        Color variants
      </summary>
      <pre class="p-6 badge-accent rounded-lg"><code>{{ variants }}</code></pre>
    </details>

    <details>
      <summary class="py-4">
        Color variants with slot
      </summary>
      <pre class="p-6 badge-accent rounded-lg"><code>{{ withSlot }}</code></pre>
    </details>

    <details>
      <summary class="py-4">
        Color variants with placeholder
      </summary>
      <pre class="p-6 badge-accent rounded-lg"><code>{{ withPlaceholder }}</code></pre>
    </details>

    <details>
      <summary class="py-4">
        Color compound variants
      </summary>
      <pre class="p-6 badge-accent rounded-lg"><code>{{ compounds }}</code></pre>
    </details>

    <details>
      <summary class="py-4">
        Color compound variants with alias
      </summary>
      <pre class="p-6 badge-accent rounded-lg"><code>{{ withAlias }}</code></pre>
    </details>

    <details>
      <summary class="py-4">
        Color compound variants with extends
      </summary>
      <pre class="p-6 badge-accent rounded-lg"><code>{{ withExtends }}</code></pre>
    </details>
  </main>
</template>
