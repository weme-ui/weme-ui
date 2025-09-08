<script lang="ts" setup>
</script>

<template>
  <div class="flex-(~ center) h-[calc(100vh-11rem)] w-full">
    <div class="flex-(~ col center) gap-12">
      <h1 class="text-40 font-bold text-neutral-6 uppercase -tracking-4 leading-none select-none transition-color hover:text-highlighted">
        Playground
      </h1>

      <div class="flex-(~ col y-center) gap-y-2">
        <hr class="w-px h-20 b-(t-0 r dotted default)">

        <div class="rounded-full b-(~ default) size-2.5" />
      </div>

      <small class="op-50 select-none">
        Press <span class="flex-(inline center) text-highlighted px-1.5 rounded">G</span> to select a case.
      </small>
    </div>
  </div>
</template>
