import { useState } from 'react'
import { MainContent } from '@/components/layout/MainContent'
import { getStoredForms } from '@/lib/storage'
import { FormCreate } from './FormCreate'

export function Dashboard() {
  const [forms] = useState(() => getStoredForms())

  return (
    <MainContent>
      <h1 className="mb-4 text-2xl font-bold">داشبورد</h1>
      <p className="mb-6 text-muted-foreground">
        به فرم‌بیلدر خوش آمدید. از منوی کنار می‌توانید فرم‌های خود را مدیریت کنید.
      </p>

      {forms.length === 0 ? (
        <p className="rounded-lg border border-dashed bg-card p-8 text-center text-muted-foreground">
          هنوز فرمی ذخیره نشده. از منو «ساخت فرم جدید» را انتخاب کنید.
        </p>
      ) : (
        <ul className="grid gap-4 list-none p-0 m-0 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <li key={form.id}>
              <article className="rounded-lg border bg-card p-4 h-full flex flex-col">
                <h2 className="text-lg font-semibold mb-1">{form.name}</h2>
                {form.description ? (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                    {form.description}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mb-3 flex-1">بدون توضیحات</p>
                )}
                <p className="text-sm text-muted-foreground mt-auto">
                  تعداد فیلدها: {form.fields.length}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}

      <FormCreate />
    </MainContent>
  )
}
