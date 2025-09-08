<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const colors = [
  { name: 'Accent', variants: ['btn-accent', 'btn-accent-soft', 'btn-accent-surface', 'btn-accent-outline', 'btn-accent-ghost', 'btn-accent-link', 'btn-accent-inverse'] },
  { name: 'Neutral', variants: ['btn-neutral', 'btn-neutral-soft', 'btn-neutral-surface', 'btn-neutral-outline', 'btn-neutral-ghost', 'btn-neutral-link', 'btn-neutral-inverse'] },
  { name: 'Info', variants: ['btn-info', 'btn-info-soft', 'btn-info-surface', 'btn-info-outline', 'btn-info-ghost', 'btn-info-link', 'btn-info-inverse'] },
  { name: 'Success', variants: ['btn-success', 'btn-success-soft', 'btn-success-surface', 'btn-success-outline', 'btn-success-ghost', 'btn-success-link', 'btn-success-inverse'] },
  { name: 'Warning', variants: ['btn-warning', 'btn-warning-soft', 'btn-warning-surface', 'btn-warning-outline', 'btn-warning-ghost', 'btn-warning-link', 'btn-warning-inverse'] },
  { name: 'Error', variants: ['btn-error', 'btn-error-soft', 'btn-error-surface', 'btn-error-outline', 'btn-error-ghost', 'btn-error-link', 'btn-error-inverse'] },
] as const

const radixColors = [
  { name: 'Gray', variants: ['btn-gray', 'btn-gray-soft', 'btn-gray-surface', 'btn-gray-outline', 'btn-gray-ghost', 'btn-gray-link', 'btn-gray-inverse'] },
  { name: 'Mauve', variants: ['btn-mauve', 'btn-mauve-soft', 'btn-mauve-surface', 'btn-mauve-outline', 'btn-mauve-ghost', 'btn-mauve-link', 'btn-mauve-inverse'] },
  { name: 'Slate', variants: ['btn-slate', 'btn-slate-soft', 'btn-slate-surface', 'btn-slate-outline', 'btn-slate-ghost', 'btn-slate-link', 'btn-slate-inverse'] },
  { name: 'Sage', variants: ['btn-sage', 'btn-sage-soft', 'btn-sage-surface', 'btn-sage-outline', 'btn-sage-ghost', 'btn-sage-link', 'btn-sage-inverse'] },
  { name: 'Olive', variants: ['btn-olive', 'btn-olive-soft', 'btn-olive-surface', 'btn-olive-outline', 'btn-olive-ghost', 'btn-olive-link', 'btn-olive-inverse'] },
  { name: 'Sand', variants: ['btn-sand', 'btn-sand-soft', 'btn-sand-surface', 'btn-sand-outline', 'btn-sand-ghost', 'btn-sand-link', 'btn-sand-inverse'] },
  { name: 'Tomato', variants: ['btn-tomato', 'btn-tomato-soft', 'btn-tomato-surface', 'btn-tomato-outline', 'btn-tomato-ghost', 'btn-tomato-link', 'btn-tomato-inverse'] },
  { name: 'Red', variants: ['btn-red', 'btn-red-soft', 'btn-red-surface', 'btn-red-outline', 'btn-red-ghost', 'btn-red-link', 'btn-red-inverse'] },
  { name: 'Ruby', variants: ['btn-ruby', 'btn-ruby-soft', 'btn-ruby-surface', 'btn-ruby-outline', 'btn-ruby-ghost', 'btn-ruby-link', 'btn-ruby-inverse'] },
  { name: 'Crimson', variants: ['btn-crimson', 'btn-crimson-soft', 'btn-crimson-surface', 'btn-crimson-outline', 'btn-crimson-ghost', 'btn-crimson-link', 'btn-crimson-inverse'] },
  { name: 'Pink', variants: ['btn-pink', 'btn-pink-soft', 'btn-pink-surface', 'btn-pink-outline', 'btn-pink-ghost', 'btn-pink-link', 'btn-pink-inverse'] },
  { name: 'Plum', variants: ['btn-plum', 'btn-plum-soft', 'btn-plum-surface', 'btn-plum-outline', 'btn-plum-ghost', 'btn-plum-link', 'btn-plum-inverse'] },
  { name: 'Purple', variants: ['btn-purple', 'btn-purple-soft', 'btn-purple-surface', 'btn-purple-outline', 'btn-purple-ghost', 'btn-purple-link', 'btn-purple-inverse'] },
  { name: 'Violet', variants: ['btn-violet', 'btn-violet-soft', 'btn-violet-surface', 'btn-violet-outline', 'btn-violet-ghost', 'btn-violet-link', 'btn-violet-inverse'] },
  { name: 'Iris', variants: ['btn-iris', 'btn-iris-soft', 'btn-iris-surface', 'btn-iris-outline', 'btn-iris-ghost', 'btn-iris-link', 'btn-iris-inverse'] },
  { name: 'Indigo', variants: ['btn-indigo', 'btn-indigo-soft', 'btn-indigo-surface', 'btn-indigo-outline', 'btn-indigo-ghost', 'btn-indigo-link', 'btn-indigo-inverse'] },
  { name: 'Blue', variants: ['btn-blue', 'btn-blue-soft', 'btn-blue-surface', 'btn-blue-outline', 'btn-blue-ghost', 'btn-blue-link', 'btn-blue-inverse'] },
  { name: 'Cyan', variants: ['btn-cyan', 'btn-cyan-soft', 'btn-cyan-surface', 'btn-cyan-outline', 'btn-cyan-ghost', 'btn-cyan-link', 'btn-cyan-inverse'] },
  { name: 'Teal', variants: ['btn-teal', 'btn-teal-soft', 'btn-teal-surface', 'btn-teal-outline', 'btn-teal-ghost', 'btn-teal-link', 'btn-teal-inverse'] },
  { name: 'Jade', variants: ['btn-jade', 'btn-jade-soft', 'btn-jade-surface', 'btn-jade-outline', 'btn-jade-ghost', 'btn-jade-link', 'btn-jade-inverse'] },
  { name: 'Green', variants: ['btn-green', 'btn-green-soft', 'btn-green-surface', 'btn-green-outline', 'btn-green-ghost', 'btn-green-link', 'btn-green-inverse'] },
  { name: 'Grass', variants: ['btn-grass', 'btn-grass-soft', 'btn-grass-surface', 'btn-grass-outline', 'btn-grass-ghost', 'btn-grass-link', 'btn-grass-inverse'] },
  { name: 'Bronze', variants: ['btn-bronze', 'btn-bronze-soft', 'btn-bronze-surface', 'btn-bronze-outline', 'btn-bronze-ghost', 'btn-bronze-link', 'btn-bronze-inverse'] },
  { name: 'Gold', variants: ['btn-gold', 'btn-gold-soft', 'btn-gold-surface', 'btn-gold-outline', 'btn-gold-ghost', 'btn-gold-link', 'btn-gold-inverse'] },
  { name: 'Brown', variants: ['btn-brown', 'btn-brown-soft', 'btn-brown-surface', 'btn-brown-outline', 'btn-brown-ghost', 'btn-brown-link', 'btn-brown-inverse'] },
  { name: 'Orange', variants: ['btn-orange', 'btn-orange-soft', 'btn-orange-surface', 'btn-orange-outline', 'btn-orange-ghost', 'btn-orange-link', 'btn-orange-inverse'] },
  { name: 'Amber', variants: ['btn-amber', 'btn-amber-soft', 'btn-amber-surface', 'btn-amber-outline', 'btn-amber-ghost', 'btn-amber-link', 'btn-amber-inverse'] },
  { name: 'Yellow', variants: ['btn-yellow', 'btn-yellow-soft', 'btn-yellow-surface', 'btn-yellow-outline', 'btn-yellow-ghost', 'btn-yellow-link', 'btn-yellow-inverse'] },
  { name: 'Lime', variants: ['btn-lime', 'btn-lime-soft', 'btn-lime-surface', 'btn-lime-outline', 'btn-lime-ghost', 'btn-lime-link', 'btn-lime-inverse'] },
  { name: 'Mint', variants: ['btn-mint', 'btn-mint-soft', 'btn-mint-surface', 'btn-mint-outline', 'btn-mint-ghost', 'btn-mint-link', 'btn-mint-inverse'] },
  { name: 'Sky', variants: ['btn-sky', 'btn-sky-soft', 'btn-sky-surface', 'btn-sky-outline', 'btn-sky-ghost', 'btn-sky-link', 'btn-sky-inverse'] },
] as const
</script>

<template>
  <Example name="Button" description="Discover themeable button color variants.">
    <Preview v-for="color in colors" :key="color.name" :name="color.name" class="flex gap-8">
      <div
        v-for="variant in color.variants"
        :key="variant"
        :class="variant"
        class="flex-(~ 1 center) h-8 text-(xs center) select-none cursor-default rounded-sm font-medium transition-colors"
      >
        {{
          variant.replace(color.variants[0], '').replace('-', '')
            ? variant.replace(color.variants[0], '').replace('-', '')
            : 'solid'
        }}
      </div>
    </Preview>
  </Example>

  <Example name="More Colors" description="Discover all radix button color variants.">
    <Preview v-for="color in radixColors" :key="color.name" :name="color.name" class="flex gap-8">
      <div
        v-for="variant in color.variants"
        :key="variant"
        :class="variant"
        class="flex-(~ 1 center) h-8 text-(xs center) select-none cursor-default rounded-sm font-medium transition-colors"
      >
        {{
          variant.replace(color.variants[0], '').replace('-', '')
            ? variant.replace(color.variants[0], '').replace('-', '')
            : 'solid'
        }}
      </div>
    </Preview>
  </Example>
</template>
