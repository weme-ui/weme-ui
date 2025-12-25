<script lang="ts" setup>
import type { ButtonGroupProps } from './button-group.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { toBoolDataAttrValue } from '~/utils/props'
import { getChildrenSlots } from '~/utils/slots'
import { cn } from '~/utils/styles'
import { useButtonGroupStyle } from './button-group.style'

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  color: 'primary',
  variant: 'outline',
  size: 'md',
  radius: 'sm',
  gap: 'sm',
  disabled: false,
})

const slots = useSlots()
const delegated = reactivePick(props, 'as', 'asChild')
const children = computed(() => {
  return getChildrenSlots(slots.default?.())
})

const ui = computed(() => useButtonGroupStyle({
  gap: props.gap,
  radius: props.radius,
}))
</script>

<template>
  <Primitive
    v-bind="delegated"
    data-slot="root"
    :data-disabled="toBoolDataAttrValue(disabled)"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <template v-for="(child, index) in children" :key="index">
      <component
        :is="child"
        :color="child.props?.color || color"
        :variant="child.props?.variant || variant"
        :size="size"
        :radius="radius"
        :disabled="child.props?.disabled || disabled"
        :class="cn(ui.item(), props.ui?.item)"
        :data-order="index === 0
          ? 'first'
          : index === children.length - 1
            ? 'last'
            : 'middle'"
        data-slot="item"
      />
    </template>
  </Primitive>
</template>
