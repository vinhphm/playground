import { createFileRoute } from '@tanstack/react-router'
import { DataTable } from '../../components/DataTable'

export const Route = createFileRoute('/_dashboard/tables')({
  component: TablesPage,
})

function TablesPage() {
  return <DataTable />
}
