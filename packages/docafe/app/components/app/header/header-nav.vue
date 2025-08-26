<script lang="ts" setup>
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'reka-ui'
import { useAppHeaderNavStyle } from './header-nav.style'

defineProps<{
  nav?: DocafeConfigNavItem[]
}>()

const ui = useAppHeaderNavStyle()
</script>

<template>
  <NavigationMenuRoot :class="ui.root()">
    <NavigationMenuList :class="ui.list()">
      <NavigationMenuItem v-for="item in nav" :key="item.label" :class="ui.item()">
        <template v-if="item.children && item.children.length">
          <NavigationMenuTrigger :class="ui.trigger()">
            <span>{{ item.label }}</span>

            <AppIcon name="down" :class="ui.triggerIcon()" />
          </NavigationMenuTrigger>

          <NavigationMenuContent :class="ui.content()">
            <NavigationMenuList :class="ui.subList()">
              <NavigationMenuItem v-for="child in item.children" :key="child.to">
                <NavigationMenuLink :class="ui.subListLink()" :href="child.to" :rel="child.rel">
                  <UiIconBox v-if="child.icon" :name="child.icon" size="lg" variant="outline" radius="md" :class="ui.subListLinkIcon()" />

                  <div class="flex-(~ 1 col) gap-y-1">
                    <strong :class="ui.subListLinkLabel()">
                      {{ child.label }}
                      <AppIcon v-if="child.target === '_blank'" name="external" :class="ui.linkExternalIcon()" />
                    </strong>
                    <p v-if="child.description" :class="ui.subListLinkDescription()">
                      {{ child.description }}
                    </p>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenuContent>
        </template>

        <template v-else>
          <NavigationMenuLink :class="ui.link()" :href="item.to" :rel="item.rel" :target="item.target">
            <AppIcon v-if="item.icon" :name="item.icon" :class="ui.linkIcon()" />
            <span>{{ item.label }}</span>

            <AppIcon
              v-if="item.rel === 'noopener noreferrer'"
              name="external"
              :class="ui.linkExternalIcon()"
            />
          </NavigationMenuLink>
        </template>
      </NavigationMenuItem>
    </NavigationMenuList>

    <div :class="ui.viewportWrapper()">
      <NavigationMenuViewport :class="ui.viewport()" />
    </div>
  </NavigationMenuRoot>
</template>
