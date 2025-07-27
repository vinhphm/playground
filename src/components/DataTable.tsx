import {
  DeploymentUnitOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  RightOutlined,
} from '@ant-design/icons'
import type { ColumnDef, GroupingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useReducer, useState } from 'react'
import { useRefreshUsers, useUsers } from '../hooks/useUsers'
import type { User } from '../utils/api'

// Helper function to get cell className
function getCellClassName(cell: any) {
  let baseClass = ''
  if (cell.getIsGrouped()) {
    baseClass = 'bg-success/20'
  } else if (cell.getIsPlaceholder()) {
    baseClass = 'bg-base-200'
  }

  const aggregatedClass = cell.getIsAggregated() ? 'font-bold' : ''
  return `${baseClass} ${aggregatedClass}`.trim()
}

// Helper function to render cell content
function renderCellContent(cell: any, row: any) {
  if (cell.getIsGrouped()) {
    return (
      <button
        className="btn btn-ghost btn-sm"
        type="button"
        {...{
          onClick: row.getToggleExpandedHandler(),
          style: {
            cursor: row.getCanExpand() ? 'pointer' : 'normal',
          },
        }}
      >
        {row.getIsExpanded() ? <MinusCircleOutlined /> : <PlusCircleOutlined />}{' '}
        {flexRender(cell.column.columnDef.cell, cell.getContext())} (
        {row.subRows.length})
      </button>
    )
  }

  if (cell.getIsAggregated()) {
    return flexRender(
      cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
      cell.getContext()
    )
  }

  if (cell.getIsPlaceholder()) {
    return null
  }

  return flexRender(cell.column.columnDef.cell, cell.getContext())
}

// Helper function to render header content
function renderHeaderContent(header: any) {
  if (header.isPlaceholder) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {header.column.getCanGroup() ? (
        <div
          className="tooltip"
          data-tip={header.column.getIsGrouped() ? 'Ungroup' : 'Group'}
        >
          <button
            className="btn btn-ghost btn-sm"
            type="button"
            {...{
              onClick: header.column.getToggleGroupingHandler(),
              style: {
                cursor: 'pointer',
              },
            }}
          >
            <DeploymentUnitOutlined
              className={header.column.getIsGrouped() ? 'text-success' : ''}
            />
            {header.column.getIsGrouped()
              ? `(${header.column.getGroupedIndex()}) `
              : ''}
          </button>
        </div>
      ) : null}{' '}
      {flexRender(header.column.columnDef.header, header.getContext())}
    </div>
  )
}

// Helper function to render a single header cell
function renderHeaderCell(header: any) {
  return (
    <th colSpan={header.colSpan} key={header.id}>
      {renderHeaderContent(header)}
    </th>
  )
}

// Helper function to render a single data cell
function renderDataCell(cell: any, row: any) {
  return (
    <td className={getCellClassName(cell)} key={cell.id}>
      {renderCellContent(cell, row)}
    </td>
  )
}

export function DataTable() {
  const rerender = useReducer(() => ({}), {})[1]
  const { data, isLoading, error } = useUsers()
  const refreshMutation = useRefreshUsers()

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'Personal Info',
        columns: [
          {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: 'username',
            header: 'Username',
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: 'email',
            header: 'Email',
            cell: (info) => (
              <a
                className="link link-primary"
                href={`mailto:${info.getValue()}`}
              >
                {info.getValue() as string}
              </a>
            ),
          },
        ],
      },
      {
        header: 'Contact',
        columns: [
          {
            accessorKey: 'phone',
            header: 'Phone',
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: 'website',
            header: 'Website',
            cell: (info) => (
              <a
                className="link link-secondary"
                href={`https://${info.getValue()}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {info.getValue() as string}
              </a>
            ),
          },
        ],
      },
      {
        header: 'Location',
        columns: [
          {
            accessorKey: 'address.city',
            header: 'City',
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: 'address.street',
            header: 'Street',
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: 'address.zipcode',
            header: 'Zipcode',
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        header: 'Company',
        columns: [
          {
            accessorKey: 'company.name',
            header: 'Company',
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: 'company.catchPhrase',
            header: 'Catch Phrase',
            cell: (info) => (
              <span className="text-sm italic">
                "{info.getValue() as string}"
              </span>
            ),
          },
        ],
      },
    ],
    []
  )

  const [grouping, setGrouping] = useState<GroupingState>([])

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  })

  const handleRefresh = () => {
    refreshMutation.mutate()
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h1>Users Data Table</h1>
          <p>Loading user data from JSONPlaceholder API...</p>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex h-64 items-center justify-center">
              <span className="loading loading-spinner loading-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h1>Users Data Table</h1>
          <p>Failed to load user data from API.</p>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="alert alert-error">
              <span>
                Error:
                {error.message}
              </span>
              <button
                className="btn btn-sm"
                onClick={handleRefresh}
                type="button"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h1>Users Data Table</h1>
        <p>
          Interactive table with real user data from JSONPlaceholder API,
          featuring grouping and pagination.
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) =>
                      renderHeaderCell(header)
                    )}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id}>
                      {row
                        .getVisibleCells()
                        .map((cell) => renderDataCell(cell, row))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <button
                className="btn btn-sm"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.setPageIndex(0)}
                type="button"
              >
                <DoubleLeftOutlined />
              </button>
              <button
                className="btn btn-sm"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                type="button"
              >
                <LeftOutlined />
              </button>
              <button
                className="btn btn-sm"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                type="button"
              >
                <RightOutlined />
              </button>
              <button
                className="btn btn-sm"
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                type="button"
              >
                <DoubleRightOutlined />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </strong>
            </div>

            <div className="flex items-center gap-2">
              | Go to page:
              <input
                className="input input-bordered input-sm w-20"
                defaultValue={table.getState().pagination.pageIndex + 1}
                max={table.getPageCount()}
                min="1"
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                type="number"
              />
            </div>

            <select
              className="select select-sm select-bordered w-32"
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
              value={table.getState().pagination.pageSize}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              {table.getRowModel().rows.length} Rows
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => rerender()}
                type="button"
              >
                Force Rerender
              </button>
              <button
                className="btn btn-sm btn-primary"
                disabled={refreshMutation.isPending}
                onClick={handleRefresh}
                type="button"
              >
                {refreshMutation.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <ReloadOutlined />
                )}
                Refresh Data
              </button>
            </div>
          </div>

          <div className="prose max-w-full">
            <details className="collapse-arrow collapse bg-base-200">
              <summary className="collapse-title font-medium text-lg">
                Current Grouping State
              </summary>
              <div className="collapse-content">
                <pre className="text-sm">
                  {JSON.stringify(grouping, null, 2)}
                </pre>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
