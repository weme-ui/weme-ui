<script lang="ts" setup>
defineProps<{
  data?: Array<{
    name: string
    type?: string[]
    default?: string
    required?: boolean
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
            <ProseIcon name="lucide:list" /> 属性
          </span>
        </ProseTh>
        <ProseTh width="20%">
          默认值
        </ProseTh>
        <ProseTh>类型</ProseTh>
      </ProseTr>
    </ProseThead>

    <tbody>
      <ProseTr v-for="(row, index) of data" :key="index">
        <ProseTd>
          <span class="flex-(~ y-center) gap-x-2">
            <ProseCode class="bg-primary-3">{{ row.name }}</ProseCode>
            <sup v-if="row.required" class="c-error">*</sup>
          </span>
        </ProseTd>

        <ProseTd>
          <ProseCode v-if="row.default">
            {{ row.default }}
          </ProseCode>
          <span v-else>
            -
          </span>
        </ProseTd>

        <ProseTd>
          <div class="flex gap-x-2">
            <ProseCode v-for="type in row.type" :key="type" :class="row.description && 'mb-2'">
              {{ type }}
            </ProseCode>
          </div>

          <ClientOnly>
            <MDC v-if="row.description" :value="row.description || ''" unwrap="p" tag="p" class="text-sm" />
          </ClientOnly>
        </ProseTd>
      </ProseTr>
    </tbody>
  </ProseTable>
</template>
