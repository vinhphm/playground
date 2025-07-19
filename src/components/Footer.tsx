export function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-4 border-t border-base-300">
      <aside>
        <p className="text-sm">
          Copyright ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          - Dashboard App Built with TanStack Start & DaisyUI
        </p>
      </aside>
    </footer>
  )
}
