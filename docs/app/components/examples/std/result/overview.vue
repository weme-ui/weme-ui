<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'
import Result from '@registry/std/components/result/result.vue'
</script>

<template>
  <Result icon="check" title="This is a title" description="This is a description.">
    <template #action>
      <div class="flex-(~ y-center) gap-2">
        <Button variant="soft">
          Refresh
        </Button>

        <Button>Back</Button>
      </div>
    </template>

    <ul class="list-disc list-inside leading-loose text-sm">
      <li>Checking your email</li>
      <li>Checking the network connection</li>
    </ul>
  </Result>
</template>
