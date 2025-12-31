<script lang="ts" setup>
import type { DropdownItem } from '../dropdown.props'
import Button from '../../button/button.vue'
import Dropdown from '../dropdown.vue'

const showBookmarks = ref(false)
const showRulers = ref(false)

const items = computed(() => ([
  [
    {
      label: 'New File...',
      icon: 'lucide:file-plus-corner',
      shortcut: ['meta', 'n'],
      children: [
        { label: 'New Markdown', icon: 'lucide:square-m' },
        { label: 'New CSV', icon: 'lucide:table' },
      ],
    },
    { label: 'New Window', icon: 'lucide:app-window-mac', shortcut: ['meta', 'w'] },
    { label: 'Open File...', icon: 'lucide:folder-open', shortcut: ['meta', 'o'] },
    { label: 'Export', icon: 'lucide:share', shortcut: ['meta', 'e'] },
    { type: 'separator' },
  ],
  [
    { type: 'label', label: 'Layout' },
    { type: 'checkbox', label: 'Show Bookmarks', icon: 'lucide:bookmark', checked: showBookmarks.value, onCheck: checked => showBookmarks.value = checked, onSelect: e => e.preventDefault() },
    { type: 'checkbox', label: 'Show Rulers', icon: 'lucide:ruler', checked: showRulers.value, onCheck: checked => showRulers.value = checked, onSelect: e => e.preventDefault() },
  ],
  [
    { type: 'separator' },
    { label: 'Exit', icon: 'lucide:power', shortcut: ['meta', 'q'] },
  ],
] satisfies DropdownItem[][]))
</script>

<template>
  <Dropdown :items="items">
    <Button label="Open" />
  </Dropdown>
</template>
