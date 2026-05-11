import { business } from '../data/content.js'

function cleanNumber(value) {
  return (value || '').replace(/\D/g, '')
}

export function whatsappUrl(message) {
  const num = cleanNumber(business.whatsapp)
  const base = num ? `https://wa.me/${num}` : 'https://wa.me/'
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function telUrl() {
  return business.phone ? `tel:${business.phone}` : whatsappUrl()
}

export function hasPhone() {
  return Boolean(business.phone)
}

export function hasEmail() {
  return Boolean(business.email)
}
