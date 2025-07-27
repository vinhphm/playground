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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Account Settings</h2>
            <div className="form-control w-full">
              <label className="label" htmlFor="name-input">
                <span className="label-text">Name</span>
              </label>
              <input
                className="input input-bordered w-full"
                id="name-input"
                placeholder="Your name"
                type="text"
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="email-input">
                <span className="label-text">Email</span>
              </label>
              <input
                className="input input-bordered w-full"
                id="email-input"
                placeholder="your.email@example.com"
                type="email"
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="bio-input">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                id="bio-input"
                placeholder="Tell us about yourself"
              />
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="button">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Preferences</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Enable notifications</span>
                <input
                  className="toggle toggle-primary"
                  defaultChecked
                  type="checkbox"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Dark mode</span>
                <input className="toggle toggle-secondary" type="checkbox" />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Email updates</span>
                <input
                  className="toggle toggle-accent"
                  defaultChecked
                  type="checkbox"
                />
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="language-select">
                <span className="label-text">Language</span>
              </label>
              <select className="select select-bordered" id="language-select">
                <option disabled selected>
                  Select language
                </option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="button">
                Save Preferences
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Security</h2>
            <div className="form-control w-full">
              <label className="label" htmlFor="current-password">
                <span className="label-text">Current Password</span>
              </label>
              <input
                className="input input-bordered w-full"
                id="current-password"
                placeholder="Current password"
                type="password"
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="new-password">
                <span className="label-text">New Password</span>
              </label>
              <input
                className="input input-bordered w-full"
                id="new-password"
                placeholder="New password"
                type="password"
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="confirm-password">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                className="input input-bordered w-full"
                id="confirm-password"
                placeholder="Confirm new password"
                type="password"
              />
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-warning" type="button">
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Danger Zone</h2>
            <p className="text-base-content/70 text-sm">
              These actions are irreversible. Please be careful.
            </p>
            <div className="space-y-3">
              <button
                className="btn btn-outline btn-warning w-full"
                type="button"
              >
                Export Data
              </button>
              <button
                className="btn btn-outline btn-error w-full"
                type="button"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
