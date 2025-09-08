<script lang="ts" setup>
import Example from '@/components/example.vue'
import Preview from '@/components/preview.vue'

const colors = [
  { name: 'Accent', scales: ['bg-accent-1', 'bg-accent-2', 'bg-accent-3', 'bg-accent-4', 'bg-accent-5', 'bg-accent-6', 'bg-accent-7', 'bg-accent-8', 'bg-accent-9', 'bg-accent-10', 'bg-accent-11', 'bg-accent-12'] },
  { name: 'Neutral', scales: ['bg-neutral-1', 'bg-neutral-2', 'bg-neutral-3', 'bg-neutral-4', 'bg-neutral-5', 'bg-neutral-6', 'bg-neutral-7', 'bg-neutral-8', 'bg-neutral-9', 'bg-neutral-10', 'bg-neutral-11', 'bg-neutral-12'] },
  { name: 'Info', scales: ['bg-info-1', 'bg-info-2', 'bg-info-3', 'bg-info-4', 'bg-info-5', 'bg-info-6', 'bg-info-7', 'bg-info-8', 'bg-info-9', 'bg-info-10', 'bg-info-11', 'bg-info-12'] },
  { name: 'Success', scales: ['bg-success-1', 'bg-success-2', 'bg-success-3', 'bg-success-4', 'bg-success-5', 'bg-success-6', 'bg-success-7', 'bg-success-8', 'bg-success-9', 'bg-success-10', 'bg-success-11', 'bg-success-12'] },
  { name: 'Warning', scales: ['bg-warning-1', 'bg-warning-2', 'bg-warning-3', 'bg-warning-4', 'bg-warning-5', 'bg-warning-6', 'bg-warning-7', 'bg-warning-8', 'bg-warning-9', 'bg-warning-10', 'bg-warning-11', 'bg-warning-12'] },
  { name: 'Error', scales: ['bg-error-1', 'bg-error-2', 'bg-error-3', 'bg-error-4', 'bg-error-5', 'bg-error-6', 'bg-error-7', 'bg-error-8', 'bg-error-9', 'bg-error-10', 'bg-error-11', 'bg-error-12'] },
] as const

const radixColors = [
  { name: 'Gray', scales: ['bg-gray-1', 'bg-gray-2', 'bg-gray-3', 'bg-gray-4', 'bg-gray-5', 'bg-gray-6', 'bg-gray-7', 'bg-gray-8', 'bg-gray-9', 'bg-gray-10', 'bg-gray-11', 'bg-gray-12'] },
  { name: 'Mauve', scales: ['bg-mauve-1', 'bg-mauve-2', 'bg-mauve-3', 'bg-mauve-4', 'bg-mauve-5', 'bg-mauve-6', 'bg-mauve-7', 'bg-mauve-8', 'bg-mauve-9', 'bg-mauve-10', 'bg-mauve-11', 'bg-mauve-12'] },
  { name: 'Slate', scales: ['bg-slate-1', 'bg-slate-2', 'bg-slate-3', 'bg-slate-4', 'bg-slate-5', 'bg-slate-6', 'bg-slate-7', 'bg-slate-8', 'bg-slate-9', 'bg-slate-10', 'bg-slate-11', 'bg-slate-12'] },
  { name: 'Sage', scales: ['bg-sage-1', 'bg-sage-2', 'bg-sage-3', 'bg-sage-4', 'bg-sage-5', 'bg-sage-6', 'bg-sage-7', 'bg-sage-8', 'bg-sage-9', 'bg-sage-10', 'bg-sage-11', 'bg-sage-12'] },
  { name: 'Olive', scales: ['bg-olive-1', 'bg-olive-2', 'bg-olive-3', 'bg-olive-4', 'bg-olive-5', 'bg-olive-6', 'bg-olive-7', 'bg-olive-8', 'bg-olive-9', 'bg-olive-10', 'bg-olive-11', 'bg-olive-12'] },
  { name: 'Sand', scales: ['bg-sand-1', 'bg-sand-2', 'bg-sand-3', 'bg-sand-4', 'bg-sand-5', 'bg-sand-6', 'bg-sand-7', 'bg-sand-8', 'bg-sand-9', 'bg-sand-10', 'bg-sand-11', 'bg-sand-12'] },
  { name: 'Tomato', scales: ['bg-tomato-1', 'bg-tomato-2', 'bg-tomato-3', 'bg-tomato-4', 'bg-tomato-5', 'bg-tomato-6', 'bg-tomato-7', 'bg-tomato-8', 'bg-tomato-9', 'bg-tomato-10', 'bg-tomato-11', 'bg-tomato-12'] },
  { name: 'Red', scales: ['bg-red-1', 'bg-red-2', 'bg-red-3', 'bg-red-4', 'bg-red-5', 'bg-red-6', 'bg-red-7', 'bg-red-8', 'bg-red-9', 'bg-red-10', 'bg-red-11', 'bg-red-12'] },
  { name: 'Ruby', scales: ['bg-ruby-1', 'bg-ruby-2', 'bg-ruby-3', 'bg-ruby-4', 'bg-ruby-5', 'bg-ruby-6', 'bg-ruby-7', 'bg-ruby-8', 'bg-ruby-9', 'bg-ruby-10', 'bg-ruby-11', 'bg-ruby-12'] },
  { name: 'Crimson', scales: ['bg-crimson-1', 'bg-crimson-2', 'bg-crimson-3', 'bg-crimson-4', 'bg-crimson-5', 'bg-crimson-6', 'bg-crimson-7', 'bg-crimson-8', 'bg-crimson-9', 'bg-crimson-10', 'bg-crimson-11', 'bg-crimson-12'] },
  { name: 'Pink', scales: ['bg-pink-1', 'bg-pink-2', 'bg-pink-3', 'bg-pink-4', 'bg-pink-5', 'bg-pink-6', 'bg-pink-7', 'bg-pink-8', 'bg-pink-9', 'bg-pink-10', 'bg-pink-11', 'bg-pink-12'] },
  { name: 'Plum', scales: ['bg-plum-1', 'bg-plum-2', 'bg-plum-3', 'bg-plum-4', 'bg-plum-5', 'bg-plum-6', 'bg-plum-7', 'bg-plum-8', 'bg-plum-9', 'bg-plum-10', 'bg-plum-11', 'bg-plum-12'] },
  { name: 'Purple', scales: ['bg-purple-1', 'bg-purple-2', 'bg-purple-3', 'bg-purple-4', 'bg-purple-5', 'bg-purple-6', 'bg-purple-7', 'bg-purple-8', 'bg-purple-9', 'bg-purple-10', 'bg-purple-11', 'bg-purple-12'] },
  { name: 'Violet', scales: ['bg-violet-1', 'bg-violet-2', 'bg-violet-3', 'bg-violet-4', 'bg-violet-5', 'bg-violet-6', 'bg-violet-7', 'bg-violet-8', 'bg-violet-9', 'bg-violet-10', 'bg-violet-11', 'bg-violet-12'] },
  { name: 'Iris', scales: ['bg-iris-1', 'bg-iris-2', 'bg-iris-3', 'bg-iris-4', 'bg-iris-5', 'bg-iris-6', 'bg-iris-7', 'bg-iris-8', 'bg-iris-9', 'bg-iris-10', 'bg-iris-11', 'bg-iris-12'] },
  { name: 'Indigo', scales: ['bg-indigo-1', 'bg-indigo-2', 'bg-indigo-3', 'bg-indigo-4', 'bg-indigo-5', 'bg-indigo-6', 'bg-indigo-7', 'bg-indigo-8', 'bg-indigo-9', 'bg-indigo-10', 'bg-indigo-11', 'bg-indigo-12'] },
  { name: 'Blue', scales: ['bg-blue-1', 'bg-blue-2', 'bg-blue-3', 'bg-blue-4', 'bg-blue-5', 'bg-blue-6', 'bg-blue-7', 'bg-blue-8', 'bg-blue-9', 'bg-blue-10', 'bg-blue-11', 'bg-blue-12'] },
  { name: 'Cyan', scales: ['bg-cyan-1', 'bg-cyan-2', 'bg-cyan-3', 'bg-cyan-4', 'bg-cyan-5', 'bg-cyan-6', 'bg-cyan-7', 'bg-cyan-8', 'bg-cyan-9', 'bg-cyan-10', 'bg-cyan-11', 'bg-cyan-12'] },
  { name: 'Teal', scales: ['bg-teal-1', 'bg-teal-2', 'bg-teal-3', 'bg-teal-4', 'bg-teal-5', 'bg-teal-6', 'bg-teal-7', 'bg-teal-8', 'bg-teal-9', 'bg-teal-10', 'bg-teal-11', 'bg-teal-12'] },
  { name: 'Jade', scales: ['bg-jade-1', 'bg-jade-2', 'bg-jade-3', 'bg-jade-4', 'bg-jade-5', 'bg-jade-6', 'bg-jade-7', 'bg-jade-8', 'bg-jade-9', 'bg-jade-10', 'bg-jade-11', 'bg-jade-12'] },
  { name: 'Green', scales: ['bg-green-1', 'bg-green-2', 'bg-green-3', 'bg-green-4', 'bg-green-5', 'bg-green-6', 'bg-green-7', 'bg-green-8', 'bg-green-9', 'bg-green-10', 'bg-green-11', 'bg-green-12'] },
  { name: 'Grass', scales: ['bg-grass-1', 'bg-grass-2', 'bg-grass-3', 'bg-grass-4', 'bg-grass-5', 'bg-grass-6', 'bg-grass-7', 'bg-grass-8', 'bg-grass-9', 'bg-grass-10', 'bg-grass-11', 'bg-grass-12'] },
  { name: 'Bronze', scales: ['bg-bronze-1', 'bg-bronze-2', 'bg-bronze-3', 'bg-bronze-4', 'bg-bronze-5', 'bg-bronze-6', 'bg-bronze-7', 'bg-bronze-8', 'bg-bronze-9', 'bg-bronze-10', 'bg-bronze-11', 'bg-bronze-12'] },
  { name: 'Gold', scales: ['bg-gold-1', 'bg-gold-2', 'bg-gold-3', 'bg-gold-4', 'bg-gold-5', 'bg-gold-6', 'bg-gold-7', 'bg-gold-8', 'bg-gold-9', 'bg-gold-10', 'bg-gold-11', 'bg-gold-12'] },
  { name: 'Brown', scales: ['bg-brown-1', 'bg-brown-2', 'bg-brown-3', 'bg-brown-4', 'bg-brown-5', 'bg-brown-6', 'bg-brown-7', 'bg-brown-8', 'bg-brown-9', 'bg-brown-10', 'bg-brown-11', 'bg-brown-12'] },
  { name: 'Orange', scales: ['bg-orange-1', 'bg-orange-2', 'bg-orange-3', 'bg-orange-4', 'bg-orange-5', 'bg-orange-6', 'bg-orange-7', 'bg-orange-8', 'bg-orange-9', 'bg-orange-10', 'bg-orange-11', 'bg-orange-12'] },
  { name: 'Amber', scales: ['bg-amber-1', 'bg-amber-2', 'bg-amber-3', 'bg-amber-4', 'bg-amber-5', 'bg-amber-6', 'bg-amber-7', 'bg-amber-8', 'bg-amber-9', 'bg-amber-10', 'bg-amber-11', 'bg-amber-12'] },
  { name: 'Yellow', scales: ['bg-yellow-1', 'bg-yellow-2', 'bg-yellow-3', 'bg-yellow-4', 'bg-yellow-5', 'bg-yellow-6', 'bg-yellow-7', 'bg-yellow-8', 'bg-yellow-9', 'bg-yellow-10', 'bg-yellow-11', 'bg-yellow-12'] },
  { name: 'Lime', scales: ['bg-lime-1', 'bg-lime-2', 'bg-lime-3', 'bg-lime-4', 'bg-lime-5', 'bg-lime-6', 'bg-lime-7', 'bg-lime-8', 'bg-lime-9', 'bg-lime-10', 'bg-lime-11', 'bg-lime-12'] },
  { name: 'Mint', scales: ['bg-mint-1', 'bg-mint-2', 'bg-mint-3', 'bg-mint-4', 'bg-mint-5', 'bg-mint-6', 'bg-mint-7', 'bg-mint-8', 'bg-mint-9', 'bg-mint-10', 'bg-mint-11', 'bg-mint-12'] },
  { name: 'Sky', scales: ['bg-sky-1', 'bg-sky-2', 'bg-sky-3', 'bg-sky-4', 'bg-sky-5', 'bg-sky-6', 'bg-sky-7', 'bg-sky-8', 'bg-sky-9', 'bg-sky-10', 'bg-sky-11', 'bg-sky-12'] },
  { name: 'Black', scales: ['bg-black-1', 'bg-black-2', 'bg-black-3', 'bg-black-4', 'bg-black-5', 'bg-black-6', 'bg-black-7', 'bg-black-8', 'bg-black-9', 'bg-black-10', 'bg-black-11', 'bg-black-12'] },
  { name: 'White', scales: ['bg-white', 'bg-white-2', 'bg-white-3', 'bg-white-4', 'bg-white-5', 'bg-white-6', 'bg-white-7', 'bg-white-8', 'bg-white-9', 'bg-white-10', 'bg-white-11', 'bg-white-12'] },
] as const
</script>

<template>
  <Example name="Colors" description="Discover special theme colors." class="grid-(~ cols-3) gap-6">
    <Preview v-for="color in colors" :key="color.name" :name="color.name" class="flex bg-muted p-1 rounded-lg">
      <div class="flex-(~ 1) rounded-md overflow-hidden">
        <div v-for="(scale, index) in color.scales" :key="scale" class="flex-1">
          <div :class="scale" class="flex-(~ center) h-8 text-(xs center)">
            <span :class="index > 6 ? 'text-neutral-1' : ''">
              {{ index + 1 }}
            </span>
          </div>
        </div>
      </div>
    </Preview>
  </Example>

  <Example name="Radix Colors" description="Discover all radix colors." class="grid-(~ cols-3) gap-6">
    <Preview v-for="color in radixColors" :key="color.name" :name="color.name" class="flex bg-muted p-1 rounded-lg">
      <div class="flex-(~ 1) rounded-md overflow-hidden">
        <div v-for="(scale, index) in color.scales" :key="scale" class="flex-1">
          <div :class="scale" class="flex-(~ center) h-8 text-(xs center)">
            <span :class="index > 6 ? 'text-neutral-1' : ''">
              {{ index + 1 }}
            </span>
          </div>
        </div>
      </div>
    </Preview>
  </Example>
</template>
