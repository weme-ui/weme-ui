<script lang="ts" setup>
import type { IconBoxProps } from './icon-box.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '../../utils/variants'
import { useIconBoxStyle } from './icon-box.style'
import Icon from './icon.vue'

const props = defineProps<IconBoxProps>()
const ui = computed(() => useIconBoxStyle(props))
</script>

<template>
  <Primitive :as="as" :class="cn(ui.base(), props.class, props.ui?.base)">
    <slot>
      <Icon :name="name" :mode="mode" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>
  </Primitive>
</template>
