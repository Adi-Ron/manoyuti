'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError('Those details did not match. Please check your email and password.');
      setLoading(false);
      return;
    }

    router.replace('/admin');
    router.refresh();
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <Link href="/" className="brand" aria-label="Resilio by IshIra, home">
          <span className="mk" aria-hidden="true"><span></span></span>
          <span><b>Resilio</b><small>by IshIra</small></span>
        </Link>

        <h1>Admin sign in</h1>
        <p>Manage enquiries, perception responses and site content.</p>

        {error && <div className="admin-error" role="alert">{error}</div>}

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="admin-login-foot">
          <Link href="/">Back to site</Link>
        </p>
      </div>
    </div>
  );
}
