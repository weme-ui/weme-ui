<script lang="ts" setup>
import CarouselExampleBasic from '@registry/components/carousel/examples/basic.vue'
import CarouselExampleWithAutoplay from '@registry/components/carousel/examples/with-autoplay.vue'
import CarouselExampleWithControls from '@registry/components/carousel/examples/with-controls.vue'
import CarouselExampleWithFade from '@registry/components/carousel/examples/with-fade.vue'
import CarouselExampleWithOrientation from '@registry/components/carousel/examples/with-orientation.vue'
import CarouselExampleWithWheel from '@registry/components/carousel/examples/with-wheel.vue'
</script>

<template>
  <UiTabs default-value="basic" animate>
    <UiTabsContent value="basic" title="Basic">
      <CarouselExampleBasic />
    </UiTabsContent>

    <UiTabsContent value="with-orientation" title="With Orientation">
      <CarouselExampleWithOrientation />
    </UiTabsContent>

    <UiTabsContent value="with-controls" title="With Controls">
      <CarouselExampleWithControls />
    </UiTabsContent>

    <UiTabsContent value="with-autoplay" title="With Autoplay">
      <CarouselExampleWithAutoplay />
    </UiTabsContent>

    <UiTabsContent value="with-fade" title="With Fade">
      <CarouselExampleWithFade />
    </UiTabsContent>

    <UiTabsContent value="with-wheel" title="With Wheel">
      <CarouselExampleWithWheel />
    </UiTabsContent>
  </UiTabs>
</template>
