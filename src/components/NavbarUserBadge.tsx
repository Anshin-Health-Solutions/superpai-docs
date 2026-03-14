import React from 'react';
import { useUser } from '@site/src/contexts/UserContext';

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const badgeContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.35rem 0.75rem',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: 500,
  color: 'var(--ifm-navbar-link-color)',
};

const userIconStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: 'var(--ifm-color-primary)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.7rem',
  fontWeight: 700,
  flexShrink: 0,
};

const logoutBtnStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '6px',
  padding: '0.2rem 0.6rem',
  fontSize: '0.75rem',
  cursor: 'pointer',
  color: 'var(--ifm-navbar-link-color)',
  transition: 'all 0.15s',
  marginLeft: '0.25rem',
};

const adminLinkStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--ifm-color-primary)',
  textDecoration: 'none',
  marginLeft: '0.25rem',
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function NavbarUserBadge(): React.ReactElement | null {
  // SSR guard
  if (typeof window === 'undefined') return null;

  const user = useUser();
  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div style={badgeContainerStyle}>
      <div style={userIconStyle}>{initials || 'U'}</div>
      <span>{user.name}</span>
      {user.isDocsAdmin && (
        <a href="/admin" style={adminLinkStyle}>
          Admin
        </a>
      )}
      <button
        style={logoutBtnStyle}
        onClick={user.logout}
        title="Sign out"
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.borderColor = 'var(--ifm-color-primary)';
          (e.target as HTMLButtonElement).style.color = 'var(--ifm-color-primary)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.borderColor = 'var(--ifm-color-emphasis-300)';
          (e.target as HTMLButtonElement).style.color = 'var(--ifm-navbar-link-color)';
        }}
      >
        Logout
      </button>
    </div>
  );
}
