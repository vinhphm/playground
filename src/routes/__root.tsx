/// <reference types="vite/client" />
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { ReactNode } from 'react'
import '../index.css'

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="text-center">
        <h1 className="font-bold text-6xl text-error">404</h1>
        <p className="mt-4 text-base-content/70 text-xl">Page not found</p>
        <a className="btn btn-primary mt-6" href="/">
          Go Home
        </a>
      </div>
    </div>
  )
}

function DefaultCatchBoundary({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="text-center">
        <h1 className="font-bold text-6xl text-error">Error</h1>
        <p className="mt-4 text-base-content/70 text-xl">
          Something went wrong
        </p>
        <pre className="mt-4 rounded bg-base-200 p-4 text-left text-sm">
          {error.message}
        </pre>
        <a className="btn btn-primary mt-6" href="/">
          Go Home
        </a>
      </div>
    </div>
  )
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: 'Dashboard App - TanStack Start',
        },
      ],
      links: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
    }),
    errorComponent: (props) => (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    ),
    notFoundComponent: () => <NotFound />,
    component: RootComponent,
  }
)

function RootComponent() {
  const { queryClient } = Route.useRouteContext()

  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument>
        <Outlet />
        <TanStackRouterDevtools />
      </RootDocument>
    </QueryClientProvider>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div id="root">{children}</div>
        <Scripts />
      </body>
    </html>
  )
}
