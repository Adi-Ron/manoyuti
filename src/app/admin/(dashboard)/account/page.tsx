import { getAdminUser } from '@/lib/admin';
import { PasswordForm } from './PasswordForm';

export const dynamic = 'force-dynamic';

export default async function AdminAccountPage() {
  const admin = await getAdminUser();

  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Account</h1>
          <p>Signed in as {admin?.email ?? 'administrator'}.</p>
        </div>
      </div>

      <div className="admin-panel">
        <h2>Change password</h2>
        <PasswordForm />
      </div>
    </>
  );
}
