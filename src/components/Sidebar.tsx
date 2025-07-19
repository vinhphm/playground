import { Link } from '@tanstack/react-router'
import {
  BarChartOutlined,
  DashboardOutlined,
  TableOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'

export function Sidebar() {
  return (
    <aside className="drawer-side">
      <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
      <div className="menu min-h-full w-64 bg-base-200 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-base-content">Navigation</h2>
        </div>
        
        <ul className="menu w-full">
          <li>
            <Link 
              to="/"
              className="[&.active]:bg-primary [&.active]:text-primary-content"
            >
              <DashboardOutlined />
              Dashboard
            </Link>
          </li>
          
          <li>
            <Link 
              to="/tables"
              className="[&.active]:bg-primary [&.active]:text-primary-content"
            >
              <TableOutlined />
              Data Tables
            </Link>
          </li>
          
          <li>
            <Link 
              to="/analytics"
              className="[&.active]:bg-primary [&.active]:text-primary-content"
            >
              <BarChartOutlined />
              Analytics
            </Link>
          </li>
          
          <li>
            <Link 
              to="/users"
              className="[&.active]:bg-primary [&.active]:text-primary-content"
            >
              <UserOutlined />
              Users
            </Link>
          </li>
          
          <li>
            <Link 
              to="/settings"
              className="[&.active]:bg-primary [&.active]:text-primary-content"
            >
              <SettingOutlined />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}