<script lang="ts" setup>
import { useTableStyle } from '~/styles/table.style'

defineProps<{
  slot?: string
  data?: Array<{
    name: string
    type?: string[]
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
            <AppIcon name="lucide:circle-dot-dashed" />
            插槽 ({{ slot || 'default' }})
          </span>
        </th>
        <th :class="ui.cell()">
          参数
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
          <template v-if="item.type">
            <ProseCode v-for="type in item.type" :key="type">
              {{ type }}
            </ProseCode>
          </template>

          <p v-if="item.description" :class="item.type && 'mt-2'">
            {{ item.description }}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>
