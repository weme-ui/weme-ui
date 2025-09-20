<script lang="ts" setup>
import type { TabsContentProps } from './tabs-content.props'
import { reactiveOmit } from '@vueuse/core'
import { TabsContent } from 'reka-ui'

const props = defineProps<TabsContentProps>()
const delegated = reactiveOmit(props, 'class', 'title', 'icon', 'loading')
</script>

<template>
  <TabsContent v-bind="delegated" :class="props.class">
    <slot />
  </TabsContent>
</template>
