<script lang="ts" setup>
import type { PaginationEmits, PaginationProps } from './pagination.props'
import { reactiveOmit } from '@vueuse/core'
import { PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, PaginationRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { usePaginationStyle } from './pagination.style'

const props = withDefaults(defineProps<PaginationProps>(), {
  firstPageIcon: 'lucide:chevrons-left',
  prevPageIcon: 'left',
  nextPageIcon: 'right',
  lastPageIcon: 'lucide:chevrons-right',
  ellipsisIcon: 'more',
  variant: 'solid',
  size: 'md',
  radius: 'sm',
  align: 'start',
  itemsPerPage: 10,
  siblingCount: 2,
  showTotal: false,
  showMoreControls: false,
  simple: false,
  showEdges: true,
})

const emits = defineEmits<PaginationEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'variant', 'size', 'radius', 'align', 'showTotal', 'showMoreControls', 'simple', 'to', 'ellipsisIcon', 'firstPageIcon', 'prevPageIcon', 'nextPageIcon', 'lastPageIcon')
const forwarded = useForwardPropsEmits(delegated, emits)

const { t } = useLocale()

const ui = computed(() => usePaginationStyle(props))
</script>

<template>
  <PaginationRoot
    v-slot="{ page, pageCount }"
    v-bind="forwarded"
    data-slot="pagination"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <slot name="start" />
    <span v-if="showTotal" data-slot="pagination-total" :class="cn(ui.total(), props.ui?.total)">
      <slot name="total" v-bind="{ total }">
        {{ t('pagination.total', { total: total || 0 }) }}
      </slot>
    </span>
    <PaginationList v-slot="{ items }" data-slot="pagination-list" :class="cn(ui.list(), props.ui?.list)">
      <PaginationFirst
        v-if="showMoreControls"
        data-slot="pagination-item"
        :aria-label="t('pagination.first')"
        :class="cn(ui.item(), props.ui?.item)"
        @click="to?.(1)"
      >
        <slot name="first">
          <Icon :name="firstPageIcon" />
        </slot>
      </PaginationFirst>
      <PaginationPrev
        data-slot="pagination-item"
        :aria-label="t('pagination.prev')"
        :class="cn(ui.item(), props.ui?.item)"
        @click="() => page > 1 ? to?.(page - 1) : undefined"
      >
        <slot name="prev">
          <Icon :name="prevPageIcon" />
        </slot>
      </PaginationPrev>
      <div v-if="simple" data-slot="pagination-pager" :class="cn(ui.content(), props.ui?.content)">
        <span>{{ page }}</span>
        <span>/</span>
        <span>{{ pageCount }}</span>
      </div>
      <template v-else>
        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            data-slot="pagination-item"
            :class="cn(ui.item(), props.ui?.item)"
            @select="to?.(item.value)"
          >
            <slot name="item" v-bind="{ item, index, page, pageCount }">
              {{ item.value }}
            </slot>
          </PaginationListItem>
          <PaginationEllipsis
            v-else
            :key="item.type"
            data-slot="pagination-ellipsis"
            :class="cn(ui.ellipsis(), props.ui?.ellipsis)"
          >
            <slot name="ellipsis">
              <Icon :name="ellipsisIcon" />
            </slot>
          </PaginationEllipsis>
        </template>
      </template>
      <PaginationNext
        data-slot="pagination-item"
        :aria-label="t('pagination.next')"
        :class="cn(ui.item(), props.ui?.item)"
        @click="() => page < pageCount ? to?.(page + 1) : undefined"
      >
        <slot name="next">
          <Icon :name="nextPageIcon" />
        </slot>
      </PaginationNext>
      <PaginationLast
        v-if="showMoreControls"
        data-slot="pagination-item"
        :aria-label="t('pagination.last')"
        :class="cn(ui.item(), props.ui?.item)"
        @click="to?.(pageCount)"
      >
        <slot name="last">
          <Icon :name="lastPageIcon" />
        </slot>
      </PaginationLast>
    </PaginationList>
    <slot name="end" />
  </PaginationRoot>
</template>
