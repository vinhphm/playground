import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import { Link } from '@tanstack/react-router'

export function Header() {
  const initialTheme = typeof window !== 'undefined' ? window.localStorage.getItem('theme') || 'light' : 'light'
  const [theme, setTheme] = useState(initialTheme)

  const handleThemeChange = () => {
    if (typeof window !== 'undefined') {
      const currentTheme = window.localStorage.getItem('theme')
      setTheme(currentTheme === 'dark' ? 'dark' : 'light')
    }
  }

  useEffect(() => {
    themeChange(false)
    return () => {
      themeChange(false)
    }
  }, [])

  return (
    <header className="navbar bg-base-100 border-b border-base-200 px-4">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Dashboard
        </Link>
      </div>
      <div className="navbar-center">
        <nav className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="[&.active]:bg-primary [&.active]:text-primary-content">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tables" className="[&.active]:bg-primary [&.active]:text-primary-content">
                Tables
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="[&.active]:bg-primary [&.active]:text-primary-content">
                Analytics
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="navbar-end">
        <button
          data-toggle-theme="dark,light"
          onClick={handleThemeChange}
          className="btn btn-ghost"
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
        </button>
      </div>
    </header>
  )
}