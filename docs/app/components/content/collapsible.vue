<script lang="ts" setup>
withDefaults(defineProps<{
  icon?: string
  openText?: string
  closeText?: string
}>(), {
  openText: 'Hidden',
  closeText: 'Show',
})
</script>

<template>
  <UiCollapsible as-child>
    <template #trigger="{ open }">
      <UiButton class="w-full justify-between" variant="ghost">
        <div class="flex-(~ y-center) gap-2">
          <ProseIcon v-if="icon" :name="icon" />
          {{ open ? openText : closeText }}
        </div>
        <ProseIcon name="right" class="transition-transform" :class="{ '-rotate-90': open }" />
      </UiButton>
    </template>

    <template #default>
      <div class="px-4 rounded-lg b-(~ default) mt-3">
        <slot />
      </div>
    </template>
  </UiCollapsible>
</template>
