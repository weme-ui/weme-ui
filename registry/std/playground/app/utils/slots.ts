import type { VNode } from 'vue'
import { Comment, Fragment, isVNode } from 'vue'

export function getChildrenSlots(children?: VNode[]) {
  if (children?.length) {
    children = children.flatMap((child: any) => {
      if (isVNode(child) && child.type === Comment) {
        // eslint-disable-next-line array-callback-return
        return
      }
      if (isVNode(child) && child.type === Fragment) {
        return child.children
      }
      if (isVNode(child) && child.type === 'template') {
        return child.children
      }
      return child
    }).filter(Boolean)
  }

  return children || []
}
