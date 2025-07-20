import type {
  ColumnDef,
  GroupingState,
} from '@tanstack/react-table'

import type { User } from '../utils/api'
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
            cell: info => info.getValue(),
          },
          {
            accessorKey: 'username',
            header: 'Username',
            cell: info => info.getValue(),
          },
          {
            accessorKey: 'email',
            header: 'Email',
            cell: info => (
              <a href={`mailto:${info.getValue()}`} className="link link-primary">
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
            cell: info => info.getValue(),
          },
          {
            accessorKey: 'website',
            header: 'Website',
            cell: info => (
              <a href={`https://${info.getValue()}`} target="_blank" rel="noopener noreferrer" className="link link-secondary">
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
            cell: info => info.getValue(),
          },
          {
            accessorKey: 'address.street',
            header: 'Street',
            cell: info => info.getValue(),
          },
          {
            accessorKey: 'address.zipcode',
            header: 'Zipcode',
            cell: info => info.getValue(),
          },
        ],
      },
      {
        header: 'Company',
        columns: [
          {
            accessorKey: 'company.name',
            header: 'Company',
            cell: info => info.getValue(),
          },
          {
            accessorKey: 'company.catchPhrase',
            header: 'Catch Phrase',
            cell: info => (
              <span className="italic text-sm">
                "
                {info.getValue() as string}
                "
              </span>
            ),
          },
        ],
      },
    ],
    [],
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
            <div className="flex items-center justify-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
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
              <button className="btn btn-sm" onClick={handleRefresh}>
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
        <p>Interactive table with real user data from JSONPlaceholder API, featuring grouping and pagination.</p>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <div className="flex items-center gap-2">
                              {header.column.getCanGroup() ? (
                                <div
                                  className="tooltip"
                                  data-tip={header.column.getIsGrouped() ? 'Ungroup' : 'Group'}
                                >
                                  <button
                                    className="btn btn-ghost btn-sm"
                                    {...{
                                      onClick: header.column.getToggleGroupingHandler(),
                                      style: {
                                        cursor: 'pointer',
                                      },
                                    }}
                                  >
                                    <DeploymentUnitOutlined className={header.column.getIsGrouped() ? 'text-success' : ''} />
                                    {header.column.getIsGrouped()
                                      ? `(${header.column.getGroupedIndex()}) `
                                      : ``}
                                  </button>
                                </div>
                              ) : null}
                              {' '}
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </div>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className={`${cell.getIsGrouped() ? 'bg-success/20' : cell.getIsPlaceholder() ? 'bg-base-200' : ''} ${cell.getIsAggregated() ? 'font-bold' : ''}`}
                          >
                            {cell.getIsGrouped() ? (
                              <>
                                <button
                                  className="btn btn-ghost btn-sm"
                                  {...{
                                    onClick: row.getToggleExpandedHandler(),
                                    style: {
                                      cursor: row.getCanExpand()
                                        ? 'pointer'
                                        : 'normal',
                                    },
                                  }}
                                >
                                  {row.getIsExpanded() ? <MinusCircleOutlined /> : <PlusCircleOutlined />}
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                  {' '}
                                  (
                                  {row.subRows.length}
                                  )
                                </button>
                              </>
                            ) : cell.getIsAggregated() ? (
                              flexRender(
                                cell.column.columnDef.aggregatedCell
                                ?? cell.column.columnDef.cell,
                                cell.getContext(),
                              )
                            ) : cell.getIsPlaceholder() ? null : (
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )
                            )}
                          </td>
                        )
                      })}
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
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <DoubleLeftOutlined />
              </button>
              <button
                className="btn btn-sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <LeftOutlined />
              </button>
              <button
                className="btn btn-sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <RightOutlined />
              </button>
              <button
                className="btn btn-sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <DoubleRightOutlined />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1}
                {' '}
                of
                {' '}
                {table.getPageCount()}
              </strong>
            </div>

            <div className="flex items-center gap-2">
              | Go to page:
              <input
                className="input input-bordered input-sm w-20"
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
              />
            </div>

            <select
              className="select select-sm select-bordered w-32"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[5, 10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show
                  {' '}
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              {table.getRowModel().rows.length}
              {' '}
              Rows
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-sm btn-outline" onClick={() => rerender()}>Force Rerender</button>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleRefresh}
                disabled={refreshMutation.isPending}
              >
                {refreshMutation.isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <ReloadOutlined />
                )}
                Refresh Data
              </button>
            </div>
          </div>

          <div className="prose max-w-full">
            <details className="collapse collapse-arrow bg-base-200">
              <summary className="collapse-title text-lg font-medium">
                Current Grouping State
              </summary>
              <div className="collapse-content">
                <pre className="text-sm">{JSON.stringify(grouping, null, 2)}</pre>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
