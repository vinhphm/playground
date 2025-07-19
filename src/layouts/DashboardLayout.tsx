import { ReactNode } from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Footer } from '../components/Footer'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
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
  )
}