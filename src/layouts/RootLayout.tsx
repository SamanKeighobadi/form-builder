import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/layout/AppSidebar'

export function RootLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  )
}
