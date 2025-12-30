<script lang="ts" setup>
import IconBox from '@std/components/icon-box/icon-box.vue'
import Item from '@std/components/item/item.vue'

const groups = [
  { icon: 'lucide:quote', title: 'Blockquote', description: 'Used to quote text content from an external source.', href: '/examples/blockquote' },
  { icon: 'lucide:code-xml', title: 'Code', description: 'Used to display inline code.', href: '/examples/code' },
  { icon: 'lucide:italic', title: 'Em', description: 'Used to mark text for emphasis.', href: '/examples/em' },
  { icon: 'lucide:heading', title: 'Heading', description: 'Used to render semantic HTML heading elements.', href: '/examples/heading' },
  { icon: 'lucide:lightbulb', title: 'Highlight', description: 'Used to highlight substrings of a text.', href: '/examples/highlight' },
  { icon: 'lucide:link', title: 'Link', description: 'Used to provide accessible navigation.', href: '/examples/link' },
  { icon: 'lucide:list', title: 'List', description: 'Used to display a list of items.', href: '/examples/list' },
  { icon: 'lucide:highlighter', title: 'Mark', description: 'Used to mark text for emphasis.', href: '/examples/mark' },
  { icon: 'lucide:type', title: 'Text', description: 'Used to render text and paragraphs within an interface.', href: '/examples/text' },
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
