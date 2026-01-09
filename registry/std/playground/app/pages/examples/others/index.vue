<script lang="ts" setup>
import AffixExamples from './affix.vue'
import AnchorExamples from './anchor.vue'
import BarCodeExamples from './bar-code.vue'
import HighlightExamples from './highlight.vue'
import LensExamples from './lens.vue'
import MarqueeExamples from './marquee.vue'
import NumberTickerExamples from './number-ticker.vue'
import QRCodeExamples from './qr-code.vue'
import TimerExamples from './timer.vue'
</script>

<template>
  <Example title="计时器" description="Timer">
    <TimerExamples />
  </Example>

  <Example title="高亮" description="Highlight">
    <HighlightExamples />
  </Example>

  <Example title="镜头" description="Lens">
    <LensExamples />
  </Example>

  <Example title="跑马灯" description="Marquee">
    <MarqueeExamples />
  </Example>

  <Example title="数字滚动" description="Number Ticker">
    <NumberTickerExamples />
  </Example>

  <Example title="二维码" description="QR Code">
    <QRCodeExamples />
  </Example>

  <Example title="条形码" description="Bar Code">
    <BarCodeExamples />
  </Example>

  <Example title="吸附" description="Affix">
    <AffixExamples />
  </Example>

  <Example title="锚点" description="Anchor">
    <AnchorExamples />
  </Example>
</template>
