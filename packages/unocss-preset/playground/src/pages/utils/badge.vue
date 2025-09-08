<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const colors = [
  { name: 'Accent', variants: ['badge-accent', 'badge-accent-soft', 'badge-accent-surface', 'badge-accent-outline', 'badge-accent-inverse'] },
  { name: 'Neutral', variants: ['badge-neutral', 'badge-neutral-soft', 'badge-neutral-surface', 'badge-neutral-outline', 'badge-neutral-inverse'] },
  { name: 'Info', variants: ['badge-info', 'badge-info-soft', 'badge-info-surface', 'badge-info-outline', 'badge-info-inverse'] },
  { name: 'Success', variants: ['badge-success', 'badge-success-soft', 'badge-success-surface', 'badge-success-outline', 'badge-success-inverse'] },
  { name: 'Warning', variants: ['badge-warning', 'badge-warning-soft', 'badge-warning-surface', 'badge-warning-outline', 'badge-warning-inverse'] },
  { name: 'Error', variants: ['badge-error', 'badge-error-soft', 'badge-error-surface', 'badge-error-outline', 'badge-error-inverse'] },
] as const

const radixColors = [
  { name: 'Gray', variants: ['badge-gray', 'badge-gray-soft', 'badge-gray-surface', 'badge-gray-outline', 'badge-gray-inverse'] },
  { name: 'Mauve', variants: ['badge-mauve', 'badge-mauve-soft', 'badge-mauve-surface', 'badge-mauve-outline', 'badge-mauve-inverse'] },
  { name: 'Slate', variants: ['badge-slate', 'badge-slate-soft', 'badge-slate-surface', 'badge-slate-outline', 'badge-slate-inverse'] },
  { name: 'Sage', variants: ['badge-sage', 'badge-sage-soft', 'badge-sage-surface', 'badge-sage-outline', 'badge-sage-inverse'] },
  { name: 'Olive', variants: ['badge-olive', 'badge-olive-soft', 'badge-olive-surface', 'badge-olive-outline', 'badge-olive-inverse'] },
  { name: 'Sand', variants: ['badge-sand', 'badge-sand-soft', 'badge-sand-surface', 'badge-sand-outline', 'badge-sand-inverse'] },
  { name: 'Tomato', variants: ['badge-tomato', 'badge-tomato-soft', 'badge-tomato-surface', 'badge-tomato-outline', 'badge-tomato-inverse'] },
  { name: 'Red', variants: ['badge-red', 'badge-red-soft', 'badge-red-surface', 'badge-red-outline', 'badge-red-inverse'] },
  { name: 'Ruby', variants: ['badge-ruby', 'badge-ruby-soft', 'badge-ruby-surface', 'badge-ruby-outline', 'badge-ruby-inverse'] },
  { name: 'Crimson', variants: ['badge-crimson', 'badge-crimson-soft', 'badge-crimson-surface', 'badge-crimson-outline', 'badge-crimson-inverse'] },
  { name: 'Pink', variants: ['badge-pink', 'badge-pink-soft', 'badge-pink-surface', 'badge-pink-outline', 'badge-pink-inverse'] },
  { name: 'Plum', variants: ['badge-plum', 'badge-plum-soft', 'badge-plum-surface', 'badge-plum-outline', 'badge-plum-inverse'] },
  { name: 'Purple', variants: ['badge-purple', 'badge-purple-soft', 'badge-purple-surface', 'badge-purple-outline', 'badge-purple-inverse'] },
  { name: 'Violet', variants: ['badge-violet', 'badge-violet-soft', 'badge-violet-surface', 'badge-violet-outline', 'badge-violet-inverse'] },
  { name: 'Iris', variants: ['badge-iris', 'badge-iris-soft', 'badge-iris-surface', 'badge-iris-outline', 'badge-iris-inverse'] },
  { name: 'Indigo', variants: ['badge-indigo', 'badge-indigo-soft', 'badge-indigo-surface', 'badge-indigo-outline', 'badge-indigo-inverse'] },
  { name: 'Blue', variants: ['badge-blue', 'badge-blue-soft', 'badge-blue-surface', 'badge-blue-outline', 'badge-blue-inverse'] },
  { name: 'Cyan', variants: ['badge-cyan', 'badge-cyan-soft', 'badge-cyan-surface', 'badge-cyan-outline', 'badge-cyan-inverse'] },
  { name: 'Teal', variants: ['badge-teal', 'badge-teal-soft', 'badge-teal-surface', 'badge-teal-outline', 'badge-teal-inverse'] },
  { name: 'Jade', variants: ['badge-jade', 'badge-jade-soft', 'badge-jade-surface', 'badge-jade-outline', 'badge-jade-inverse'] },
  { name: 'Green', variants: ['badge-green', 'badge-green-soft', 'badge-green-surface', 'badge-green-outline', 'badge-green-inverse'] },
  { name: 'Grass', variants: ['badge-grass', 'badge-grass-soft', 'badge-grass-surface', 'badge-grass-outline', 'badge-grass-inverse'] },
  { name: 'Bronze', variants: ['badge-bronze', 'badge-bronze-soft', 'badge-bronze-surface', 'badge-bronze-outline', 'badge-bronze-inverse'] },
  { name: 'Gold', variants: ['badge-gold', 'badge-gold-soft', 'badge-gold-surface', 'badge-gold-outline', 'badge-gold-inverse'] },
  { name: 'Brown', variants: ['badge-brown', 'badge-brown-soft', 'badge-brown-surface', 'badge-brown-outline', 'badge-brown-inverse'] },
  { name: 'Orange', variants: ['badge-orange', 'badge-orange-soft', 'badge-orange-surface', 'badge-orange-outline', 'badge-orange-inverse'] },
  { name: 'Amber', variants: ['badge-amber', 'badge-amber-soft', 'badge-amber-surface', 'badge-amber-outline', 'badge-amber-inverse'] },
  { name: 'Yellow', variants: ['badge-yellow', 'badge-yellow-soft', 'badge-yellow-surface', 'badge-yellow-outline', 'badge-yellow-inverse'] },
  { name: 'Lime', variants: ['badge-lime', 'badge-lime-soft', 'badge-lime-surface', 'badge-lime-outline', 'badge-lime-inverse'] },
  { name: 'Mint', variants: ['badge-mint', 'badge-mint-soft', 'badge-mint-surface', 'badge-mint-outline', 'badge-mint-inverse'] },
  { name: 'Sky', variants: ['badge-sky', 'badge-sky-soft', 'badge-sky-surface', 'badge-sky-outline', 'badge-sky-inverse'] },
] as const
</script>

<template>
  <Example name="Badge" description="Discover themeable badge color variants.">
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

  <Example name="More Colors" description="Discover all radix badge color variants.">
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
