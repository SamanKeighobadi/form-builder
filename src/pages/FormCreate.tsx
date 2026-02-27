import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { MainContent } from '@/components/layout/MainContent'
import { AddFieldDropdown } from '@/components/form-builder/AddFieldDropdown'
import { DraggableFieldItem } from '@/components/form-builder/DraggableFieldItem'
import { Button } from '@/components/ui/button'
import { createEmptyField } from '@/lib/formBuilderUtils'
import { saveForm } from '@/lib/storage'
import { showToast } from '@/lib/showToast'
import type { FormField, FormFieldKind } from '@/types/form'

interface FormCreateProps {
  /** وقتی داخل داشبورد استفاده می‌شود، بعد از ذخیره فراخوانی می‌شود و ریدایرکت انجام نمی‌شود. */
  onSaved?: () => void
}

export function FormCreate({ onSaved }: FormCreateProps) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [fields, setFields] = useState<FormField[]>([])
  const [nameError, setNameError] = useState('')

  function handleAddField(kind: FormFieldKind) {
    setFields((prev) => [...prev, createEmptyField(kind)])
  }

  function handleUpdateField(index: number, updated: FormField) {
    setFields((prev) => prev.map((f, i) => (i === index ? updated : f)))
  }

  function handleRemoveField(index: number) {
    setFields((prev) => prev.filter((_, i) => i !== index))
  }

  function handleMoveField(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return
    setFields((prev) => {
      const next = [...prev]
      const [removed] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, removed)
      return next
    })
  }

  function handleSave() {
    const trimmedName = name.trim()
    if (!trimmedName) {
      setNameError('نام فرم اجباری است.')
      return
    }
    setNameError('')
    saveForm({
      name: trimmedName,
      description: description.trim(),
      fields,
    })
    showToast('فرم با موفقیت ذخیره شد.', 'success')
    setName('')
    setDescription('')
    setFields([])
    if (onSaved) {
      onSaved()
    } else {
      navigate('/', { replace: true })
    }
  }

  const formContent = (
    <div className="space-y-6 max-w-2xl mx-auto">
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground">اطلاعات فرم</h2>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="form-name">
              نام فرم <span className="text-red-500">*</span>
            </label>
            <input
              id="form-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (nameError) setNameError('')
              }}
              required
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="نام فرم"
            />
            {nameError && (
              <p className="text-sm text-red-600" role="alert">
                {nameError}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="form-desc">
              توضیحات (اختیاری)
            </label>
            <textarea
              id="form-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm resize-y"
              placeholder="توضیحات فرم"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-medium text-muted-foreground">فیلدهای فرم</h2>
            <AddFieldDropdown onSelect={handleAddField} />
          </div>
          {fields.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center border border-dashed rounded-lg">
              هنوز فیلدی اضافه نشده. از دکمه «افزودن فیلد» نوع فیلد را انتخاب کنید.
            </p>
          ) : (
            <DndProvider backend={HTML5Backend}>
              <ul className="space-y-4 list-none p-0 m-0">
                {fields.map((field, index) => (
                  <li key={field.id}>
                    <DraggableFieldItem
                      field={field}
                      index={index}
                      onUpdate={(updated) => handleUpdateField(index, updated)}
                      onRemove={() => handleRemoveField(index)}
                      onMove={handleMoveField}
                    />
                  </li>
                ))}
              </ul>
            </DndProvider>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={handleSave}>
            ذخیره فرم
          </Button>
        </div>
      </div>
  )

  if (onSaved) {
    return formContent
  }

  return (
    <MainContent>
      <h1 className="mb-6 text-2xl font-bold text-center">ساخت فرم جدید</h1>
      {formContent}
    </MainContent>
  )
}
