<script lang="ts" setup>
import AccordionExamples from './accordion.vue'
import BreadcrumbExamples from './breadcrumb.vue'
import CarouselExamples from './carousel.vue'
import CollapsibleExamples from './collapsible.vue'
import PaginationExamples from './pagination.vue'
import StepsExamples from './steps.vue'
import TabsExamples from './tabs.vue'
</script>

<template>
  <Example title="折叠面板" description="Accordion">
    <AccordionExamples />
  </Example>

  <Example title="面包屑" description="Breadcrumb">
    <BreadcrumbExamples />
  </Example>

  <Example title="图片轮播" description="Carousel">
    <CarouselExamples />
  </Example>

  <Example title="可折叠" description="Collapsible">
    <CollapsibleExamples />
  </Example>

  <Example title="分页" description="Pagination">
    <PaginationExamples />
  </Example>

  <Example title="步骤" description="Steps">
    <StepsExamples />
  </Example>

  <Example title="选项卡" description="Tabs">
    <TabsExamples />
  </Example>
</template>
