const CSV_COLUMNS = [
  'id',
  'title',
  'category',
  'status',
  'price',
  'brand',
  'color',
  'condition',
  'short_description',
  'featured',
  'delivery_available',
  'sort_order',
  'image_url',
  'created_at',
  'updated_at',
]

function escapeCell(value) {
  if (value == null) return ''
  const str = String(value)
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function rowsToCsv(rows) {
  const header = CSV_COLUMNS.join(',')
  const body = rows
    .map((r) => CSV_COLUMNS.map((c) => escapeCell(r[c])).join(','))
    .join('\n')
  return `${header}\n${body}\n`
}

export function downloadCsv(rows, filename = `inventario-${new Date().toISOString().slice(0, 10)}.csv`) {
  const csv = rowsToCsv(rows)
  // BOM para que Excel detecte UTF-8 correctamente.
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
