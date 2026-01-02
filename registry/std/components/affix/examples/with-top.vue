<script lang="ts" setup>
import Affix from '../affix.vue'
</script>

<template>
  <Affix :trigger-top="100">
    <div class="bg-muted p-4 rounded">
      Fixed when scrolled 100px from the top.
    </div>
  </Affix>
</template>
