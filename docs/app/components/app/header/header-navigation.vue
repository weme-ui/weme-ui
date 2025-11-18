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
import { useHeaderNavigationStyle } from './header-navigation.style'

const props = defineProps<{
  items?: HeaderNavItem[]
  class?: any
}>()

const ui = useHeaderNavigationStyle()
</script>

<template>
  <NavigationMenuRoot :class="ui.base({ class: props.class })">
    <NavigationMenuList :class="ui.list()">
      <NavigationMenuItem v-for="item in items" :key="item.label" :class="ui.item()">
        <template v-if="item.children && item.children.length">
          <NavigationMenuTrigger :class="ui.trigger()">
            <span :class="ui.triggerLabel()">{{ item.label }}</span>
            <ProseIcon :class="ui.triggerIcon()" name="down" />
          </NavigationMenuTrigger>
          <NavigationMenuContent :class="ui.content()">
            <NavigationMenuList :class="ui.contentList()">
              <NavigationMenuItem v-for="child in item.children" :key="child.label">
                <NavigationMenuLink :href="child.to" :target="child.target" :rel="child.rel" :class="ui.contentItem()">
                  <UiIconBox v-if="child.icon" :name="child.icon" size="lg" variant="outline" radius="md" :class="ui.contentItemIcon()" />
                  <dl :class="ui.contentItemWrapper()">
                    <dt :class="ui.contentItemLabel()">
                      <span>
                        {{ child.label }}
                      </span>
                      <ProseIcon v-if="child.target === '_blank'" :class="ui.contentItemExternalIcon()" name="external" />
                    </dt>
                    <dd :class="ui.contentItemDescription()">
                      {{ child.description }}
                    </dd>
                  </dl>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenuContent>
        </template>

        <template v-else>
          <NavigationMenuLink :href="item.to" :target="item.target" :rel="item.rel" :class="ui.itemLink()">
            <ProseIcon v-if="item.icon" :name="item.icon" :class="ui.itemLinkIcon()" />
            <span :class="ui.itemLinkLabel()">{{ item.label }}</span>
            <ProseIcon v-if="item.rel === 'noopener noreferrer'" :class="ui.itemLinkExternalIcon()" name="external" />
          </NavigationMenuLink>
        </template>
      </NavigationMenuItem>
    </NavigationMenuList>

    <div :class="ui.viewportWrapper()">
      <NavigationMenuViewport :class="ui.viewport()" />
    </div>
  </NavigationMenuRoot>
</template>
