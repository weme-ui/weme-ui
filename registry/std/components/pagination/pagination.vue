<script lang="ts" setup>
import type { PaginationEmits, PaginationProps } from './pagination.props'
import { reactiveOmit } from '@vueuse/core'
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { usePaginationStyle } from './pagination.style'

const props = withDefaults(defineProps<PaginationProps>(), {
  variant: 'solid',
  align: 'end',
  size: 'md',
  itemsPerPage: 10,
  siblingCount: 2,
  showTotal: false,
  showEdges: true,
})

const emits = defineEmits<PaginationEmits>()

const delegated = reactiveOmit(props, 'class', 'ui', 'variant', 'align', 'size', 'showTotal', 'simple')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => usePaginationStyle(props))
</script>

<template>
  <PaginationRoot v-slot="{ page, pageCount }" v-bind="forwarded" :class="ui.base({ class: cn(props.class, props.ui?.base) })">
    <div v-if="showTotal" :class="ui.total({ class: props.ui?.total })">
      <slot name="total" v-bind="{ page, pageCount, total }">
        共 {{ total }} 条数据
      </slot>
    </div>

    <PaginationList v-slot="{ items }" :class="ui.list({ class: props.ui?.list })">
      <PaginationFirst v-if="showMore" :class="ui.item({ class: props.ui?.item })" @click="to?.(1)">
        <slot name="first">
          <Icon name="lucide:chevrons-left" />
        </slot>
      </PaginationFirst>

      <PaginationPrev :class="ui.item({ class: props.ui?.item })" @click="() => page > 1 ? to?.(page - 1) : undefined">
        <slot name="prev">
          <Icon name="left" />
        </slot>
      </PaginationPrev>

      <template v-if="simple">
        {{ page }} / {{ pageCount }}
      </template>

      <template v-else>
        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            :class="ui.item({ class: props.ui?.item })"
            @select="to?.(item.value)"
          >
            <slot name="item" v-bind="{ item, index, page, pageCount }">
              {{ item.value }}
            </slot>
          </PaginationListItem>

          <PaginationEllipsis v-else :key="item.type" :class="ui.ellipsis({ class: props.ui?.ellipsis })">
            <slot name="ellipsis">
              <Icon name="more" />
            </slot>
          </PaginationEllipsis>
        </template>
      </template>

      <PaginationNext :class="ui.item({ class: props.ui?.item })" @click="() => page < pageCount ? to?.(page + 1) : undefined">
        <slot name="next">
          <Icon name="right" />
        </slot>
      </PaginationNext>

      <PaginationLast v-if="showMore" :class="ui.item({ class: props.ui?.item })" @click="to?.(pageCount)">
        <slot name="last">
          <Icon name="lucide:chevrons-right" />
        </slot>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
