<script lang="ts" setup>
import Button from '@registry/std/components/button/button.vue'
import Modal from '@registry/std/components/modal/modal.vue'
</script>

<template>
  <div class="grid-(~ cols-3) gap-6">
    <div />
    <Modal icon="info" title="Modal" description="This is a modal." side="top" closable as-child>
      <Button icon="arrowUp" />

      <template #content>
        This is the content.
      </template>
    </Modal>
    <div />

    <Modal icon="info" title="Modal" description="This is a modal." side="left" closable as-child>
      <Button icon="arrowLeft" />

      <template #content>
        This is the content.
      </template>
    </Modal>

    <Modal icon="info" title="Modal" description="This is a modal." closable as-child>
      <Button icon="lucide:circle" />

      <template #content>
        <div class="flex-(~ center)">
          <UiIcon name="weme:empty" class="size-32" />
        </div>
      </template>

      <template #footer="{ close }">
        <Button @click="close">
          Apply
        </Button>
      </template>
    </Modal>

    <Modal icon="info" title="Modal" description="This is a modal." side="right" bordered closable as-child>
      <Button icon="arrowRight" />

      <template #content>
        <div class="flex-(~ col) gap-2">
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
          <p>This is the content.</p>
        </div>
      </template>

      <template #footer="{ close }">
        <Button @click="close">
          Apply
        </Button>
      </template>
    </Modal>

    <div />

    <Modal icon="info" title="Modal" description="This is a modal." side="bottom" closable as-child>
      <Button icon="arrowDown" />

      <template #content>
        This is the content.
      </template>
    </Modal>
  </div>
</template>
