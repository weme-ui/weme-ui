import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useGroupItems } from './use-group-items'

describe('useGroupItems', () => {
  it('wraps a flat list into a single group', () => {
    const selected = ref<string>()
    const { groupedItems, flattenedItems, selectedItem } = useGroupItems(
      [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ],
      selected,
    )

    expect(groupedItems.value).toHaveLength(1)
    expect(groupedItems.value[0]).toHaveLength(2)
    expect(flattenedItems.value.map(item => item.value)).toEqual(['apple', 'banana'])
    expect(selectedItem.value).toBeUndefined()
  })

  it('keeps nested groups as two-dimensional items', () => {
    const selected = ref<string>()
    const { groupedItems, flattenedItems } = useGroupItems(
      [
        [
          { type: 'label', label: 'Fruit', value: 'fruit-label' },
          { label: 'Apple', value: 'apple' },
        ],
        [
          { type: 'separator', value: 'sep' },
          { label: 'Carrot', value: 'carrot' },
        ],
      ],
      selected,
    )

    expect(groupedItems.value).toHaveLength(2)
    expect(flattenedItems.value.map(item => item.value)).toEqual(['apple', 'carrot'])
  })

  it('returns an empty grouping for an empty list', () => {
    const selected = ref<string>()
    const { groupedItems, flattenedItems } = useGroupItems([], selected)

    expect(groupedItems.value).toEqual([])
    expect(flattenedItems.value).toEqual([])
  })

  describe('given a selected value', () => {
    it('derives the matching item in single-select mode', () => {
      const selected = ref<string | undefined>('banana')
      const { selectedItem } = useGroupItems(
        [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ],
        selected,
      )

      expect(selectedItem.value).toMatchObject({ label: 'Banana', value: 'banana' })
    })

    it('derives matching items in multi-select mode', () => {
      const selected = ref<string[] | undefined>(['apple', 'carrot'])
      const { selectedItem } = useGroupItems<string, true>(
        [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Carrot', value: 'carrot' },
        ],
        selected,
      )

      expect(selectedItem.value?.map(item => item.value)).toEqual(['apple', 'carrot'])
    })
  })
})
