<script lang="ts" setup>
const styleElm = ref<HTMLStyleElement | null>(null)

onMounted(() => {
  styleElm.value = document.getElementsByTagName('style').item(0)
})
</script>

<template>
  <pre>
    <code>
      {{ styleElm?.textContent }}
    </code>
  </pre>
</template>
