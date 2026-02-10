export type ParsedMetricText = {
  prefix: string
  suffix: string
  value: number
  decimals: number
}

/**
 * 从“带单位/符号”的展示文本中解析数值部分。
 * 示例：
 * - '￥ 1,452 亿' -> { prefix:'￥ ', value:1452, suffix:' 亿', decimals:0 }
 * - '48.7%' -> { prefix:'', value:48.7, suffix:'%', decimals:1 }
 */
export function parseMetricText(text: string): ParsedMetricText | null {
  const raw = String(text ?? '')
  const match = raw.match(/-?\d[\d,]*(?:\.\d+)?/)
  if (!match || match.index === undefined) return null

  const numberText = match[0]
  const value = Number.parseFloat(numberText.replace(/,/g, ''))
  if (!Number.isFinite(value)) return null

  const dotIndex = numberText.indexOf('.')
  const decimals = dotIndex >= 0 ? numberText.length - dotIndex - 1 : 0

  return {
    prefix: raw.slice(0, match.index),
    suffix: raw.slice(match.index + numberText.length),
    value,
    decimals
  }
}

export function formatMetricText(parsed: ParsedMetricText, value: number): string {
  const maximumFractionDigits = Math.max(0, parsed.decimals)
  const minimumFractionDigits = maximumFractionDigits
  const formatted = value.toLocaleString('zh-CN', {
    minimumFractionDigits,
    maximumFractionDigits
  })
  return `${parsed.prefix}${formatted}${parsed.suffix}`
}

