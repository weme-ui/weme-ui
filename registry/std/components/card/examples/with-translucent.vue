<script lang="ts" setup>
import Card from '../card.vue'
</script>

<template>
  <div class="grid-(~ cols-2) gap-6 p-12 bg-linear-to-br from-sky to-rose">
    <Card title="Title" description="Description" variant="outline" translucent>
      Content
    </Card>

    <Card title="Title" description="Description" translucent>
      Content
    </Card>
  </div>
</template>
