'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function PasswordForm() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDone(false);

    if (password.length < 8) {
      setError('Use at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('The two passwords do not match.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    setPassword('');
    setConfirm('');
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} style={{ maxWidth: 440 }}>
      {error && <div className="admin-error" role="alert">{error}</div>}
      {done && <div className="admin-success" role="status">Password updated.</div>}

      <div className="field">
        <label htmlFor="new-password">New password</label>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
      </div>
      <div className="admin-actions">
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Updating…' : 'Update password'}
        </button>
      </div>
    </form>
  );
}
