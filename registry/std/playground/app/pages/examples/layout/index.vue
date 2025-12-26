<script lang="ts" setup>
import AspectRationExamples from './aspect-ratio.vue'
import FloatExamples from './float.vue'
import GroupExamples from './group.vue'
import OverflowExamples from './overflow.vue'
import ScrollAreaExamples from './scroll-area.vue'
import SeparatorExamples from './separator.vue'
</script>

<template>
  <Example title="宽高比" description="Aspect Ratio">
    <AspectRationExamples />
  </Example>

  <Example title="浮动" description="Float">
    <FloatExamples />
  </Example>

  <Example title="组合" description="Group">
    <GroupExamples />
  </Example>

  <Example title="溢出" description="Overflow">
    <OverflowExamples />
  </Example>

  <Example title="滚动区域" description="Scroll Area">
    <ScrollAreaExamples />
  </Example>

  <Example title="分隔符" description="Separator">
    <SeparatorExamples />
  </Example>

  <Example title="堆叠" description="Stack">
    <!--  -->
  </Example>
</template>
