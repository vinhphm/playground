export function Footer() {
  return (
    <footer className="footer footer-center border-base-300 border-t bg-base-200 p-4 text-base-content">
      <aside>
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} - Dashboard App Built with
          TanStack Start & DaisyUI
        </p>
      </aside>
    </footer>
  )
}
