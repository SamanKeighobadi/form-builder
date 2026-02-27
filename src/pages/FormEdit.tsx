import { useParams } from 'react-router-dom'
import { MainContent } from '@/components/layout/MainContent'

export function FormEdit() {
  const { id } = useParams<{ id: string }>()

  return (
    <MainContent>
      <h1 className="mb-4 text-2xl font-bold">ویرایش فرم</h1>
      <p className="text-muted-foreground">ویرایش فرم با شناسه: {id}</p>
    </MainContent>
  )
}
