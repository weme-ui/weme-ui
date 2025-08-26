<script lang="ts" setup>
import { useTableStyle } from '~/styles/table.style'

defineProps<{
  name?: string
  description?: string
  data?: Array<{
    name: string
    description?: string
  }>
}>()

const ui = useTableStyle()
</script>

<template>
  <table :class="ui.base()">
    <thead :class="ui.header()">
      <tr>
        <th :class="ui.cell()" width="20%">
          <span class="flex-(~ y-center) gap-x-2">
            <AppIcon name="lucide:logs" />
            {{ name || '数据' }}
          </span>
        </th>
        <th :class="ui.cell()">
          {{ description || '描述' }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.name" :class="ui.row()">
        <td :class="ui.cell()">
          <span :class="ui.highlight()">
            {{ item.name }}
          </span>
        </td>
        <td :class="ui.cell()">
          <p v-if="item.description">
            {{ item.description }}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>
