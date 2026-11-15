import { getSiteSettingsWithStatus, SETTINGS_GROUPS } from '@/lib/site-settings';
import { updateSettings } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage({
  searchParams
}: {
  searchParams: { saved?: string; error?: string };
}) {
  const { settings, missing } = await getSiteSettingsWithStatus();

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Site settings</h1>
          <p>Update hero highlights, crisis lines, contact details, and page banners. Changes update across the site immediately.</p>
        </div>
      </div>

      {searchParams.saved && (
        <div className="admin-success" role="status">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Settings saved successfully.</span>
        </div>
      )}

      {searchParams.error && (
        <div className="admin-error" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{searchParams.error}</span>
        </div>
      )}

      {missing && (
        <div className="admin-panel">
          <p className="admin-note">
            The settings table is not configured yet in Supabase. Run{' '}
            <code>supabase/admin-and-perception.sql</code> in the Supabase SQL editor, then reload this page. Until
            then, the site safely uses its built-in defaults.
          </p>
        </div>
      )}

      <form action={updateSettings} className="admin-form">
        <div className="admin-settings-stack">
          {SETTINGS_GROUPS.map((group, groupIdx) => (
            <fieldset key={group.title} className="admin-settings-card">
              <div className="admin-settings-head">
                <div className="admin-settings-title-wrap">
                  <span className="admin-settings-index">{`0${groupIdx + 1}`}</span>
                  <div>
                    <legend className="admin-settings-title">{group.title}</legend>
                    {group.description && <p className="admin-settings-desc">{group.description}</p>}
                  </div>
                </div>
              </div>

              <div className="admin-fields-grid">
                {group.fields.map(field => {
                  const isFull = field.span === 'full' || field.type === 'textarea';
                  return (
                    <div
                      key={field.key}
                      className={`field ${isFull ? 'field-full' : 'field-half'}`}
                    >
                      <label htmlFor={`setting-${field.key}`}>{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={`setting-${field.key}`}
                          name={field.key}
                          rows={field.key === 'location' ? 2 : 3}
                          defaultValue={settings[field.key]}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                      ) : (
                        <input
                          id={`setting-${field.key}`}
                          name={field.key}
                          defaultValue={settings[field.key]}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                      )}
                      {field.hint && <p className="admin-hint">{field.hint}</p>}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="admin-actions-bar">
          <button className="btn admin-save-btn" type="submit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>Save all changes</span>
          </button>
          <div className="admin-actions-hint">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>Empty fields gracefully fall back to default values.</span>
          </div>
        </div>
      </form>
    </>
  );
}
