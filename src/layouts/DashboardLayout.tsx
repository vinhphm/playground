import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

interface SidebarContextType {
  isCollapsed: boolean
  toggleCollapse: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a DashboardLayout')
  }
  return context
}

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev)
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapse }}>
      <div className="drawer lg:drawer-open">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <Header />

          <main className="flex-1 p-6 bg-base-100">
            {children}
          </main>

          <Footer />
        </div>

        <Sidebar />
      </div>
    </SidebarContext.Provider>
  )
}
