'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  BarChart3, 
  FileText,
  Settings,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/journee', label: 'Nouvelle journée', icon: Truck },
  { href: '/chauffeurs', label: 'Chauffeurs', icon: Users },
  { href: '/analytics', label: 'Analytiques', icon: BarChart3 },
  { href: '/factures', label: 'Factures', icon: FileText },
]

export function AppSidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">AYN</h1>
            <p className="text-xs text-muted-foreground">All You Need</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn(
                  "relative z-10 h-5 w-5 transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        
        {/* Bottom section */}
        <div className="border-t border-border p-3">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </Link>
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
