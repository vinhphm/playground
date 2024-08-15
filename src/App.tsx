import { useMemo, useReducer, useState } from 'react'
import { Button, Input, Select, Space } from 'antd'

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
    <div className="p-2">
      <div className="h-2" />
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {header.column.getCanGroup() ? (
                        // If the header can be grouped, let's add a toggle
                          <Button
                            type="text"
                            icon={(
                              <DeploymentUnitOutlined style={{
                                color: header.column.getIsGrouped() ? '#0aff00' : '',
                              }}
                              />
                            )}
                            {...{
                              onClick: header.column.getToggleGroupingHandler(),
                              style: {
                                cursor: 'pointer',
                              },
                            }}
                          >
                            {header.column.getIsGrouped()
                              ? `(${header.column.getGroupedIndex()}) `
                              : ``}
                          </Button>
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
                            ? '#0aff0082'
                            : cell.getIsPlaceholder()
                              ? 'oklch(var(--b2))'
                              : 'white',
                          fontWeight: cell.getIsAggregated() ? 'bold' : 'normal',
                        },
                      }}
                    >
                      {cell.getIsGrouped() ? (
                      // If it's a grouped cell, add an expander and row count
                        <>
                          <Button
                            type="text"
                            size="small"
                            icon={row.getIsExpanded() ? <MinusCircleOutlined /> : <PlusCircleOutlined />}
                            {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: {
                                cursor: row.getCanExpand()
                                  ? 'pointer'
                                  : 'normal',
                              },
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                            {' '}
                            (
                            {row.subRows.length}
                            )
                          </Button>
                        </>
                      ) : cell.getIsAggregated() ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                        flexRender(
                          cell.column.columnDef.aggregatedCell
                          ?? cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
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
      <div className="h-2" />
      <Space className="flex items-center gap-2">
        <Button
          onClick={() => table.setPageIndex(0)}
          icon={<DoubleLeftOutlined />}
          disabled={!table.getCanPreviousPage()}
        />
        <Button
          onClick={() => table.previousPage()}
          icon={<LeftOutlined />}
          disabled={!table.getCanPreviousPage()}
        />
        <Button
          onClick={() => table.nextPage()}
          icon={<RightOutlined />}
          disabled={!table.getCanNextPage()}
        />
        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          icon={<DoubleRightOutlined />}
          disabled={!table.getCanNextPage()}
        />
        <Space>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}
            {' '}
            of
            {' '}
            {table.getPageCount()}
          </strong>
        </Space>
        <Space>
          | Go to page:
          <Input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </Space>
        <Select
          value={table.getState().pagination.pageSize}
          onChange={(value) => {
            table.setPageSize(Number(value))
          }}
          options={[10, 20, 30, 40, 50].map(pageSize => ({
            label: `Show ${pageSize}`,
            value: pageSize,
          }))}
          style={
            {
              width: '100px',
            }
          }
        />
      </Space>
      <div>
        {table.getRowModel().rows.length}
        {' '}
        Rows
      </div>
      <Space>
        <Button onClick={() => rerender()}>Force Rerender</Button>
        <Button onClick={() => refreshData()}>Refresh Data</Button>
      </Space>
      <pre>{JSON.stringify(grouping, null, 2)}</pre>
    </div>
  )
}

export default App
