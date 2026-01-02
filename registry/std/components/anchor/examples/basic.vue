<script lang="ts" setup>
import Anchor from '../anchor.vue'
</script>

<template>
  <div class="flex gap-6">
    <div id="container" class="flex-1 h-80 overflow-y-auto">
      <div class="p-4 bg-muted rounded">
        <div id="section-1" class="h-80">
          Section 1
        </div>
        <div id="section-2" class="h-80">
          Section 2
        </div>
        <div id="section-3" class="h-80">
          Section 3
        </div>
      </div>
    </div>

    <div class="w-60">
      <Anchor
        container="#container"
        :links="[
          { label: 'Section 1', href: '#section-1' },
          { label: 'Section 2', href: '#section-2' },
          { label: 'Section 3', href: '#section-3' },
        ]"
      />
    </div>
  </div>
</template>
