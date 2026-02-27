import type {
  FormField,
  FormFieldKind,
  InputField,
  TextareaField,
  RadioField,
  CheckboxField,
  InputType,
} from '@/types/form'

const TEXTAREA_ROWS = 4
const TEXTAREA_COLS = 50

function generateId(): string {
  return crypto.randomUUID?.() ?? `f-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function createEmptyField(kind: FormFieldKind): FormField {
  const base = {
    id: generateId(),
    label: '',
    required: false,
  }
  switch (kind) {
    case 'input':
      return { ...base, kind: 'input', inputType: 'text' } satisfies InputField
    case 'textarea':
      return { ...base, kind: 'textarea', rows: TEXTAREA_ROWS, cols: TEXTAREA_COLS } satisfies TextareaField
    case 'radio':
      return {
        ...base,
        kind: 'radio',
        options: [
          { id: generateId(), label: '', isDefault: true },
          { id: generateId(), label: '', isDefault: false },
        ],
      } satisfies RadioField
    case 'checkbox':
      return {
        ...base,
        kind: 'checkbox',
        options: [
          { id: generateId(), label: '' },
          { id: generateId(), label: '' },
        ],
      } satisfies CheckboxField
    default:
      return { ...base, kind: 'input', inputType: 'text' } satisfies InputField
  }
}

export const INPUT_TYPES: { value: InputType; label: string }[] = [
  { value: 'text', label: 'متن' },
  { value: 'password', label: 'رمز عبور' },
  { value: 'email', label: 'ایمیل' },
  { value: 'tel', label: 'تلفن' },
  { value: 'url', label: 'آدرس وب' },
  { value: 'number', label: 'عدد' },
  { value: 'search', label: 'جستجو' },
  { value: 'date', label: 'تاریخ' },
  { value: 'time', label: 'زمان' },
  { value: 'datetime-local', label: 'تاریخ و زمان' },
]

export const FIELD_KIND_LABELS: Record<FormFieldKind, string> = {
  input: 'ورودی (Input)',
  textarea: 'متن چندخطی (Textarea)',
  radio: 'دکمه رادیویی (Radio)',
  checkbox: 'چک‌باکس (Checkbox)',
}
