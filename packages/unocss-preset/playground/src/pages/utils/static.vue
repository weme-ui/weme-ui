<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const colors = [
  { name: 'Accent', variants: ['static-accent', 'static-accent-soft', 'static-accent-surface', 'static-accent-outline', 'static-accent-inverse'] },
  { name: 'Neutral', variants: ['static-neutral', 'static-neutral-soft', 'static-neutral-surface', 'static-neutral-outline', 'static-neutral-inverse'] },
  { name: 'Info', variants: ['static-info', 'static-info-soft', 'static-info-surface', 'static-info-outline', 'static-info-inverse'] },
  { name: 'Success', variants: ['static-success', 'static-success-soft', 'static-success-surface', 'static-success-outline', 'static-success-inverse'] },
  { name: 'Warning', variants: ['static-warning', 'static-warning-soft', 'static-warning-surface', 'static-warning-outline', 'static-warning-inverse'] },
  { name: 'Error', variants: ['static-error', 'static-error-soft', 'static-error-surface', 'static-error-outline', 'static-error-inverse'] },
] as const

const radixColors = [
  { name: 'Gray', variants: ['static-gray', 'static-gray-soft', 'static-gray-surface', 'static-gray-outline', 'static-gray-inverse'] },
  { name: 'Mauve', variants: ['static-mauve', 'static-mauve-soft', 'static-mauve-surface', 'static-mauve-outline', 'static-mauve-inverse'] },
  { name: 'Slate', variants: ['static-slate', 'static-slate-soft', 'static-slate-surface', 'static-slate-outline', 'static-slate-inverse'] },
  { name: 'Sage', variants: ['static-sage', 'static-sage-soft', 'static-sage-surface', 'static-sage-outline', 'static-sage-inverse'] },
  { name: 'Olive', variants: ['static-olive', 'static-olive-soft', 'static-olive-surface', 'static-olive-outline', 'static-olive-inverse'] },
  { name: 'Sand', variants: ['static-sand', 'static-sand-soft', 'static-sand-surface', 'static-sand-outline', 'static-sand-inverse'] },
  { name: 'Tomato', variants: ['static-tomato', 'static-tomato-soft', 'static-tomato-surface', 'static-tomato-outline', 'static-tomato-inverse'] },
  { name: 'Red', variants: ['static-red', 'static-red-soft', 'static-red-surface', 'static-red-outline', 'static-red-inverse'] },
  { name: 'Ruby', variants: ['static-ruby', 'static-ruby-soft', 'static-ruby-surface', 'static-ruby-outline', 'static-ruby-inverse'] },
  { name: 'Crimson', variants: ['static-crimson', 'static-crimson-soft', 'static-crimson-surface', 'static-crimson-outline', 'static-crimson-inverse'] },
  { name: 'Pink', variants: ['static-pink', 'static-pink-soft', 'static-pink-surface', 'static-pink-outline', 'static-pink-inverse'] },
  { name: 'Plum', variants: ['static-plum', 'static-plum-soft', 'static-plum-surface', 'static-plum-outline', 'static-plum-inverse'] },
  { name: 'Purple', variants: ['static-purple', 'static-purple-soft', 'static-purple-surface', 'static-purple-outline', 'static-purple-inverse'] },
  { name: 'Violet', variants: ['static-violet', 'static-violet-soft', 'static-violet-surface', 'static-violet-outline', 'static-violet-inverse'] },
  { name: 'Iris', variants: ['static-iris', 'static-iris-soft', 'static-iris-surface', 'static-iris-outline', 'static-iris-inverse'] },
  { name: 'Indigo', variants: ['static-indigo', 'static-indigo-soft', 'static-indigo-surface', 'static-indigo-outline', 'static-indigo-inverse'] },
  { name: 'Blue', variants: ['static-blue', 'static-blue-soft', 'static-blue-surface', 'static-blue-outline', 'static-blue-inverse'] },
  { name: 'Cyan', variants: ['static-cyan', 'static-cyan-soft', 'static-cyan-surface', 'static-cyan-outline', 'static-cyan-inverse'] },
  { name: 'Teal', variants: ['static-teal', 'static-teal-soft', 'static-teal-surface', 'static-teal-outline', 'static-teal-inverse'] },
  { name: 'Jade', variants: ['static-jade', 'static-jade-soft', 'static-jade-surface', 'static-jade-outline', 'static-jade-inverse'] },
  { name: 'Green', variants: ['static-green', 'static-green-soft', 'static-green-surface', 'static-green-outline', 'static-green-inverse'] },
  { name: 'Grass', variants: ['static-grass', 'static-grass-soft', 'static-grass-surface', 'static-grass-outline', 'static-grass-inverse'] },
  { name: 'Bronze', variants: ['static-bronze', 'static-bronze-soft', 'static-bronze-surface', 'static-bronze-outline', 'static-bronze-inverse'] },
  { name: 'Gold', variants: ['static-gold', 'static-gold-soft', 'static-gold-surface', 'static-gold-outline', 'static-gold-inverse'] },
  { name: 'Brown', variants: ['static-brown', 'static-brown-soft', 'static-brown-surface', 'static-brown-outline', 'static-brown-inverse'] },
  { name: 'Orange', variants: ['static-orange', 'static-orange-soft', 'static-orange-surface', 'static-orange-outline', 'static-orange-inverse'] },
  { name: 'Amber', variants: ['static-amber', 'static-amber-soft', 'static-amber-surface', 'static-amber-outline', 'static-amber-inverse'] },
  { name: 'Yellow', variants: ['static-yellow', 'static-yellow-soft', 'static-yellow-surface', 'static-yellow-outline', 'static-yellow-inverse'] },
  { name: 'Lime', variants: ['static-lime', 'static-lime-soft', 'static-lime-surface', 'static-lime-outline', 'static-lime-inverse'] },
  { name: 'Mint', variants: ['static-mint', 'static-mint-soft', 'static-mint-surface', 'static-mint-outline', 'static-mint-inverse'] },
  { name: 'Sky', variants: ['static-sky', 'static-sky-soft', 'static-sky-surface', 'static-sky-outline', 'static-sky-inverse'] },
] as const
</script>

<template>
  <Example name="Static" description="Discover themeable static color variants.">
    <Preview v-for="color in colors" :key="color.name" :name="color.name" class="flex gap-8">
      <div
        v-for="variant in color.variants"
        :key="variant"
        :class="variant"
        class="flex-(~ 1 center) h-8 text-(xs center) select-none cursor-default rounded-full font-medium transition-colors"
      >
        {{
          variant.replace(color.variants[0], '').replace('-', '')
            ? variant.replace(color.variants[0], '').replace('-', '')
            : 'solid'
        }}
      </div>
    </Preview>
  </Example>

  <Example name="More Colors" description="Discover all radix static color variants.">
    <Preview v-for="color in radixColors" :key="color.name" :name="color.name" class="flex gap-8">
      <div
        v-for="variant in color.variants"
        :key="variant"
        :class="variant"
        class="flex-(~ 1 center) h-8 text-(xs center) select-none cursor-default rounded-full font-medium transition-colors"
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
