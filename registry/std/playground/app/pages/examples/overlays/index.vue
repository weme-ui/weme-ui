<script lang="ts" setup>
import ActionSheetExamples from './action-sheet.vue'
import ContextMenuExamples from './context-menu.vue'
import DropdownExamples from './dropdown.vue'
import ModalExamples from './modal.vue'
import OverlayExamples from './overlay.vue'
import PopConfirmExamples from './pop-confirm.vue'
import PopoverExamples from './popover.vue'
import ToggleTooltipExamples from './toggle-tooltip.vue'
import TooltipExamples from './tooltip.vue'
</script>

<template>
  <Example title="操作面板" description="Action Sheet">
    <ActionSheetExamples />
  </Example>

  <Example title="下拉菜单" description="Dropdown">
    <DropdownExamples />
  </Example>

  <Example title="上下文菜单" description="Context Menu">
    <ContextMenuExamples />
  </Example>

  <Example title="模态框" description="Modal">
    <ModalExamples />
  </Example>

  <Example title="确认框" description="Pop Confirm">
    <PopConfirmExamples />
  </Example>

  <Example title="气泡卡片" description="Popover">
    <PopoverExamples />
  </Example>

  <Example title="切换提示信息" description="Toggle Tooltip">
    <ToggleTooltipExamples />
  </Example>

  <Example title="提示信息" description="Tooltip">
    <TooltipExamples />
  </Example>

  <Example title="遮罩层" description="Overlay">
    <OverlayExamples />
  </Example>
</template>
