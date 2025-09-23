<script lang="ts" setup>
import Avatar from '@registry/std/components/avatar/avatar.vue'
import Dropdown from '@registry/std/components/dropdown/dropdown.vue'

const showActivity = ref(false)
const showSidebar = ref(false)
const alignment = ref('left')

const items = computed(() => [
  [
    { type: 'separator' },
    { icon: 'lucide:circle-plus', label: 'New Tab', value: 'new-tab', shortcuts: ['meta', 'N'] },
    { icon: 'lucide:circle-plus', loading: true, label: 'New Window', value: 'new-window', shortcuts: ['meta', 'W'] },
    {
      icon: 'more',
      label: 'More Tools',
      value: 'tools',
      children: [
        { icon: 'lucide:terminal', label: 'Developer Tools', value: 'devtools' },
        { icon: 'lucide:grid-2x2-plus', label: 'Extensions', type: 'link', href: 'https://github.com/weme-ui/weme-ui', target: '_blank', value: 'extensions' },
      ],
    },
    { type: 'separator' },
  ],
  [
    { icon: 'lucide:panel-left', label: 'Show Activity Bar', type: 'checkbox', value: 'activity', checked: showActivity.value, shortcuts: ['shift', 'alt', 'A'], onCheck: (checked: boolean) => showActivity.value = checked, onSelect: (e: Event) => e.preventDefault() },
    { icon: 'lucide:panel-right', label: 'Show Sidebar', type: 'checkbox', value: 'sidebar', checked: showSidebar.value, shortcuts: ['shift', 'alt', 'S'], onCheck: (checked: boolean) => showSidebar.value = checked, onSelect: (e: Event) => e.preventDefault() },
    { type: 'separator' },
  ],
  [
    { label: 'Alignment', type: 'label' },
    { icon: 'lucide:align-left', label: 'Left', type: 'checkbox', value: 'left', checked: alignment.value === 'left', onCheck: (checked: boolean) => checked && (alignment.value = 'left'), onSelect: (e: Event) => e.preventDefault() },
    { icon: 'lucide:align-center', label: 'Center', type: 'checkbox', value: 'center', checked: alignment.value === 'center', onCheck: (checked: boolean) => checked && (alignment.value = 'center'), onSelect: (e: Event) => e.preventDefault() },
    { icon: 'lucide:align-right', label: 'Right', type: 'checkbox', value: 'right', checked: alignment.value === 'right', onCheck: (checked: boolean) => checked && (alignment.value = 'right'), onSelect: (e: Event) => e.preventDefault() },
  ],
])
</script>

<template>
  <Dropdown :items="items" class="min-w-76">
    <template #trigger>
      <UiButton>Open Menu</UiButton>
    </template>

    <template #top>
      <div class="flex gap-x-3 px-3.5 py-2.5">
        <Avatar color="neutral" />
        <div class="flex-(~ 1 col) w-full">
          <div class="flex-(~ 1 y-center between) gap-x-1">
            <strong class="flex-1 c-accent text-sm">Username</strong>
            <UiBadge text="VIP" size="xs" />
          </div>
        </div>
      </div>
    </template>
  </Dropdown>
</template>
