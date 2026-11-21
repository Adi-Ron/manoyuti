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
  const [showPassword, setShowPassword] = useState(false);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !configured) return;
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError) {
        setError('Those details did not match. Please check your email and password.');
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('We could not connect. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <Link href="/" className="brand" aria-label="Manoyuti, home">
          <span className="mk" aria-hidden="true"><span></span></span>
          <span><b>Manoyuti</b><small>Psychology & care</small></span>
        </Link>

        <span className="admin-eyebrow">Your practice workspace</span>
        <h1>Welcome back.</h1>
        <p>Sign in to manage session requests, messages, and your website.</p>

        {!configured && <div className="admin-note" role="status">Sign-in will be available once the database connection is configured.</div>}

        {error && <div className="admin-error" role="alert">{error}</div>}

        <form className="admin-form" onSubmit={handleSubmit} aria-busy={loading}>
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
            <div className="admin-password-input"><input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            /><button type="button" className="admin-password-toggle" aria-controls="admin-password" aria-pressed={showPassword} onClick={() => setShowPassword(prev => !prev)}>{showPassword ? 'Hide' : 'Show'}</button></div>
          </div>
          <button className="btn" type="submit" disabled={loading || !configured}>
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
