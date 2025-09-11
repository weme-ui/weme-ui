<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const colors = [
  { name: 'Accent', variants: ['click-accent', 'click-accent-soft', 'click-accent-surface', 'click-accent-outline', 'click-accent-ghost', 'click-accent-link', 'click-accent-inverse'] },
  { name: 'Neutral', variants: ['click-neutral', 'click-neutral-soft', 'click-neutral-surface', 'click-neutral-outline', 'click-neutral-ghost', 'click-neutral-link', 'click-neutral-inverse'] },
  { name: 'Info', variants: ['click-info', 'click-info-soft', 'click-info-surface', 'click-info-outline', 'click-info-ghost', 'click-info-link', 'click-info-inverse'] },
  { name: 'Success', variants: ['click-success', 'click-success-soft', 'click-success-surface', 'click-success-outline', 'click-success-ghost', 'click-success-link', 'click-success-inverse'] },
  { name: 'Warning', variants: ['click-warning', 'click-warning-soft', 'click-warning-surface', 'click-warning-outline', 'click-warning-ghost', 'click-warning-link', 'click-warning-inverse'] },
  { name: 'Error', variants: ['click-error', 'click-error-soft', 'click-error-surface', 'click-error-outline', 'click-error-ghost', 'click-error-link', 'click-error-inverse'] },
] as const

const radixColors = [
  { name: 'Gray', variants: ['click-gray', 'click-gray-soft', 'click-gray-surface', 'click-gray-outline', 'click-gray-ghost', 'click-gray-link', 'click-gray-inverse'] },
  { name: 'Mauve', variants: ['click-mauve', 'click-mauve-soft', 'click-mauve-surface', 'click-mauve-outline', 'click-mauve-ghost', 'click-mauve-link', 'click-mauve-inverse'] },
  { name: 'Slate', variants: ['click-slate', 'click-slate-soft', 'click-slate-surface', 'click-slate-outline', 'click-slate-ghost', 'click-slate-link', 'click-slate-inverse'] },
  { name: 'Sage', variants: ['click-sage', 'click-sage-soft', 'click-sage-surface', 'click-sage-outline', 'click-sage-ghost', 'click-sage-link', 'click-sage-inverse'] },
  { name: 'Olive', variants: ['click-olive', 'click-olive-soft', 'click-olive-surface', 'click-olive-outline', 'click-olive-ghost', 'click-olive-link', 'click-olive-inverse'] },
  { name: 'Sand', variants: ['click-sand', 'click-sand-soft', 'click-sand-surface', 'click-sand-outline', 'click-sand-ghost', 'click-sand-link', 'click-sand-inverse'] },
  { name: 'Tomato', variants: ['click-tomato', 'click-tomato-soft', 'click-tomato-surface', 'click-tomato-outline', 'click-tomato-ghost', 'click-tomato-link', 'click-tomato-inverse'] },
  { name: 'Red', variants: ['click-red', 'click-red-soft', 'click-red-surface', 'click-red-outline', 'click-red-ghost', 'click-red-link', 'click-red-inverse'] },
  { name: 'Ruby', variants: ['click-ruby', 'click-ruby-soft', 'click-ruby-surface', 'click-ruby-outline', 'click-ruby-ghost', 'click-ruby-link', 'click-ruby-inverse'] },
  { name: 'Crimson', variants: ['click-crimson', 'click-crimson-soft', 'click-crimson-surface', 'click-crimson-outline', 'click-crimson-ghost', 'click-crimson-link', 'click-crimson-inverse'] },
  { name: 'Pink', variants: ['click-pink', 'click-pink-soft', 'click-pink-surface', 'click-pink-outline', 'click-pink-ghost', 'click-pink-link', 'click-pink-inverse'] },
  { name: 'Plum', variants: ['click-plum', 'click-plum-soft', 'click-plum-surface', 'click-plum-outline', 'click-plum-ghost', 'click-plum-link', 'click-plum-inverse'] },
  { name: 'Purple', variants: ['click-purple', 'click-purple-soft', 'click-purple-surface', 'click-purple-outline', 'click-purple-ghost', 'click-purple-link', 'click-purple-inverse'] },
  { name: 'Violet', variants: ['click-violet', 'click-violet-soft', 'click-violet-surface', 'click-violet-outline', 'click-violet-ghost', 'click-violet-link', 'click-violet-inverse'] },
  { name: 'Iris', variants: ['click-iris', 'click-iris-soft', 'click-iris-surface', 'click-iris-outline', 'click-iris-ghost', 'click-iris-link', 'click-iris-inverse'] },
  { name: 'Indigo', variants: ['click-indigo', 'click-indigo-soft', 'click-indigo-surface', 'click-indigo-outline', 'click-indigo-ghost', 'click-indigo-link', 'click-indigo-inverse'] },
  { name: 'Blue', variants: ['click-blue', 'click-blue-soft', 'click-blue-surface', 'click-blue-outline', 'click-blue-ghost', 'click-blue-link', 'click-blue-inverse'] },
  { name: 'Cyan', variants: ['click-cyan', 'click-cyan-soft', 'click-cyan-surface', 'click-cyan-outline', 'click-cyan-ghost', 'click-cyan-link', 'click-cyan-inverse'] },
  { name: 'Teal', variants: ['click-teal', 'click-teal-soft', 'click-teal-surface', 'click-teal-outline', 'click-teal-ghost', 'click-teal-link', 'click-teal-inverse'] },
  { name: 'Jade', variants: ['click-jade', 'click-jade-soft', 'click-jade-surface', 'click-jade-outline', 'click-jade-ghost', 'click-jade-link', 'click-jade-inverse'] },
  { name: 'Green', variants: ['click-green', 'click-green-soft', 'click-green-surface', 'click-green-outline', 'click-green-ghost', 'click-green-link', 'click-green-inverse'] },
  { name: 'Grass', variants: ['click-grass', 'click-grass-soft', 'click-grass-surface', 'click-grass-outline', 'click-grass-ghost', 'click-grass-link', 'click-grass-inverse'] },
  { name: 'Bronze', variants: ['click-bronze', 'click-bronze-soft', 'click-bronze-surface', 'click-bronze-outline', 'click-bronze-ghost', 'click-bronze-link', 'click-bronze-inverse'] },
  { name: 'Gold', variants: ['click-gold', 'click-gold-soft', 'click-gold-surface', 'click-gold-outline', 'click-gold-ghost', 'click-gold-link', 'click-gold-inverse'] },
  { name: 'Brown', variants: ['click-brown', 'click-brown-soft', 'click-brown-surface', 'click-brown-outline', 'click-brown-ghost', 'click-brown-link', 'click-brown-inverse'] },
  { name: 'Orange', variants: ['click-orange', 'click-orange-soft', 'click-orange-surface', 'click-orange-outline', 'click-orange-ghost', 'click-orange-link', 'click-orange-inverse'] },
  { name: 'Amber', variants: ['click-amber', 'click-amber-soft', 'click-amber-surface', 'click-amber-outline', 'click-amber-ghost', 'click-amber-link', 'click-amber-inverse'] },
  { name: 'Yellow', variants: ['click-yellow', 'click-yellow-soft', 'click-yellow-surface', 'click-yellow-outline', 'click-yellow-ghost', 'click-yellow-link', 'click-yellow-inverse'] },
  { name: 'Lime', variants: ['click-lime', 'click-lime-soft', 'click-lime-surface', 'click-lime-outline', 'click-lime-ghost', 'click-lime-link', 'click-lime-inverse'] },
  { name: 'Mint', variants: ['click-mint', 'click-mint-soft', 'click-mint-surface', 'click-mint-outline', 'click-mint-ghost', 'click-mint-link', 'click-mint-inverse'] },
  { name: 'Sky', variants: ['click-sky', 'click-sky-soft', 'click-sky-surface', 'click-sky-outline', 'click-sky-ghost', 'click-sky-link', 'click-sky-inverse'] },
] as const
</script>

<template>
  <Example name="Clickable" description="Discover themeable color variants.">
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
