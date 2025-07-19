# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Management**: This project uses **bun** as the package manager.

- **Install dependencies**: `bun install`
- **Dev server**: `bun run dev` - Starts TanStack Start development server with HMR
- **Build**: `bun run build` - Build for production using TanStack Start
- **Start**: `bun run start` - Start production server
- **Lint**: `bun run lint` - Run ESLint checks
- **Lint fix**: `bun run lint:fix` - Run ESLint with auto-fix
- **Preview**: `bun run preview` - Preview the built application

## Project Architecture

This is a full-stack dashboard application built with TanStack Start, featuring advanced data tables and a modern dashboard layout.

### Core Technologies

- **Framework**: TanStack Start (full-stack React framework)
- **Frontend**: React 19 with TypeScript
- **Router**: TanStack Router with file-based routing
- **Build Tool**: Vinxi (TanStack Start's build system)
- **Styling**: Tailwind CSS 4 + DaisyUI components + Tailwind Typography
- **Data Table**: TanStack React Table with grouping, pagination, and expansion features
- **Icons**: Ant Design Icons
- **Theme**: DaisyUI light/dark theme switching with `theme-change` library
- **Data Generation**: Faker.js for mock data

### Application Structure

This dashboard application uses file-based routing with the following structure:

- **Routes** (`app/routes/`): File-based routing structure
  - `__root.tsx`: Root layout with CSS imports and document setup
  - `_dashboard.tsx`: Dashboard layout wrapper
  - `_dashboard/index.tsx`: Dashboard home page with overview stats
  - `_dashboard/tables.tsx`: Advanced data table page
  - `_dashboard/analytics.tsx`: Analytics dashboard page
  - `_dashboard/users.tsx`: User management page
  - `_dashboard/settings.tsx`: Application settings page

- **Layout Components** (`app/layouts/`):
  - `DashboardLayout.tsx`: Main dashboard layout with sidebar, header, and footer

- **Reusable Components** (`app/components/`):
  - `Header.tsx`: Top navigation with theme switching
  - `Sidebar.tsx`: Left navigation menu
  - `Footer.tsx`: Bottom footer
  - `DataTable.tsx`: Advanced data table with grouping and pagination

- **Utilities** (`app/utils/`):
  - `makeData.ts`: Generates mock `Person` data with nested structures using Faker.js

### Key Features

- **Dashboard Layout**: Responsive sidebar, header, and footer layout using DaisyUI drawer component
- **File-based Routing**: TanStack Router with automatic route generation
- **Theme Management**: DaisyUI light/dark theme switching with localStorage persistence
- **Advanced Data Table**: TanStack React Table with:
  - Hierarchical column grouping (Name > First/Last Name, Info > Age/Visits/Status/Progress)
  - Row grouping with expand/collapse functionality
  - Pagination controls with customizable page sizes
  - Live data refresh and force rerender capabilities
  - Aggregation functions (median, sum, mean)
- **Large Dataset Handling**: Configured to handle 100,000 rows with pagination
- **Responsive Design**: Tailwind-based responsive layout with DaisyUI components
- **Navigation**: Active link styling and mobile-responsive sidebar

### Configuration Files

- **TanStack Start**: `app.config.ts` - Main configuration file
- **TypeScript**: Separate configs for app (`tsconfig.app.json`) and Node (`tsconfig.node.json`)
- **Linting**: @antfu/eslint-config with TypeScript and React plugins
- **Styling**: Tailwind CSS v4 with DaisyUI plugin and typography support
- **PostCSS**: Updated to use `@tailwindcss/postcss` for v4 compatibility
