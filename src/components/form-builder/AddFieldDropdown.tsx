import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import type { FormFieldKind } from '@/types/form'
import { FIELD_KIND_LABELS } from '@/lib/formBuilderUtils'
import { cn } from '@/lib/utils'

const KINDS: FormFieldKind[] = ['input', 'textarea', 'radio', 'checkbox']

interface AddFieldDropdownProps {
  onSelect: (kind: FormFieldKind) => void
  disabled?: boolean
}

export function AddFieldDropdown({ onSelect, disabled }: AddFieldDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function handleSelect(kind: FormFieldKind) {
    onSelect(kind)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        افزودن فیلد
        <svg
          className={cn('size-4 transition-transform', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      {open && (
        <ul
          role="listbox"
          className="absolute top-full right-0 z-10 mt-1 min-w-[12rem] list-none rounded-md border bg-card py-1 shadow-lg"
        >
          {KINDS.map((kind) => (
            <li key={kind} role="option">
              <button
                type="button"
                className="w-full px-4 py-2 text-right text-sm hover:bg-accent"
                onClick={() => handleSelect(kind)}
              >
                {FIELD_KIND_LABELS[kind]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
