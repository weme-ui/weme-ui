<script lang="ts" setup>
import { useTableStyle } from '~/styles/table.style'

defineProps<{
  data?: Array<{
    slot: string
    defaults?: string
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
            <AppIcon name="lucide:braces" />
            插槽
          </span>
        </th>
        <th :class="ui.cell()">
          默认样式
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.slot" :class="ui.row()">
        <td :class="ui.cell()">
          <span :class="ui.highlight()">
            ui.{{ item.slot }}
          </span>
        </td>
        <td :class="ui.cell()">
          <ProseCode v-if="item.defaults">
            {{ item.defaults }}
          </ProseCode>
          <span v-else>-</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
