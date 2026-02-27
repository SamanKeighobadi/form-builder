
import type {
  FormField,
  InputField,
  RadioField,
  RadioOption,
  CheckboxField,
  CheckboxOption,
} from '@/types/form'
import { INPUT_TYPES } from '@/lib/formBuilderUtils'

function generateId(): string {
  return crypto.randomUUID?.() ?? `o-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

interface FieldEditorProps {
  field: FormField
  onUpdate: (field: FormField) => void
  onRemove: () => void
}

export function FieldEditor({ field, onUpdate, onRemove }: FieldEditorProps) {
  const baseLabel = (
    <div className="grid gap-2">
      <label className="text-sm font-medium">برچسب فیلد</label>
      <input
        type="text"
        value={field.label}
        onChange={(e) => onUpdate({ ...field, label: e.target.value })}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder="برچسب"
      />
    </div>
  )
  const requiredToggle = (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={field.required}
        onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
        className="rounded border-input"
      />
      اجباری
    </label>
  )

  if (field.kind === 'input') {
    return (
      <FieldCard title="ورودی (Input)" onRemove={onRemove}>
        {baseLabel}
        <div className="grid gap-2">
          <label className="text-sm font-medium">نوع ورودی</label>
          <select
            value={field.inputType}
            onChange={(e) =>
              onUpdate({ ...field, inputType: e.target.value as InputField['inputType'] })
            }
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {INPUT_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {requiredToggle}
      </FieldCard>
    )
  }

  if (field.kind === 'textarea') {
    return (
      <FieldCard title="متن چندخطی (Textarea)" onRemove={onRemove}>
        {baseLabel}
        <p className="text-sm text-muted-foreground">
          سطرها: {field.rows}، ستون‌ها: {field.cols} (ثابت)
        </p>
        {requiredToggle}
      </FieldCard>
    )
  }

  if (field.kind === 'checkbox') {
    return (
      <CheckboxFieldEditor field={field} onUpdate={onUpdate} onRemove={onRemove} />
    )
  }

  if (field.kind === 'radio') {
    return (
      <RadioFieldEditor field={field} onUpdate={onUpdate} onRemove={onRemove} />
    )
  }

  return null
}

function CheckboxFieldEditor({
  field,
  onUpdate,
  onRemove,
}: {
  field: CheckboxField
  onUpdate: (f: FormField) => void
  onRemove: () => void
}) {
  function updateOptions(updater: (opts: CheckboxOption[]) => CheckboxOption[]) {
    onUpdate({ ...field, options: updater(field.options) })
  }

  function setOptionLabel(index: number, label: string) {
    updateOptions((opts) =>
      opts.map((o, i) => (i === index ? { ...o, label } : o))
    )
  }

  function addOption() {
    updateOptions((opts) => [...opts, { id: generateId(), label: '' }])
  }

  function removeOption(id: string) {
    const next = field.options.filter((o) => o.id !== id)
    if (next.length < 2) return
    onUpdate({ ...field, options: next })
  }

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">چک‌باکس (Checkbox)</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:underline"
          aria-label="حذف فیلد"
        >
          حذف
        </button>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">برچسب فیلد</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate({ ...field, label: e.target.value })}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="برچسب"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">گزینه‌ها (حداقل ۲)</label>
            <button
              type="button"
              onClick={addOption}
              className="text-sm text-primary hover:underline"
            >
              + افزودن چک‌باکس
            </button>
          </div>
          {field.options.map((opt, index) => (
            <div
              key={opt.id}
              className="flex flex-wrap items-center gap-2 rounded border border-input/50 bg-background/50 p-2"
            >
              <input
                type="text"
                value={opt.label}
                onChange={(e) => setOptionLabel(index, e.target.value)}
                placeholder={`گزینه ${index + 1}`}
                className="flex-1 min-w-0 rounded border border-input bg-background px-2 py-1 text-sm"
              />
              <button
                type="button"
                onClick={() => removeOption(opt.id)}
                disabled={field.options.length <= 2}
                className="text-red-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="حذف گزینه"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
            className="rounded border-input"
          />
          اجباری
        </label>
      </div>
    </div>
  )
}

function FieldCard({
  title,
  children,
  onRemove,
}: {
  title: string
  children: React.ReactNode
  onRemove: () => void
}) {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:underline"
          aria-label="حذف فیلد"
        >
          حذف
        </button>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  )
}

function RadioFieldEditor({
  field,
  onUpdate,
  onRemove,
}: {
  field: RadioField
  onUpdate: (f: FormField) => void
  onRemove: () => void
}) {
  function updateOptions(updater: (opts: RadioOption[]) => RadioOption[]) {
    onUpdate({ ...field, options: updater(field.options) })
  }

  function setOptionLabel(index: number, label: string) {
    updateOptions((opts) =>
      opts.map((o, i) => (i === index ? { ...o, label } : o))
    )
  }

  function setDefaultOption(index: number) {
    updateOptions((opts) =>
      opts.map((o, i) => ({ ...o, isDefault: i === index }))
    )
  }

  function addOption() {
    updateOptions((opts) => [
      ...opts,
      { id: generateId(), label: '', isDefault: false },
    ])
  }

  function removeOption(id: string) {
    const next = field.options.filter((o) => o.id !== id)
    if (next.length < 2) return
    const hadDefault = next.some((o) => o.isDefault)
    if (!hadDefault) next[0] = { ...next[0], isDefault: true }
    onUpdate({ ...field, options: next })
  }

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">دکمه رادیویی (Radio)</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:underline"
          aria-label="حذف فیلد"
        >
          حذف
        </button>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">برچسب فیلد</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate({ ...field, label: e.target.value })}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="برچسب"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">گزینه‌ها (حداقل ۲)</label>
            <button
              type="button"
              onClick={addOption}
              className="text-sm text-primary hover:underline"
            >
              + افزودن گزینه
            </button>
          </div>
          {field.options.map((opt, index) => (
            <div
              key={opt.id}
              className="flex flex-wrap items-center gap-2 rounded border border-input/50 bg-background/50 p-2"
            >
              <input
                type="text"
                value={opt.label}
                onChange={(e) => setOptionLabel(index, e.target.value)}
                placeholder={`گزینه ${index + 1}`}
                className="flex-1 min-w-0 rounded border border-input bg-background px-2 py-1 text-sm"
              />
              <label className="flex items-center gap-1 text-sm whitespace-nowrap">
                <input
                  type="radio"
                  name={`default-${field.id}`}
                  checked={opt.isDefault}
                  onChange={() => setDefaultOption(index)}
                  className="border-input"
                />
                پیش‌فرض
              </label>
              <button
                type="button"
                onClick={() => removeOption(opt.id)}
                disabled={field.options.length <= 2}
                className="text-red-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="حذف گزینه"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
            className="rounded border-input"
          />
          اجباری
        </label>
      </div>
    </div>
  )
}
