import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'داشبورد' },
  { to: '/forms', label: 'لیست فرم‌های من' },
  { to: '/forms/new', label: 'ساخت فرم جدید' },
]

export function SidebarNav() {
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }: { isActive: boolean }) =>
            `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
