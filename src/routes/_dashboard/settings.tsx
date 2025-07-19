import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h1>Settings</h1>
        <p>Configure your application preferences and settings.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Account Settings</h2>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Your name" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="your.email@example.com" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea className="textarea textarea-bordered" placeholder="Tell us about yourself"></textarea>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Preferences</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Enable notifications</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Dark mode</span>
                <input type="checkbox" className="toggle toggle-secondary" />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Email updates</span>
                <input type="checkbox" className="toggle toggle-accent" defaultChecked />
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Language</span>
              </label>
              <select className="select select-bordered">
                <option disabled selected>Select language</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Save Preferences</button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Security</h2>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <input type="password" placeholder="Current password" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input type="password" placeholder="New password" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input type="password" placeholder="Confirm new password" className="input input-bordered w-full" />
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-warning">Change Password</button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Danger Zone</h2>
            <p className="text-sm text-base-content/70">
              These actions are irreversible. Please be careful.
            </p>
            <div className="space-y-3">
              <button className="btn btn-outline btn-warning w-full">
                Export Data
              </button>
              <button className="btn btn-outline btn-error w-full">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}