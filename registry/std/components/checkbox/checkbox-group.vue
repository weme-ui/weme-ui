<script lang="ts" setup>
import type { CheckboxGroupEmits, CheckboxGroupProps } from './checkbox-group.props'
import { reactivePick } from '@vueuse/core'
import { CheckboxGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useCheckboxGroupStyle } from './checkbox-group.style'
import Checkbox from './checkbox.vue'

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  variant: 'normal',
  color: 'accent',
  orientation: 'vertical',
  align: 'start',
  radius: 'sm',
  size: 'md',
  indicator: 'start',
})

const emits = defineEmits<CheckboxGroupEmits>()

const delegated = reactivePick(props, 'as', 'defaultValue', 'dir', 'disabled', 'loop', 'modelValue', 'name', 'orientation', 'required', 'rovingFocus')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useCheckboxGroupStyle(props))
</script>

<template>
  <CheckboxGroupRoot v-bind="forwarded" :class="ui.base({ class: cn(props.class, props.ui?.base) })">
    <template v-for="item in items" :key="item.value">
      <Checkbox
        v-bind="item"
        :color="color"
        :align="align"
        :radius="radius"
        :size="size"
        :indicator="indicator"
        :fill="fill"
        :class="ui.item({ class: props.ui?.item })"
        :ui="{
          leading: cn(props.ui?.leading, item.ui?.leading),
          trailing: cn(props.ui?.trailing, item.ui?.trailing),
          label: cn(props.ui?.label, item.ui?.label),
          description: cn(props.ui?.description, item.ui?.description),
          indicator: cn(props.ui?.indicator, item.ui?.indicator),
        }"
      >
        <template v-if="$slots.label" #label>
          <slot name="label" v-bind="{ item }">
            {{ item.label }}
          </slot>
        </template>

        <template v-if="$slots.description" #description>
          <slot name="description" v-bind="{ item }">
            {{ item.description }}
          </slot>
        </template>

        <template v-if="$slots.leading" #leading>
          <slot name="leading" v-bind="{ item }" />
        </template>

        <template v-if="$slots.trailing" #trailing>
          <slot name="trailing" v-bind="{ item }" />
        </template>

        <template v-if="$slots.indicator" #indicator>
          <slot name="indicator" v-bind="{ item }" />
        </template>
      </Checkbox>
    </template>
  </CheckboxGroupRoot>
</template>
