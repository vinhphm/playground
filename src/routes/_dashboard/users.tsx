import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/users')({
  component: UsersPage,
})

function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h1>User Management</h1>
        <p>Manage users, roles, and permissions.</p>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="card-title">All Users</h2>
            <button className="btn btn-primary" type="button">
              Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral text-neutral-content">
                        <span className="font-medium text-sm">JD</span>
                      </div>
                      <div>
                        <div className="font-bold">John Doe</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>john.doe@example.com</td>
                  <td>
                    <span className="badge badge-primary">Admin</span>
                  </td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-xs" type="button">
                        Edit
                      </button>
                      <button className="btn btn-ghost btn-xs" type="button">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-content">
                        <span className="font-medium text-sm">AS</span>
                      </div>
                      <div>
                        <div className="font-bold">Alice Smith</div>
                        <div className="text-sm opacity-50">Canada</div>
                      </div>
                    </div>
                  </td>
                  <td>alice.smith@example.com</td>
                  <td>
                    <span className="badge badge-secondary">Editor</span>
                  </td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-xs" type="button">
                        Edit
                      </button>
                      <button className="btn btn-ghost btn-xs" type="button">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-accent-content">
                        <span className="font-medium text-sm">BJ</span>
                      </div>
                      <div>
                        <div className="font-bold">Bob Johnson</div>
                        <div className="text-sm opacity-50">United Kingdom</div>
                      </div>
                    </div>
                  </td>
                  <td>bob.johnson@example.com</td>
                  <td>
                    <span className="badge badge-neutral">Viewer</span>
                  </td>
                  <td>
                    <span className="badge badge-warning">Pending</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-xs" type="button">
                        Edit
                      </button>
                      <button className="btn btn-ghost btn-xs" type="button">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
