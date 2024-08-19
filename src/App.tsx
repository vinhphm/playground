import { useEffect, useMemo, useReducer, useState } from 'react'
import { themeChange } from 'theme-change'

import type {
  ColumnDef,
  GroupingState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  DeploymentUnitOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from '@ant-design/icons'
import type { Person } from './makeData'
import { makeData } from './makeData'

function App() {
  const rerender = useReducer(() => ({}), {})[1]
  const initialTheme = window.localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(initialTheme);

  const handleThemeChange = () => {
    const currentTheme = window.localStorage.getItem("theme");
    currentTheme === "dark" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    themeChange(false);
    return () => {
      themeChange(false);
    };
  }, []);

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Name',
        columns: [
          {
            accessorKey: 'firstName',
            header: 'First Name',
            cell: info => info.getValue(),
            /**
             * override the value used for row grouping
             * (otherwise, defaults to the value derived from accessorKey / accessorFn)
             */
            getGroupingValue: row => `${row.firstName} ${row.lastName}`,
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            header: () => <span>Last Name</span>,
            cell: info => info.getValue(),
          },
        ],
      },
      {
        header: 'Info',
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            aggregatedCell: ({ getValue }) =>
              Math.round(getValue<number>() * 100) / 100,
            aggregationFn: 'median',
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                aggregationFn: 'sum',
                // aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
              },
              {
                accessorKey: 'status',
                header: 'Status',
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                cell: ({ getValue }) =>
                  `${Math.round(getValue<number>() * 100) / 100}%`,
                aggregationFn: 'mean',
                aggregatedCell: ({ getValue }) =>
                  `${Math.round(getValue<number>() * 100) / 100}%`,
              },
            ],
          },
        ],
      },
    ],
    [],
  )

  const [data, setData] = useState(() => makeData(100000))
  const refreshData = () => setData(() => makeData(100000))

  const [grouping, setGrouping] = useState<GroupingState>([])

  const table = useReactTable({
    data,
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

  return (
    <div className="p-4 flex gap-3 flex-col">
      <div className="px-4 max-w-full prose flex justify-between">
        <h1 className="text-2xl">Table with Grouping</h1>
        <div>
          <label className="flex cursor-pointer gap-2">
          <button
              data-toggle-theme="dark,light"
              onClick={handleThemeChange}
              className="btn btn-ghost"
            >
              {theme === "light" ? (
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
          </label>
        </div>
      </div>
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
                              <DeploymentUnitOutlined style={{
                                color: header.column.getIsGrouped() ? '#0aff00' : '',
                              }}
                              />
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
                      {...{
                        key: cell.id,
                        style: {
                          background: cell.getIsGrouped()
                            ? '#0aff0050'
                            : cell.getIsPlaceholder()
                              ? 'oklch(var(--b2))'
                              : 'transparent',
                          fontWeight: cell.getIsAggregated() ? 'bold' : 'normal',
                        },
                      }}
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
            className="input input-bordered input-sm"
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
          className="select select-sm select-bordered"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          style={
            {
              width: '100px',
            }
          }
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show
              {' '}
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        {table.getRowModel().rows.length}
        {' '}
        Rows
      </div>
      <div className="flex items-center gap-2">
        <button className="btn btn-sm" onClick={() => rerender()}>Force Rerender</button>
        <button className="btn btn-sm" onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <div className="prose max-w-full">
        <pre>{JSON.stringify(grouping, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
