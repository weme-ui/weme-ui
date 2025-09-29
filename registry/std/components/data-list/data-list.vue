<script lang="ts" setup>
import type { DataListProps } from './data-list.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useDataListStyle } from './data-list.style'

const props = withDefaults(defineProps<DataListProps>(), {
  as: 'dl',
  orientation: 'horizontal',
  size: 'sm',
  highlight: false,
  items: () => [],
})

const delegated = reactivePick(props, 'as', 'asChild')

const ui = computed(() => useDataListStyle({
  ...props,
  highlight: toBoolValue(props.highlight),
}))
</script>

<template>
  <Primitive
    v-bind="delegated"
    :data-orientation="orientation"
    :class="ui.base({ class: cn(props.class, props.ui?.base) })"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="ui.item({ class: cn(props.ui?.item, item.class) })"
    >
      <slot v-bind="{ item, index }">
        <dt :class="cn(ui.label(), item.ui?.label)">
          <slot name="label" v-bind="{ item, index }">
            {{ item.label }}
          </slot>
        </dt>
        <dd :class="cn(ui.value(), item.ui?.value)">
          <slot name="value" v-bind="{ item, index }">
            {{ item.value }}
          </slot>
        </dd>
      </slot>
    </div>
  </Primitive>
</template>
