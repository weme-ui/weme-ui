<script lang="ts" setup>
import { useTableStyle } from '~/styles/table.style'

defineProps<{
  data?: Array<{
    name: string
    type?: string[]
    default?: string
    description?: string
    required?: boolean
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
            <AppIcon name="lucide:list" />
            属性
          </span>
        </th>
        <th :class="ui.cell()" width="20%">
          默认值
        </th>
        <th :class="ui.cell()">
          类型
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.name" :class="ui.row()">
        <td :class="ui.cell()">
          <span :class="ui.highlight()">
            {{ item.name }}
          </span>
          <sup v-if="item.required" class="text-error-9 text-4">*</sup>
        </td>
        <td :class="ui.cell()">
          <ProseCode v-if="item.default">
            {{ item.default }}
          </ProseCode>

          <span v-else>-</span>
        </td>
        <td :class="ui.cell()">
          <template v-if="item.type">
            <ProseCode v-for="type in item.type" :key="type">
              {{ type }}
            </ProseCode>
          </template>

          <span v-else>-</span>

          <p v-if="item.description" :class="item.type && 'mt-2'">
            {{ item.description }}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>
