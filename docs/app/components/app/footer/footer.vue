<script lang="ts" setup>
const navs = useFooter()
</script>

<template>
  <footer class="w-full b-(t default)">
    <div class="container mx-auto flex justify-between text-sm px-6 py-4">
      <p class="c-toned">
        Published under the MIT License.
      </p>

      <ul class="flex-(~ y-center) gap-4">
        <li v-for="item in navs" :key="item.label" class="flex-(inline y-center) gap-x-2">
          <UiLink :to="item.to" :target="item.target" :rel="item.rel" color="neutral">
            {{ item.label }}
            <ProseIcon v-if="item.target === '_blank'" name="external" class="size-3.5 c-neutral-8" />
          </UiLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
