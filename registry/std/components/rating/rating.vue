<script lang="ts" setup>
import type { RatingEmits, RatingProps } from './rating.props'
import { computed, ref } from 'vue'
import { toBoolDataAttrValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useRatingStyle } from './rating.style'

const props = withDefaults(defineProps<RatingProps>(), {
  count: 5,
  icon: 'mingcute:star-fill',
})

const emits = defineEmits<RatingEmits>()
const modelValue = defineModel<number>()
const hovered = ref(0)

const value = computed({
  get() {
    return modelValue.value || props.defaultValue || 0
  },
  set(value) {
    modelValue.value = value
  },
})

const ui = computed(() => useRatingStyle(props))

function handleMouseover(index: number) {
  if (props.readonly || props.disabled)
    return

  hovered.value = index
}

function handleMouseleave() {
  if (props.readonly || props.disabled)
    return

  hovered.value = 0
}

function handleClick(index: number) {
  if (props.readonly || props.disabled || value.value === index)
    return

  value.value = index
  emits('change', value.value)
}
</script>

<template>
  <div
    data-slot="rating"
    role="radiogroup"
    :aria-disabled="disabled ?? undefined"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <template v-for="index of count" :key="index">
      <span
        data-slot="rating-star"
        role="radio"
        aria-roledescription="rating"
        :aria-label="`${index} starts`"
        :aria-setsize="count"
        :aria-disabled="toBoolValue(disabled) || undefined"
        :aria-checked="(value || 0) >= index"
        :aria-posinset="index"
        :data-highlighted="toBoolDataAttrValue((value || 0) >= index || hovered >= index)"
        :class="cn(ui.star(), props.ui?.star)"
        @mouseover="handleMouseover(index)"
        @mouseleave="handleMouseleave"
        @click="handleClick(index)"
      >
        <slot name="star" v-bind="{ checked: (value || 0) >= index }">
          <Icon :name="(value || 0) >= index || hovered >= index ? checkedIcon || icon : icon" />
        </slot>
      </span>
    </template>
  </div>
</template>
