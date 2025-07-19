import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/analytics')({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h1>Analytics Dashboard</h1>
        <p>Real-time analytics and insights for your application.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Traffic Overview</h2>
            <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
              <p className="text-base-content/60">Chart placeholder</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">User Engagement</h2>
            <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
              <p className="text-base-content/60">Chart placeholder</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Revenue Trends</h2>
            <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
              <p className="text-base-content/60">Chart placeholder</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Performance Metrics</h2>
            <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
              <p className="text-base-content/60">Chart placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}