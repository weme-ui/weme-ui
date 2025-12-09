<script lang="ts" setup>
defineProps<{
  data?: Array<{
    name: string
    value?: string[]
    description?: string
  }>
}>()
</script>

<template>
  <ProseTable>
    <ProseThead>
      <ProseTr>
        <ProseTh width="30%">
          <span class="flex-(~ y-center) gap-x-2">
            <ProseIcon name="lucide:between-horizontal-end" /> Data 参数
          </span>
        </ProseTh>
        <ProseTh>值</ProseTh>
      </ProseTr>
    </ProseThead>

    <tbody>
      <ProseTr v-for="(row, index) of data" :key="index">
        <ProseTd>
          <ProseCode class="bg-primary-3">
            [{{ row.name }}]
          </ProseCode>
        </ProseTd>

        <ProseTd>
          <div class="flex gap-x-2">
            <ProseCode v-for="value in row.value" :key="value" :class="row.description && 'mb-2'">
              {{ value }}
            </ProseCode>
          </div>

          <ClientOnly>
            <MDC v-if="row.description" :value="row.description" unwrap="p" tag="p" class="text-sm" />
          </ClientOnly>
        </ProseTd>
      </ProseTr>
    </tbody>
  </ProseTable>
</template>
