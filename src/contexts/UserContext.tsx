import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface Permission {
  product: string;
  can_read: number;
  can_create: number;
  can_update: number;
  can_delete: number;
}

export interface UserData {
  token: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  org: string;
  isDocsAdmin: boolean;
  permissions: Permission[];
  canRead: (product: string) => boolean;
  canWrite: (product: string) => boolean;
  logout: () => void;
}

export interface UserContextValue {
  user: UserData | null;
  setUserFromToken: (token: string) => void;
  setFallbackUser: () => void;
  isAuthenticated: boolean;
}

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const TOKEN_KEY = 'anshin_docs_token';
const TOKEN_EXPIRY_KEY = 'anshin_docs_token_expiry';
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/* ------------------------------------------------------------------ */
/* JWT Helpers                                                         */
/* ------------------------------------------------------------------ */

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function parsePermissions(raw: unknown): Permission[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((p: Record<string, unknown>) => ({
    product: String(p.product || ''),
    can_read: Number(p.can_read || 0),
    can_create: Number(p.can_create || 0),
    can_update: Number(p.can_update || 0),
    can_delete: Number(p.can_delete || 0),
  }));
}

/* ------------------------------------------------------------------ */
/* Default read-only permissions (fallback mode)                       */
/* ------------------------------------------------------------------ */

const FALLBACK_PERMISSIONS: Permission[] = [
  { product: 'superpai', can_read: 1, can_create: 0, can_update: 0, can_delete: 0 },
  { product: 'anna-voice', can_read: 1, can_create: 0, can_update: 0, can_delete: 0 },
  { product: 'orchestrate', can_read: 1, can_create: 0, can_update: 0, can_delete: 0 },
];

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

const UserContext = createContext<UserContextValue>({
  user: null,
  setUserFromToken: () => {},
  setFallbackUser: () => {},
  isAuthenticated: false,
});

export function useUser(): UserData | null {
  const ctx = useContext(UserContext);
  return ctx.user;
}

export function useUserContext(): UserContextValue {
  return useContext(UserContext);
}

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);

  const buildLogout = useCallback(() => {
    return () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
        window.dispatchEvent(new CustomEvent('anshin-logout'));
      }
      setUser(null);
    };
  }, []);

  const buildCanRead = useCallback((permissions: Permission[]) => {
    return (product: string): boolean => {
      const perm = permissions.find(
        (p) => p.product.toLowerCase() === product.toLowerCase()
      );
      return perm ? perm.can_read === 1 : false;
    };
  }, []);

  const buildCanWrite = useCallback((permissions: Permission[]) => {
    return (product: string): boolean => {
      const perm = permissions.find(
        (p) => p.product.toLowerCase() === product.toLowerCase()
      );
      return perm ? (perm.can_create === 1 || perm.can_update === 1) : false;
    };
  }, []);

  const setUserFromToken = useCallback(
    (token: string) => {
      const payload = decodeJwtPayload(token);
      if (!payload) {
        // Not a real JWT - treat as fallback
        setFallbackUserInternal(token);
        return;
      }

      const permissions = parsePermissions(payload.permissions);
      const logout = buildLogout();

      const userData: UserData = {
        token,
        userId: String(payload.sub || ''),
        email: String(payload.email || ''),
        name: String(payload.name || payload.email || 'User'),
        role: String(payload.role || 'viewer'),
        org: String(payload.org || 'external'),
        isDocsAdmin: Boolean(payload.is_docs_admin),
        permissions,
        canRead: buildCanRead(permissions),
        canWrite: buildCanWrite(permissions),
        logout,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + TOKEN_TTL_MS));
      }

      setUser(userData);
    },
    [buildLogout, buildCanRead, buildCanWrite]
  );

  const setFallbackUserInternal = useCallback(
    (token?: string) => {
      const t = token || 'fallback-authenticated';
      const permissions = FALLBACK_PERMISSIONS;
      const logout = buildLogout();

      const userData: UserData = {
        token: t,
        userId: 'fallback',
        email: '',
        name: 'Guest',
        role: 'viewer',
        org: 'external',
        isDocsAdmin: false,
        permissions,
        canRead: buildCanRead(permissions),
        canWrite: buildCanWrite(permissions),
        logout,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, t);
        localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + TOKEN_TTL_MS));
      }

      setUser(userData);
    },
    [buildLogout, buildCanRead, buildCanWrite]
  );

  const setFallbackUser = useCallback(() => {
    setFallbackUserInternal();
  }, [setFallbackUserInternal]);

  // Rehydrate from stored token on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (storedToken && expiry && Date.now() < parseInt(expiry, 10)) {
      setUserFromToken(storedToken);
    }
  }, [setUserFromToken]);

  // Listen for logout events from other components
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handle = () => setUser(null);
    window.addEventListener('anshin-logout', handle);
    return () => window.removeEventListener('anshin-logout', handle);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUserFromToken, setFallbackUser, isAuthenticated: user !== null }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
