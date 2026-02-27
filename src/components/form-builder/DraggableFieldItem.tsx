import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { FieldEditor } from './FieldEditor'
import type { FormField } from '@/types/form'
import { cn } from '@/lib/utils'

const FORM_FIELD_TYPE = 'FORM_FIELD'

interface DragItem {
  id: string
  index: number
}

interface DraggableFieldItemProps {
  field: FormField
  index: number
  onUpdate: (updated: FormField) => void
  onRemove: () => void
  onMove: (fromIndex: number, toIndex: number) => void
}

export function DraggableFieldItem({
  field,
  index,
  onUpdate,
  onRemove,
  onMove,
}: DraggableFieldItemProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  const [{ isDragging }, dragSourceRef, dragPreviewRef] = useDrag({
    type: FORM_FIELD_TYPE,
    item: (): DragItem => ({ id: field.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, dropRef] = useDrop<DragItem>({
    accept: FORM_FIELD_TYPE,
    hover: (item) => {
      if (item.index === index) return
      onMove(item.index, index)
      item.index = index
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  function setRowRef(node: HTMLDivElement | null) {
    rowRef.current = node
    dropRef(node)
    dragPreviewRef(node)
  }

  return (
    <div
      ref={setRowRef}
      className={cn(
        'transition-opacity',
        isDragging && 'opacity-50',
        isOver && 'ring-2 ring-primary ring-offset-2 ring-offset-background rounded-lg'
      )}
    >
      <div className="flex items-start gap-2">
        <div
          ref={dragSourceRef}
          className="mt-4 flex shrink-0 cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-muted active:cursor-grabbing"
          aria-label="جابه‌جایی فیلد"
          title="برای تغییر ترتیب بکشید"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <FieldEditor
            field={field}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        </div>
      </div>
    </div>
  )
}
