# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Management**: This project uses **bun** as the package manager.

- **Install dependencies**: `bun install`
- **Dev server**: `bun run dev` - Starts Vite development server with HMR
- **Build**: `bun run build` - TypeScript compilation followed by Vite build
- **Lint**: `bun run lint` - Run ESLint checks
- **Lint fix**: `bun run lint:fix` - Run ESLint with auto-fix
- **Preview**: `bun run preview` - Preview the built application

## Project Architecture

This is a React + TypeScript + Vite application demonstrating data table functionality with grouping capabilities.

### Core Technologies

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7 with React plugin
- **Styling**: Tailwind CSS 4 + DaisyUI components + Tailwind Typography
- **Data Table**: TanStack React Table with grouping, pagination, and expansion features
- **Icons**: Ant Design Icons
- **Theme**: DaisyUI light/dark theme switching with `theme-change` library
- **Data Generation**: Faker.js for mock data

### Application Structure

- **Main Component** (`src/App.tsx`): Single-page application featuring a complex data table with:
  - Hierarchical column grouping (Name > First/Last Name, Info > Age/Visits/Status/Progress)
  - Row grouping with expand/collapse functionality
  - Pagination controls with customizable page sizes
  - Theme switching (light/dark mode)
  - Live data refresh and force rerender capabilities

- **Data Layer** (`src/makeData.ts`): Generates mock `Person` data with nested structures using Faker.js

### Key Features

- **Theme Management**: Uses DaisyUI themes with localStorage persistence and `theme-change` library
- **Table Grouping**: Advanced grouping with aggregation functions (median, sum, mean)
- **Large Dataset Handling**: Configured to handle 100,000 rows with pagination
- **Responsive Design**: Tailwind-based responsive layout with DaisyUI components

### Configuration Files

- **TypeScript**: Separate configs for app (`tsconfig.app.json`) and Node (`tsconfig.node.json`)
- **Linting**: @antfu/eslint-config with TypeScript and React plugins
- **Styling**: Tailwind with DaisyUI plugin and typography support
