import { chromium } from 'playwright'
import type { RenderOptions } from '@/types'

export async function render(html: string, options: RenderOptions = {}) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  await page.waitForLoadState('networkidle')

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm',
      ...options.margin,
    },
  })

  await browser.close()
  return pdf
}
