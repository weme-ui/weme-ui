<script lang="ts" setup>
const icons = Object.keys(useAppConfig().weme.icons)
</script>

<template>
  <Container name="UiIcon" description="A component to display any icon from Iconify.">
    <div class="flex-(~ col) gap-y-12">
      <div class="grid-(~ cols-12) gap-12">
        <UiIcon v-for="icon in icons" :key="icon" :name="icon" />
      </div>
    </div>
  </Container>

  <Container name="UiIconBox">
    <div class="flex-(~ col) gap-y-12">
      <div class="grid-(~ cols-12) gap-12">
        <UiIconBox v-for="icon in icons" :key="icon" :name="icon" variant="soft" color="info" />
      </div>
    </div>
  </Container>
</template>
