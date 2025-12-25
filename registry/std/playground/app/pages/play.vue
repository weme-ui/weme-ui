<script lang="ts" setup>
import type { DropdownItem } from '../../../components/dropdown/dropdown.props'

const openActionSheet = ref(false)

const menuItems = computed(() => ([
  [
    { label: 'Item 1', icon: 'lucide:star' },
    { type: 'separator' },
    { label: 'Item 2', icon: 'lucide:heart' },
    { type: 'separator' },
    { label: 'Item 3', icon: 'lucide:moon' },
  ],
] satisfies DropdownItem[][]))
</script>

<template>
  <Container name="UiTimer" description="🐗 Hakuna matata" default-open>
    <UiCard>
      <UiTimer />
    </UiCard>
  </Container>

  <Container name="UiLens" description="🐗 Hakuna matata">
    <UiCard>
      <UiLens :zoom="2" class="rounded-lg">
        <UiImage src="https://images.unsplash.com/photo-1713869820987-519844949a8a?q=80&amp;w=3500&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" width="500" height="500" />
      </UiLens>
    </UiCard>
  </Container>

  <Container name="UiNumberTicker" description="🐗 Hakuna matata">
    <UiCard>
      <UiNumberTicker :value="100" class="font-(mono bold) text-lg" /> <span class="text-(xs toned)">times</span>
    </UiCard>
  </Container>

  <Container name="UiQRCode" description="🐗 Hakuna matata">
    <UiCard>
      <UiQrCode value="https://weme-ui.com" :options="{ width: 180 }" />
    </UiCard>
  </Container>

  <Container name="UiMarquee" description="🐗 Hakuna matata">
    <div class="w-200">
      <UiMarquee reverse>
        <UiCard class="w-60">
          <UiSkeleton variant="text" :lines="3" />
        </UiCard>
        <UiCard class="w-60">
          <UiSkeleton variant="text" :lines="3" />
        </UiCard>
        <UiCard class="w-60">
          <UiSkeleton variant="text" :lines="3" />
        </UiCard>
        <UiCard class="w-60">
          <UiSkeleton variant="text" :lines="3" />
        </UiCard>
      </UiMarquee>
    </div>
  </Container>

  <Container name="UiSkeleton" description="🐗 Hakuna matata">
    <UiSkeleton variant="text" :lines="3" class="w-60" />
  </Container>

  <Container name="UiDropdown" description="🐗 Hakuna matata">
    <UiButtonGroup gap="none">
      <UiButton>
        Click <UiIcon name="arrowRight" />
      </UiButton>
      <UiDropdown :items="menuItems">
        <UiIconButton icon="more" variant="outline" />
      </UiDropdown>
    </UiButtonGroup>
  </Container>

  <Container name="UiContextMenu" description="🐗 Hakuna matata">
    <UiContextMenu :items="menuItems">
      <div class="rounded-lg b-(~ dashed default) bg-muted size-60 flex-(~ center)">
        Right click me
      </div>
    </UiContextMenu>
  </Container>

  <Container name="UiPopConfirm" description="🐗 Hakuna matata">
    <UiPopConfirm
      type="danger"
      icon="lucide:trash-2"
      message="Are you sure you want to delete?"
      :confirm="{ label: 'Delete', color: 'danger' }"
      :cancel="{ color: 'danger' }"
      @before-confirm="() => false"
      @confirm="console.log('confirm')"
      @cancel="console.log('cancel')"
    >
      <UiButton label="Delete" color="danger" variant="soft" />
    </UiPopConfirm>
  </Container>

  <Container name="UiActionSheet" description="🐗 Hakuna matata">
    <UiButton label="Open" @click="openActionSheet = !openActionSheet" />
    <UiActionSheet v-model="openActionSheet">
      <template #selection>
        0 Selected Items
      </template>

      <template #actions>
        <UiButton label="Action 1" />
        <UiButton label="Action 2" />
        <UiButton label="Action 3" />
      </template>
    </UiActionSheet>
  </Container>
</template>
