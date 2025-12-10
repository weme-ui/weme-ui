import type { VNode } from 'vue'

export function getChildrenSlots(children?: VNode[]) {
  if (children?.length) {
    children = children.flatMap((child: any) => {
      if (typeof child.type === 'symbol') {
        if (typeof child.type === 'string' || !child.props?.value) {
          // eslint-disable-next-line array-callback-return
          return
        }
        return child.children
      }
      return child
    }).filter(Boolean)
  }

  return children || []
}
