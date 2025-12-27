<script lang="ts" setup>
import AlertExamples from './alert.vue'
import BannerExamples from './banner.vue'
import ProgressExamples from './progress.vue'
import ResultExamples from './result.vue'
import SkeletonExamples from './skeleton.vue'
import SpinnerExamples from './spinner.vue'
import ToastExamples from './toast.vue'
</script>

<template>
  <Example title="警告" description="Alert">
    <AlertExamples />
  </Example>

  <Example title="横幅" description="Banner">
    <BannerExamples />
  </Example>

  <Example title="进度" description="Progress">
    <ProgressExamples />
  </Example>

  <Example title="结果" description="Result">
    <ResultExamples />
  </Example>

  <Example title="骨架" description="Skeleton">
    <SkeletonExamples />
  </Example>

  <Example title="加载" description="Spinner">
    <SpinnerExamples />
  </Example>

  <Example title="通知" description="Toast">
    <ToastExamples />
  </Example>
</template>
