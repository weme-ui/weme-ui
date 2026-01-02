<script lang="ts" setup>
import Affix from '../affix.vue'
</script>

<template>
  <Affix :trigger-bottom="100">
    <div class="bg-muted p-4 rounded">
      Fixed when scrolled 100px from the bottom.
    </div>
  </Affix>
</template>
