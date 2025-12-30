<script lang="ts" setup>
import IconBox from '@registry/components/icon-box/icon-box.vue'
import Item from '@registry/components/item/item.vue'

const groups = [
  { icon: 'lucide:box', title: '通用', description: '包括按钮、图标及其他构建直观且一致用户体验的基础界面元素。', href: '/examples/general' },
  { icon: 'lucide:proportions', title: '布局', description: '组织应用布局和建立统一 UI 基础的核心结构组件。', href: '/examples/layout' },
  { icon: 'lucide:inbox', title: '反馈', description: '用于用户反馈的组件。', href: '/examples/feedback' },
  { icon: 'lucide:square-dashed', title: '集合', description: '用于展示集合的组件。', href: '/examples/collections' },
  { icon: 'lucide:layout-list', title: '数据显示', description: '用于显示和组织数据的组件。', href: '/examples/data-display' },
  { icon: 'lucide:stretch-horizontal', title: '折叠面板', description: '用于分组和隐藏内容的组件。', href: '/examples/disclosure' },
  { icon: 'lucide:text-cursor-input', title: '表单', description: '构建交互式用户输入体验的综合表单组件。', href: '/examples/forms' },
  { icon: 'lucide:chart-pie', title: '图表', description: '用于数据可视化和分析的图表组件。', href: '/examples/charts' },
  { icon: 'lucide:type-outline', title: '编辑器', description: '用于编辑和展示内容的组件。', href: '/examples/editor' },
  { icon: 'lucide:cpu', title: 'AI 对话', description: '用于 AI 对话的组件。', href: '/examples/chat' },
  { icon: 'lucide:focus', title: '遮罩层', description: '用于覆盖页面的组件。', href: '/examples/overlays' },
  { icon: 'lucide:ellipsis', title: '其它', description: '未归类的其它组件。', href: '/examples/others' },
]
</script>

<template>
  <div class="grid-(~ cols-2) px-24 gap-8">
    <template v-for="group in groups" :key="group.title">
      <Item v-bind="group" variant="outline" clickable show-arrow>
        <template #indicator>
          <IconBox :name="group.icon" variant="outline" radius="lg" size="lg" class="mr-3" />
        </template>
      </Item>
    </template>
  </div>
</template>
