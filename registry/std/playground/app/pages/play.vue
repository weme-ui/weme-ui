<script lang="ts" setup>
import type { DropdownItem } from '../../../components/dropdown/dropdown.props'

const showHiddenFiles = ref(true)
const showFileExtensions = ref(false)

const items = computed(() => [
  [
    {
      icon: 'user',
      label: 'Profile',
      shortcut: ['meta', 'P'],
    },
  ],
  [
    {
      type: 'label',
      label: 'Settings',
    },
    {
      type: 'checkbox',
      icon: 'lucide:eye',
      label: 'Show hidden files',
      checked: showHiddenFiles.value,
      onCheck: (checked: boolean) => {
        showHiddenFiles.value = checked
      },
    },
    {
      type: 'checkbox',
      icon: 'lucide:paperclip',
      label: 'Show file extensions',
      checked: showFileExtensions.value,
      onCheck: (checked: boolean) => {
        showFileExtensions.value = checked
      },
    },
    {
      icon: 'lucide:settings',
      label: 'Settings',
      children: [
        {
          icon: 'lucide:settings',
          label: 'General',
          suffix: 'v1.0.0',
        },
        {
          icon: 'lucide:monitor',
          label: 'Appearance',
        },
        {
          icon: 'lucide:lock',
          label: 'Privacy',
        },
      ],
    },
    { type: 'separator' },

  ],
  [
    {
      icon: 'lucide:log-out',
      label: 'Logout',
      shortcut: ['meta', 'Q'],
    },
  ],
] satisfies DropdownItem[][])
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiContextMenu :items="items">
      <div class="flex-(~ center) text-(xs muted) rounded-lg select-none size-40 b-(~ dashed default)">
        Right click me
      </div>
    </UiContextMenu>
  </Container>
</template>
