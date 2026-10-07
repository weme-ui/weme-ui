<script lang="ts" setup>
import Button from '../../button/button.vue'
import ButtonGroup from '../button-group.vue'
</script>

<template>
  <ButtonGroup separator>
    <Button label="Save" />
    <Button label="Draft" />
    <Button label="Cancel" variant="ghost" />
  </ButtonGroup>
</template>
