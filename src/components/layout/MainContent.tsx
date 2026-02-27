import { type ReactNode } from 'react'

export function MainContent({ children }: { children: ReactNode }) {
  return <div className="container mx-auto max-w-4xl">{children}</div>
}
