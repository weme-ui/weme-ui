<script lang="ts" setup>
defineProps<{
  data?: Array<{
    name: string
    payload?: string[]
    description?: string
  }>
}>()
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh width="20%">
          <span class="flex-(~ y-center) gap-x-2">
            <ProseIcon name="lucide:circle-dot-dashed" /> 插槽
          </span>
        </ProseTh>
        <ProseTh>参数</ProseTh>
      </ProseTr>
    </ProseThead>

    <tbody>
      <ProseTr v-for="(row, index) of data" :key="index">
        <ProseTd>
          <ProseCode>{{ row.name }}</ProseCode>
        </ProseTd>

        <ProseTd>
          <div class="flex gap-x-2">
            <ProseCode v-for="payload in row.payload" :key="payload" :class="row.description && 'mb-2'">
              {{ payload }}
            </ProseCode>
          </div>

          <MDC v-if="row.description" :value="row.description" unwrap="p" tag="p" class="text-sm" />
        </ProseTd>
      </ProseTr>
    </tbody>
  </ProseTable>
</template>
