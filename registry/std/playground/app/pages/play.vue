<script lang="ts" setup>
const items = [
  'https://picsum.photos/640/320?random=1',
  'https://picsum.photos/640/320?random=2',
  'https://picsum.photos/640/320?random=3',
  'https://picsum.photos/640/320?random=4',
  'https://picsum.photos/640/320?random=5',
  'https://picsum.photos/640/320?random=6',
]
</script>

<template>
  <Container name="PLAY YOUR CODE HERE" description="🐗 Hakuna matata">
    <UiStack>
      <UiCarousel v-slot="{ item }" :items="items" class="w-full max-w-xs mx-auto" autoplay fade show-arrows show-dots>
        <UiImage :src="item" width="320" height="160" class="rounded-lg" />
      </UiCarousel>

      <UiCarousel v-slot="{ item }" :items="items" :ui="{ container: 'h-[176px]' }" orientation="vertical" class="w-full max-w-xs mx-auto" autoplay wheel-gestures show-arrows show-dots>
        <UiImage :src="item" width="320" height="160" class="rounded-lg" />
      </UiCarousel>
    </UiStack>
  </Container>
</template>
