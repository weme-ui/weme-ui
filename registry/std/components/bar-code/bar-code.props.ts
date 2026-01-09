export interface BarCodeProps {
  /* Base */
  width?: number
  height?: number
  format?: string
  displayValue?: boolean
  fontOptions?: string
  font?: string
  text?: string
  textAlign?: string
  textPosition?: string
  textMargin?: number
  fontSize?: number
  background?: string
  lineColor?: string
  margin?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  /* Node */
  xmlDocument?: XMLDocument
  /* Code128 */
  ean128?: boolean
  /* Ean8 */
  flat?: boolean
  /* Ean13 */
  lastChar?: string

  class?: any
}
