import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useUser } from '@site/src/contexts/UserContext';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const API_BASE =
  typeof window !== 'undefined'
    ? (window as any).__SUPERPAI_API_URL ||
      'https://superpai.anshintech.dev'
    : '';

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const pageStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '2rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid var(--ifm-color-emphasis-200)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: 700,
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'var(--ifm-color-emphasis-600)',
  margin: 0,
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '2rem',
};

const navLinkStyle = (active: boolean): React.CSSProperties => ({
  padding: '0.5rem 1.25rem',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: active ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)',
  background: active ? 'var(--ifm-color-primary)' : 'transparent',
  color: active ? '#fff' : 'var(--ifm-font-color-base)',
  fontWeight: active ? 600 : 400,
  fontSize: '0.85rem',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.15s',
  display: 'inline-block',
});

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1.25rem',
  marginBottom: '2rem',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--anshin-card-bg)',
  border: '1px solid var(--anshin-card-border)',
  borderRadius: '12px',
  padding: '1.5rem',
  textAlign: 'center',
};

const statNumberStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 800,
  color: 'var(--ifm-color-primary)',
  lineHeight: 1,
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--ifm-color-emphasis-600)',
  marginTop: '0.25rem',
};

const quickLinksStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
};

const quickLinkStyle: React.CSSProperties = {
  padding: '1rem 1.5rem',
  border: '1px solid var(--anshin-card-border)',
  borderRadius: '10px',
  background: 'var(--anshin-card-bg)',
  textDecoration: 'none',
  color: 'var(--ifm-font-color-base)',
  transition: 'transform 0.15s, box-shadow 0.15s',
  flex: '1 1 200px',
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function AdminDashboard(): React.ReactElement {
  const user = useUser();
  const [stats, setStats] = useState({ users: 0, documents: 0, chunks: 0, vectorEnabled: false });

  // Redirect non-admins
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user && !user.isDocsAdmin) {
      window.location.href = '/';
    }
  }, [user]);

  // Fetch basic stats
  useEffect(() => {
    if (!user?.isDocsAdmin) return;

    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.token}` };

        // Try to get user count
        const usersResp = await fetch(`${API_BASE}/api/v1/admin/users`, { headers });
        let userCount = 0;
        if (usersResp.ok) {
          const data = await usersResp.json();
          userCount = Array.isArray(data) ? data.length : (data.total || 0);
        }

        // Try to get index stats
        const indexResp = await fetch(`${API_BASE}/api/v1/admin/docs/stats`, { headers });
        let docCount = 0;
        let chunkCount = 0;
        let vectorEnabled = false;
        if (indexResp.ok) {
          const data = await indexResp.json();
          docCount = data.total_pages || 0;
          chunkCount = data.total_chunks || 0;
          vectorEnabled = Boolean(data.vector_enabled);
        }

        setStats({ users: userCount, documents: docCount, chunks: chunkCount, vectorEnabled });
      } catch {
        // API may not be available yet - show zeros
      }
    };

    fetchStats();
  }, [user]);

  if (!user?.isDocsAdmin) {
    return (
      <Layout title="Admin">
        <div style={{ ...pageStyle, textAlign: 'center', paddingTop: '4rem' }}>
          <p>Checking permissions...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin Dashboard">
      <div style={pageStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Admin Dashboard</h1>
            <p style={subtitleStyle}>
              Manage users, documents, and search for docs.anshintech.net
            </p>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav style={navStyle}>
          <a href="/admin" style={navLinkStyle(true)}>
            Dashboard
          </a>
          <a href="/admin/users" style={navLinkStyle(false)}>
            Users
          </a>
          <a href="/admin/documents" style={navLinkStyle(false)}>
            Documents
          </a>
          <a href="/admin/search-index" style={navLinkStyle(false)}>
            Search Index
          </a>
        </nav>

        {/* Stats grid */}
        <div style={gridStyle}>
          <div style={cardStyle}>
            <div style={statNumberStyle}>{stats.users}</div>
            <div style={statLabelStyle}>Registered Users</div>
          </div>
          <div style={cardStyle}>
            <div style={statNumberStyle}>{stats.documents}</div>
            <div style={statLabelStyle}>Total Pages</div>
          </div>
          <div style={cardStyle}>
            <div style={statNumberStyle}>{stats.chunks}</div>
            <div style={statLabelStyle}>Search Chunks</div>
          </div>
          <div style={cardStyle}>
            <div
              style={{
                ...statNumberStyle,
                color: stats.vectorEnabled ? '#10b981' : 'var(--ifm-color-emphasis-500)',
              }}
            >
              {stats.vectorEnabled ? 'Yes' : 'No'}
            </div>
            <div style={statLabelStyle}>Vector Search</div>
          </div>
        </div>

        {/* Quick Links */}
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
          Quick Actions
        </h2>
        <div style={quickLinksStyle}>
          <a
            href="/admin/users"
            style={quickLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Manage Users</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
              Add, edit, or remove user accounts and permissions
            </div>
          </a>
          <a
            href="/admin/documents"
            style={quickLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Edit Documents</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
              Browse, edit, and manage documentation files
            </div>
          </a>
          <a
            href="/admin/search-index"
            style={quickLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Search Index</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
              Re-index documents and view search analytics
            </div>
          </a>
        </div>
      </div>
    </Layout>
  );
}
