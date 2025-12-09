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
        <ProseTh width="30%">
          <span class="flex-(~ y-center) gap-x-2">
            <ProseIcon name="lucide:square-dashed-mouse-pointer" /> 事件
          </span>
        </ProseTh>
        <ProseTh>回调参数</ProseTh>
      </ProseTr>
    </ProseThead>

    <tbody>
      <ProseTr v-for="(row, index) of data" :key="index">
        <ProseTd>
          <ProseCode class="bg-primary-3">
            {{ row.name }}
          </ProseCode>
        </ProseTd>

        <ProseTd>
          <div class="flex gap-x-2">
            <ProseCode v-for="payload in row.payload" :key="payload" :class="row.description && 'mb-2'">
              {{ payload }}
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
