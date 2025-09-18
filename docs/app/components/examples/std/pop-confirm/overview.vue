<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'
import PopConfirm from '@registry/std/components/pop-confirm/pop-confirm.vue'
</script>

<template>
  <PopConfirm icon="lucide:at-sign" content="Are you sure?">
    <Button variant="soft">
      Default
    </Button>
  </PopConfirm>

  <PopConfirm content="Are you sure?" type="info">
    <Button variant="soft" color="info">
      Info
    </Button>
  </PopConfirm>

  <PopConfirm content="Are you sure?" type="success">
    <Button variant="soft" color="success">
      Success
    </Button>
  </PopConfirm>

  <PopConfirm content="Are you sure?" type="warning">
    <Button variant="soft" color="warning">
      Warning
    </Button>
  </PopConfirm>

  <PopConfirm content="Are you sure?" type="error">
    <Button variant="soft" color="error">
      Error
    </Button>
  </PopConfirm>
</template>
