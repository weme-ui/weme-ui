<script lang="ts" setup>
import Card from '../card.vue'

const variants = ['normal', 'outline'] as const
</script>

<template>
  <div class="grid-(~ cols-2) gap-4">
    <template v-for="variant in variants" :key="variant">
      <Card :variant="variant">
        <template #start>
          Start
        </template>
        <template #icon>
          Icon
        </template>
        <template #title>
          Title
        </template>
        <template #description>
          Description
        </template>
        <template #action>
          Action
        </template>
        <template #end>
          End
        </template>
        <template #footer>
          Footer
        </template>

        Content
      </Card>
    </template>
  </div>
</template>
