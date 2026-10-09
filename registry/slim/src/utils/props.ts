import type { VNode } from 'vue'
import { defu } from 'defu'
import { Comment, Fragment, isVNode, toRef } from 'vue'

/**
 * 转换为布尔值
 *
 * @category Utils
 *
 * @param value - 值
 * @returns 布尔值
 */
export function toBoolValue(value: any) {
  return value === '' || value === true
}

/**
 * 转换为布尔数据属性值
 *
 * @category Utils
 *
 * @param value - 值
 * @returns 布尔数据属性值
 */
export function toBoolDataAttrValue(value: any) {
  return toBoolValue(value) ? '' : undefined
}

/**
 * 是否为布尔数据属性值
 *
 * @category Utils
 *
 * @param value - 值
 * @returns 是否为布尔数据属性值
 */
export function isBoolDataAttrValue(value: unknown) {
  return value !== undefined && value !== false && value !== 'false'
}

/**
 * 转换为布尔 aria 值
 *
 * @category Utils
 *
 * @param value - 值
 * @returns 布尔 aria 值
 */
export function toBoolAriaValue(value: any) {
  return toBoolValue(value) ? true : undefined
}

/**
 * 合并到引用
 *
 * @category Utils
 *
 * @param props - 属性
 * @param defaults - 默认值
 * @returns 合并后的引用
 */
export function mergeToRef<T>(props: T | undefined | boolean, defaults: T) {
  return toRef(() => defu(
    typeof props === 'object' ? props : {},
    defaults as any,
  ) as T)
}

/**
 * 提取对象的值
 *
 * @category Utils
 *
 * @param object - 对象
 * @param path - 路径
 * @param defaultValue - 默认值
 * @returns 提取的值
 */
export function pick(
  object: Record<string, any> | undefined,
  path: (string | number)[] | string,
  defaultValue?: any,
): any {
  if (typeof path === 'string') {
    path = path.split('.').map((key) => {
      const numKey = Number(key)
      return Number.isNaN(numKey) ? key : numKey
    })
  }

  let result: any = object

  for (const key of path) {
    if (result === undefined || result === null) {
      return defaultValue
    }

    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}

/**
 * 获取子节点插槽
 *
 * @category Utils
 *
 * @param children - 子节点
 * @returns 子节点插槽
 */
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
