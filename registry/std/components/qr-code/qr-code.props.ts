import type QRCode from 'qrcode'

export interface QrCodeProps {
  value: string
  options?: QRCode.QRCodeToDataURLOptions
  class?: any
}
