<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const colors = [
  { name: 'Primary', variants: ['box-primary', 'box-primary-soft', 'box-primary-surface', 'box-primary-outline'] },
  { name: 'Secondary', variants: ['box-secondary', 'box-secondary-soft', 'box-secondary-surface', 'box-secondary-outline'] },
  { name: 'Neutral', variants: ['box-neutral', 'box-neutral-soft', 'box-neutral-surface', 'box-neutral-outline'] },
  { name: 'Info', variants: ['box-info', 'box-info-soft', 'box-info-surface', 'box-info-outline'] },
  { name: 'Success', variants: ['box-success', 'box-success-soft', 'box-success-surface', 'box-success-outline'] },
  { name: 'Warning', variants: ['box-warning', 'box-warning-soft', 'box-warning-surface', 'box-warning-outline'] },
  { name: 'Danger', variants: ['box-danger', 'box-danger-soft', 'box-danger-surface', 'box-danger-outline'] },
] as const

const wemeColors = [
  { name: 'Gunmetal', variants: ['box-gunmetal', 'box-gunmetal-soft', 'box-gunmetal-surface', 'box-gunmetal-outline'] },
  { name: 'Iron', variants: ['box-iron', 'box-iron-soft', 'box-iron-surface', 'box-iron-outline'] },
  { name: 'Ocean', variants: ['box-ocean', 'box-ocean-soft', 'box-ocean-surface', 'box-ocean-outline'] },
] as const

const radixColors = [
  { name: 'Gray', variants: ['box-gray', 'box-gray-soft', 'box-gray-surface', 'box-gray-outline'] },
  { name: 'Mauve', variants: ['box-mauve', 'box-mauve-soft', 'box-mauve-surface', 'box-mauve-outline'] },
  { name: 'Slate', variants: ['box-slate', 'box-slate-soft', 'box-slate-surface', 'box-slate-outline'] },
  { name: 'Sage', variants: ['box-sage', 'box-sage-soft', 'box-sage-surface', 'box-sage-outline'] },
  { name: 'Olive', variants: ['box-olive', 'box-olive-soft', 'box-olive-surface', 'box-olive-outline'] },
  { name: 'Sand', variants: ['box-sand', 'box-sand-soft', 'box-sand-surface', 'box-sand-outline'] },
  { name: 'Tomato', variants: ['box-tomato', 'box-tomato-soft', 'box-tomato-surface', 'box-tomato-outline'] },
  { name: 'Red', variants: ['box-red', 'box-red-soft', 'box-red-surface', 'box-red-outline'] },
  { name: 'Ruby', variants: ['box-ruby', 'box-ruby-soft', 'box-ruby-surface', 'box-ruby-outline'] },
  { name: 'Crimson', variants: ['box-crimson', 'box-crimson-soft', 'box-crimson-surface', 'box-crimson-outline'] },
  { name: 'Pink', variants: ['box-pink', 'box-pink-soft', 'box-pink-surface', 'box-pink-outline'] },
  { name: 'Plum', variants: ['box-plum', 'box-plum-soft', 'box-plum-surface', 'box-plum-outline'] },
  { name: 'Purple', variants: ['box-purple', 'box-purple-soft', 'box-purple-surface', 'box-purple-outline'] },
  { name: 'Violet', variants: ['box-violet', 'box-violet-soft', 'box-violet-surface', 'box-violet-outline'] },
  { name: 'Iris', variants: ['box-iris', 'box-iris-soft', 'box-iris-surface', 'box-iris-outline'] },
  { name: 'Indigo', variants: ['box-indigo', 'box-indigo-soft', 'box-indigo-surface', 'box-indigo-outline'] },
  { name: 'Blue', variants: ['box-blue', 'box-blue-soft', 'box-blue-surface', 'box-blue-outline'] },
  { name: 'Cyan', variants: ['box-cyan', 'box-cyan-soft', 'box-cyan-surface', 'box-cyan-outline'] },
  { name: 'Teal', variants: ['box-teal', 'box-teal-soft', 'box-teal-surface', 'box-teal-outline'] },
  { name: 'Jade', variants: ['box-jade', 'box-jade-soft', 'box-jade-surface', 'box-jade-outline'] },
  { name: 'Green', variants: ['box-green', 'box-green-soft', 'box-green-surface', 'box-green-outline'] },
  { name: 'Grass', variants: ['box-grass', 'box-grass-soft', 'box-grass-surface', 'box-grass-outline'] },
  { name: 'Bronze', variants: ['box-bronze', 'box-bronze-soft', 'box-bronze-surface', 'box-bronze-outline'] },
  { name: 'Gold', variants: ['box-gold', 'box-gold-soft', 'box-gold-surface', 'box-gold-outline'] },
  { name: 'Brown', variants: ['box-brown', 'box-brown-soft', 'box-brown-surface', 'box-brown-outline'] },
  { name: 'Orange', variants: ['box-orange', 'box-orange-soft', 'box-orange-surface', 'box-orange-outline'] },
  { name: 'Amber', variants: ['box-amber', 'box-amber-soft', 'box-amber-surface', 'box-amber-outline'] },
  { name: 'Yellow', variants: ['box-yellow', 'box-yellow-soft', 'box-yellow-surface', 'box-yellow-outline'] },
  { name: 'Lime', variants: ['box-lime', 'box-lime-soft', 'box-lime-surface', 'box-lime-outline'] },
  { name: 'Mint', variants: ['box-mint', 'box-mint-soft', 'box-mint-surface', 'box-mint-outline'] },
  { name: 'Sky', variants: ['box-sky', 'box-sky-soft', 'box-sky-surface', 'box-sky-outline'] },
] as const
</script>

<template>
  <Example name="Box colors" description="Discover themeable box color variants.">
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

  <Example name="Weme Colors" description="Discover all weme box color variants.">
    <Preview v-for="color in wemeColors" :key="color.name" :name="color.name" class="flex gap-8">
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

  <Example name="More Colors" description="Discover all radix box color variants.">
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
