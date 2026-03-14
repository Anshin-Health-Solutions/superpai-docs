import React, { useState, useEffect, type ReactNode } from 'react';
import { useUserContext } from '@site/src/contexts/UserContext';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const TOKEN_KEY = 'anshin_docs_token';
const TOKEN_EXPIRY_KEY = 'anshin_docs_token_expiry';
const FALLBACK_PASSWORD = 'anshin2026';

const API_BASE =
  typeof window !== 'undefined'
    ? (window as any).__SUPERPAI_API_URL ||
      'https://superpai.anshintech.dev'
    : '';

/* ------------------------------------------------------------------ */
/* LoginForm                                                           */
/* ------------------------------------------------------------------ */

interface LoginFormProps {
  onSuccess: (token: string, isFallback: boolean) => void;
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (API_BASE) {
        const response = await fetch(`${API_BASE}/docs/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.token) {
            onSuccess(data.token, false);
            return;
          }
        }

        if (response.status === 401) {
          // Server says bad credentials. Still try fallback password below.
        }
      }

      // Fallback: simple password check (grants read-only to all products)
      if (password === FALLBACK_PASSWORD) {
        onSuccess('fallback-authenticated', true);
        return;
      }

      setError('Invalid credentials. Please try again.');
    } catch {
      // Server unavailable - fall back to password check
      if (password === FALLBACK_PASSWORD) {
        onSuccess('fallback-authenticated', true);
        return;
      }
      setError('Unable to reach the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="120" height="120" rx="24" fill="#2E75B6" />
            <text
              x="60"
              y="78"
              textAnchor="middle"
              fill="white"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="52"
              fontWeight="800"
            >
              AT
            </text>
          </svg>
        </div>
        <h1>Anshin Technology Solutions</h1>
        <p>Sign in to access the developer documentation portal.</p>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LoginGate                                                           */
/* ------------------------------------------------------------------ */

interface LoginGateProps {
  children: ReactNode;
}

export default function LoginGate({ children }: LoginGateProps) {
  const { user, setUserFromToken, setFallbackUser, isAuthenticated } =
    useUserContext();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for existing valid token
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    if (storedToken && expiry && Date.now() < parseInt(expiry, 10)) {
      if (!isAuthenticated) {
        setUserFromToken(storedToken);
      }
    }

    setChecked(true);
  }, [isAuthenticated, setUserFromToken]);

  // Listen for logout events
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleLogout = () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
    };
    window.addEventListener('anshin-logout', handleLogout);
    return () => window.removeEventListener('anshin-logout', handleLogout);
  }, []);

  const handleLoginSuccess = (token: string, isFallback: boolean) => {
    if (isFallback) {
      setFallbackUser();
    } else {
      setUserFromToken(token);
    }
  };

  // SSR / initial hydration - render nothing briefly
  if (!checked) return null;

  if (!isAuthenticated) {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  return <>{children}</>;
}
