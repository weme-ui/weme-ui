<script lang="ts" setup>
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'reka-ui'

const props = defineProps<{
  nav?: NavItem[]
  class?: string
}>()
</script>

<template>
  <NavigationMenuRoot
    v-if="nav && nav.length"
    class="relative flex-(~ x-center)"
    :class="props.class"
  >
    <NavigationMenuList class="flex gap-4 px-2.5 py-2 bg-accent rounded-full text-accent-6">
      <NavigationMenuItem v-for="item in nav" :key="item.label">
        <template v-if="item.children?.length">
          <NavigationMenuTrigger class="flex-(~ center) gap-2 px-6 py-1.5 text-sm">
            {{ item.label }}
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <template v-for="child in item.children" :key="child.to">
              <NavigationMenuLink :href="child.to" :target="child.target" :rel="child.rel">
                {{ child.label }}
              </NavigationMenuLink>
            </template>
          </NavigationMenuContent>
        </template>

        <template v-else>
          <NavigationMenuLink :href="item.to" :target="item.target" :rel="item.rel">
            {{ item.label }}
          </NavigationMenuLink>
        </template>
      </NavigationMenuItem>

      <NavigationMenuIndicator />
    </NavigationMenuList>

    <div class="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
      <NavigationMenuViewport
        class="relative mt-[10px] h-[var(--reka-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-xl bg-white-12 transition-[width,height] duration-300 shadow-sm"
      />
    </div>
  </NavigationMenuRoot>
</template>
