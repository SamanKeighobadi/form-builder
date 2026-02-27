import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MainContent } from '@/components/layout/MainContent'
import { FormCreate } from '@/pages/FormCreate'
import { getFormById } from '@/lib/storage'
import type { StoredForm } from '@/types/form'

const LOADING_DELAY_MS = 400

export function FormEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form, setForm] = useState<StoredForm | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      navigate('/', { replace: true })
      return
    }
    const found = getFormById(id)
    if (!found) {
      navigate('/', { replace: true })
      return
    }
    setLoading(true)
    const timer = setTimeout(() => {
      setForm(found)
      setLoading(false)
    }, LOADING_DELAY_MS)
    return () => clearTimeout(timer)
  }, [id, navigate])

  if (loading) {
    return (
      <MainContent>
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <div
            className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
            aria-hidden
          />
          <p className="text-sm text-muted-foreground">در حال بارگذاری فرم...</p>
        </div>
      </MainContent>
    )
  }

  if (!form) {
    return null
  }

  return (
    <MainContent>
      <h1 className="mb-6 text-2xl font-bold text-center">ویرایش فرم</h1>
      <FormCreate
        key={form.id}
        initialForm={form}
        onSaved={() => navigate('/', { replace: true })}
      />
    </MainContent>
  )
}
