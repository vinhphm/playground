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
import { useSidebar } from '../layouts/DashboardLayout'

export function Sidebar() {
  const { isCollapsed, toggleCollapse } = useSidebar()

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
        {!isCollapsed && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-base-content">Navigation</h2>
          </div>
        )}

        <ul className={`menu flex-1 ${isCollapsed ? 'w-full p-0' : 'w-full'}`}>
          {menuItems.map((item) => (
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

        <div className="mt-auto">
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
