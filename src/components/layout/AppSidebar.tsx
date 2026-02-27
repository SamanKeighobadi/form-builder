import { useState } from 'react'
import { SidebarNav } from './SidebarNav'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        aria-label="منو"
        className="fixed left-4 top-4 z-50 rounded-md border bg-background p-2 md:hidden"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">منو</span>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-40 w-56 border-l bg-card transition-transform md:static md:z-auto md:translate-x-0',
          open ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4 md:justify-start">
          <span className="font-semibold">فرم‌بیلدر</span>
          <button
            type="button"
            className="md:hidden"
            onClick={() => setOpen(false)}
            aria-label="بستن منو"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <SidebarNav />
        </div>
      </aside>
    </>
  )
}
