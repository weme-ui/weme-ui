import type QRCode from 'qrcode'
import type { PrimitiveProps } from 'reka-ui'

export interface QrCodeProps extends PrimitiveProps {
  value: string
  options?: QRCode.QRCodeToDataURLOptions
  class?: any
}
