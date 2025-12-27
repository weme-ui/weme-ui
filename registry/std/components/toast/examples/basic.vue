<script lang="ts" setup>
import { useToast } from '~/composables/use-toast'
import Button from '../../button/button.vue'

const { add } = useToast()
</script>

<template>
  <Button label="Add Toast" @click="add({ title: 'Info', description: 'Description' })" />
</template>
