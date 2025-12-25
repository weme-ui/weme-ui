<script lang="ts" setup>
import ButtonGroupExamples from './button-group.vue'
import ButtonExamples from './button.vue'
import IconBoxExamples from './icon-box.vue'
import IconButtonExamples from './icon-button.vue'
import IconExamples from './icon.vue'
import KbdExamples from './kbd.vue'
</script>

<template>
  <Example title="按钮" description="Button">
    <ButtonExamples />
  </Example>

  <Example title="按钮组" description="Button Group">
    <ButtonGroupExamples />
  </Example>

  <Example title="图标" description="Icon">
    <IconExamples />
  </Example>

  <Example title="图标按钮" description="Icon Button">
    <IconButtonExamples />
  </Example>

  <Example title="图标容器" description="Icon Box">
    <IconBoxExamples />
  </Example>

  <Example title="键盘按键" description="Kbd">
    <KbdExamples />
  </Example>
</template>
