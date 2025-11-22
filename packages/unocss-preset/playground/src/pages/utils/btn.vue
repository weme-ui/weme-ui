<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const colors = [
  { name: 'Primary', variants: ['btn-primary', 'btn-primary-soft', 'btn-primary-surface', 'btn-primary-outline', 'btn-primary-ghost', 'btn-primary-plain'] },
  { name: 'Secondary', variants: ['btn-secondary', 'btn-secondary-soft', 'btn-secondary-surface', 'btn-secondary-outline', 'btn-secondary-ghost', 'btn-secondary-plain'] },
  { name: 'Neutral', variants: ['btn-neutral', 'btn-neutral-soft', 'btn-neutral-surface', 'btn-neutral-outline', 'btn-neutral-ghost', 'btn-neutral-plain'] },
  { name: 'Info', variants: ['btn-info', 'btn-info-soft', 'btn-info-surface', 'btn-info-outline', 'btn-info-ghost', 'btn-info-plain'] },
  { name: 'Success', variants: ['btn-success', 'btn-success-soft', 'btn-success-surface', 'btn-success-outline', 'btn-success-ghost', 'btn-success-plain'] },
  { name: 'Warning', variants: ['btn-warning', 'btn-warning-soft', 'btn-warning-surface', 'btn-warning-outline', 'btn-warning-ghost', 'btn-warning-plain'] },
  { name: 'Danger', variants: ['btn-danger', 'btn-danger-soft', 'btn-danger-surface', 'btn-danger-outline', 'btn-danger-ghost', 'btn-danger-plain'] },
] as const

const inverseColors = [
  { name: 'Inverse', variants: ['btn-primary-inverse', 'btn-secondary-inverse', 'btn-neutral-inverse', 'btn-info-inverse', 'btn-success-inverse', 'btn-warning-inverse', 'btn-danger-inverse'] },
]

const wemeColors = [
  { name: 'Gunmetal', variants: ['btn-gunmetal', 'btn-gunmetal-soft', 'btn-gunmetal-surface', 'btn-gunmetal-outline', 'btn-gunmetal-ghost', 'btn-gunmetal-plain', 'btn-gunmetal-inverse'] },
  { name: 'Iron', variants: ['btn-iron', 'btn-iron-soft', 'btn-iron-surface', 'btn-iron-outline', 'btn-iron-ghost', 'btn-iron-plain', 'btn-iron-inverse'] },
  { name: 'Ocean', variants: ['btn-ocean', 'btn-ocean-soft', 'btn-ocean-surface', 'btn-ocean-outline', 'btn-ocean-ghost', 'btn-ocean-plain', 'btn-ocean-inverse'] },
] as const

const radixColors = [
  { name: 'Gray', variants: ['btn-gray', 'btn-gray-soft', 'btn-gray-surface', 'btn-gray-outline', 'btn-gray-ghost', 'btn-gray-plain', 'btn-gray-inverse'] },
  { name: 'Mauve', variants: ['btn-mauve', 'btn-mauve-soft', 'btn-mauve-surface', 'btn-mauve-outline', 'btn-mauve-ghost', 'btn-mauve-plain', 'btn-mauve-inverse'] },
  { name: 'Slate', variants: ['btn-slate', 'btn-slate-soft', 'btn-slate-surface', 'btn-slate-outline', 'btn-slate-ghost', 'btn-slate-plain', 'btn-slate-inverse'] },
  { name: 'Sage', variants: ['btn-sage', 'btn-sage-soft', 'btn-sage-surface', 'btn-sage-outline', 'btn-sage-ghost', 'btn-sage-plain', 'btn-sage-inverse'] },
  { name: 'Olive', variants: ['btn-olive', 'btn-olive-soft', 'btn-olive-surface', 'btn-olive-outline', 'btn-olive-ghost', 'btn-olive-plain', 'btn-olive-inverse'] },
  { name: 'Sand', variants: ['btn-sand', 'btn-sand-soft', 'btn-sand-surface', 'btn-sand-outline', 'btn-sand-ghost', 'btn-sand-plain', 'btn-sand-inverse'] },
  { name: 'Tomato', variants: ['btn-tomato', 'btn-tomato-soft', 'btn-tomato-surface', 'btn-tomato-outline', 'btn-tomato-ghost', 'btn-tomato-plain', 'btn-tomato-inverse'] },
  { name: 'Red', variants: ['btn-red', 'btn-red-soft', 'btn-red-surface', 'btn-red-outline', 'btn-red-ghost', 'btn-red-plain', 'btn-red-inverse'] },
  { name: 'Ruby', variants: ['btn-ruby', 'btn-ruby-soft', 'btn-ruby-surface', 'btn-ruby-outline', 'btn-ruby-ghost', 'btn-ruby-plain', 'btn-ruby-inverse'] },
  { name: 'Crimson', variants: ['btn-crimson', 'btn-crimson-soft', 'btn-crimson-surface', 'btn-crimson-outline', 'btn-crimson-ghost', 'btn-crimson-plain', 'btn-crimson-inverse'] },
  { name: 'Pink', variants: ['btn-pink', 'btn-pink-soft', 'btn-pink-surface', 'btn-pink-outline', 'btn-pink-ghost', 'btn-pink-plain', 'btn-pink-inverse'] },
  { name: 'Plum', variants: ['btn-plum', 'btn-plum-soft', 'btn-plum-surface', 'btn-plum-outline', 'btn-plum-ghost', 'btn-plum-plain', 'btn-plum-inverse'] },
  { name: 'Purple', variants: ['btn-purple', 'btn-purple-soft', 'btn-purple-surface', 'btn-purple-outline', 'btn-purple-ghost', 'btn-purple-plain', 'btn-purple-inverse'] },
  { name: 'Violet', variants: ['btn-violet', 'btn-violet-soft', 'btn-violet-surface', 'btn-violet-outline', 'btn-violet-ghost', 'btn-violet-plain', 'btn-violet-inverse'] },
  { name: 'Iris', variants: ['btn-iris', 'btn-iris-soft', 'btn-iris-surface', 'btn-iris-outline', 'btn-iris-ghost', 'btn-iris-plain', 'btn-iris-inverse'] },
  { name: 'Indigo', variants: ['btn-indigo', 'btn-indigo-soft', 'btn-indigo-surface', 'btn-indigo-outline', 'btn-indigo-ghost', 'btn-indigo-plain', 'btn-indigo-inverse'] },
  { name: 'Blue', variants: ['btn-blue', 'btn-blue-soft', 'btn-blue-surface', 'btn-blue-outline', 'btn-blue-ghost', 'btn-blue-plain', 'btn-blue-inverse'] },
  { name: 'Cyan', variants: ['btn-cyan', 'btn-cyan-soft', 'btn-cyan-surface', 'btn-cyan-outline', 'btn-cyan-ghost', 'btn-cyan-plain', 'btn-cyan-inverse'] },
  { name: 'Teal', variants: ['btn-teal', 'btn-teal-soft', 'btn-teal-surface', 'btn-teal-outline', 'btn-teal-ghost', 'btn-teal-plain', 'btn-teal-inverse'] },
  { name: 'Jade', variants: ['btn-jade', 'btn-jade-soft', 'btn-jade-surface', 'btn-jade-outline', 'btn-jade-ghost', 'btn-jade-plain', 'btn-jade-inverse'] },
  { name: 'Green', variants: ['btn-green', 'btn-green-soft', 'btn-green-surface', 'btn-green-outline', 'btn-green-ghost', 'btn-green-plain', 'btn-green-inverse'] },
  { name: 'Grass', variants: ['btn-grass', 'btn-grass-soft', 'btn-grass-surface', 'btn-grass-outline', 'btn-grass-ghost', 'btn-grass-plain', 'btn-grass-inverse'] },
  { name: 'Bronze', variants: ['btn-bronze', 'btn-bronze-soft', 'btn-bronze-surface', 'btn-bronze-outline', 'btn-bronze-ghost', 'btn-bronze-plain', 'btn-bronze-inverse'] },
  { name: 'Gold', variants: ['btn-gold', 'btn-gold-soft', 'btn-gold-surface', 'btn-gold-outline', 'btn-gold-ghost', 'btn-gold-plain', 'btn-gold-inverse'] },
  { name: 'Brown', variants: ['btn-brown', 'btn-brown-soft', 'btn-brown-surface', 'btn-brown-outline', 'btn-brown-ghost', 'btn-brown-plain', 'btn-brown-inverse'] },
  { name: 'Orange', variants: ['btn-orange', 'btn-orange-soft', 'btn-orange-surface', 'btn-orange-outline', 'btn-orange-ghost', 'btn-orange-plain', 'btn-orange-inverse'] },
  { name: 'Amber', variants: ['btn-amber', 'btn-amber-soft', 'btn-amber-surface', 'btn-amber-outline', 'btn-amber-ghost', 'btn-amber-plain', 'btn-amber-inverse'] },
  { name: 'Yellow', variants: ['btn-yellow', 'btn-yellow-soft', 'btn-yellow-surface', 'btn-yellow-outline', 'btn-yellow-ghost', 'btn-yellow-plain', 'btn-yellow-inverse'] },
  { name: 'Lime', variants: ['btn-lime', 'btn-lime-soft', 'btn-lime-surface', 'btn-lime-outline', 'btn-lime-ghost', 'btn-lime-plain', 'btn-lime-inverse'] },
  { name: 'Mint', variants: ['btn-mint', 'btn-mint-soft', 'btn-mint-surface', 'btn-mint-outline', 'btn-mint-ghost', 'btn-mint-plain', 'btn-mint-inverse'] },
  { name: 'Sky', variants: ['btn-sky', 'btn-sky-soft', 'btn-sky-surface', 'btn-sky-outline', 'btn-sky-ghost', 'btn-sky-plain', 'btn-sky-inverse'] },
] as const
</script>

<template>
  <Example name="Button" description="Discover themeable color variants.">
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

  <Example name="Inverse Colors" description="Discover all inverse button color variants.">
    <Preview v-for="color in inverseColors" :key="color.name" :name="color.name" class="flex gap-8" wrapper-class="bg-black-11">
      <div
        v-for="variant in color.variants"
        :key="variant"
        :class="variant"
        class="flex-(~ 1 center) h-8 text-(xs center) select-none cursor-default rounded-sm font-medium transition-colors"
      >
        {{
          variant.replace('btn-', '').replace('-inverse', '')
            ? variant.replace('btn-', '').replace('-inverse', '')
            : 'solid'
        }}
      </div>
    </Preview>
  </Example>

  <Example name="Weme Colors" description="Discover all weme button color variants.">
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
