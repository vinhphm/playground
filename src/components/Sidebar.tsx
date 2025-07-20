import {
  BarChartOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useSidebar } from '../layouts/DashboardLayout'

export function Sidebar() {
  const { isCollapsed, toggleCollapse } = useSidebar()

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  const menuItems = [
    {
      to: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      to: '/tables',
      icon: <TableOutlined />,
      label: 'Data Tables',
    },
    {
      to: '/analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      to: '/users',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      to: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ]

  return (
    <aside className="drawer-side">
      <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
      <div className={`menu min-h-full bg-base-200 transition-all duration-300 ${isCollapsed ? 'w-20 p-1' : 'w-64 p-4'} flex flex-col`}>
        <div className={`mb-6 ${isCollapsed ? 'text-center' : ''}`}>
          <Link to="/" className={`btn btn-ghost text-xl ${isCollapsed ? 'w-16 h-12 mx-auto flex justify-center items-center rounded-lg' : 'w-full justify-start'}`}>
            {isCollapsed ? 'D' : 'Dashboard'}
          </Link>
        </div>

        <ul className={`menu flex-1 ${isCollapsed ? 'w-full p-0' : 'w-full'}`}>
          {menuItems.map(item => (
            <li key={item.to} className={isCollapsed ? 'tooltip tooltip-right w-full' : ''} data-tip={isCollapsed ? item.label : undefined}>
              <Link
                to={item.to}
                className={`[&.active]:bg-primary [&.active]:text-primary-content ${isCollapsed ? 'flex justify-center items-center w-16 h-12 mx-auto mb-1 rounded-lg' : ''}`}
              >
                <span className={isCollapsed ? 'text-lg' : ''}>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-2">
          <button
            onClick={toggleTheme}
            className={`btn btn-ghost ${isCollapsed ? 'w-16 h-12 mx-auto flex justify-center items-center rounded-lg' : 'w-full'}`}
            title={isCollapsed ? 'Toggle theme' : 'Toggle theme'}
          >
            {theme === 'light' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            )}
            {!isCollapsed && <span className="ml-2">{theme === 'light' ? 'Dark' : 'Light'}</span>}
          </button>

          <button
            onClick={toggleCollapse}
            className={`btn btn-ghost ${isCollapsed ? 'w-16 h-12 mx-auto flex justify-center items-center rounded-lg' : 'w-full'}`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <MenuUnfoldOutlined className="text-lg" />
            ) : (
              <>
                <MenuFoldOutlined />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
