<script lang="ts" setup>
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <div class="p-6 rounded-lg ">
      <UiPagination class="w-200" :total="100" align="center" show-total show-more-controls>
        <template #start>
          Start
        </template>

        <template #end>
          End
        </template>
      </UiPagination>
    </div>
  </Container>
</template>
