import type { FormData, StoredForm } from '@/types/form'

const FORMS_STORAGE_KEY = 'form-builder-forms'

function generateId(): string {
  return crypto.randomUUID?.() ?? `form-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getStoredForms(): StoredForm[] {
  try {
    const raw = localStorage.getItem(FORMS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredForm[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function setStoredForms(forms: StoredForm[]): void {
  try {
    localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(forms))
  } catch {
    // ignore
  }
}

export function saveForm(data: FormData): StoredForm {
  const stored: StoredForm = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  const forms = getStoredForms()
  forms.push(stored)
  setStoredForms(forms)
  return stored
}

export function deleteForm(id: string): void {
  const forms = getStoredForms().filter((f) => f.id !== id)
  setStoredForms(forms)
}
