<script lang="ts" setup>
import type { TimelineItem } from '@registry/std/components/timeline/timeline.props'
import Timeline from '@registry/std/components/timeline/timeline.vue'

const items: TimelineItem[] = [
  {
    date: '2021-01-01',
    title: '客户下单',
    description: 'Description 1',
    icon: 'lucide:shopping-cart',
    color: 'info',
  },
  {
    date: '2021-01-01',
    title: '完成付款',
    description: 'Description 2',
    icon: 'lucide:wallet',
    color: 'info',
  },
  {
    date: '2021-01-01',
    title: '商家处理中',
    description: 'Description 2',
    icon: 'lucide:hourglass',
    color: 'warning',
  },
  {
    date: '2021-01-01',
    title: '商品出库',
    description: 'Description 2',
    icon: 'lucide:warehouse',
    color: 'warning',
  },
  {
    date: '2021-01-01',
    title: '物流发货',
    description: 'Description 2',
    icon: 'lucide:truck',
    color: 'warning',
  },
  {
    date: '2021-01-01',
    title: '物流送达',
    description: 'Description 2',
    icon: 'lucide:package-check',
    color: 'info',
  },
  {
    date: '2021-01-01',
    title: '确认收货',
    description: 'Description 2',
    icon: 'lucide:circle-check',
    iconProps: { variant: 'solid' },
    color: 'success',
  },
] as const
</script>

<template>
  <Timeline :items="items" size="md" orientation="vertical" />
</template>
