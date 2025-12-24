<script lang="ts" setup>
import Icon from '../../icon/icon.vue'
import Button from '../button.vue'
</script>

<template>
  <div class="flex-(~ center) h-full gap-6">
    <Button label="Button" />
    <Button icon="search" label="Search" />
    <Button icon="search" label="Loading" loading />
    <Button icon="error" label="Disabled" disabled />
    <Button>
      With slot
      <Icon name="right" />
    </Button>
  </div>
</template>
