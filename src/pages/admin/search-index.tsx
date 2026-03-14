import React, { useEffect, useState, useCallback } from 'react';
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
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface IndexStats {
  total_pages: number;
  total_chunks: number;
  vector_enabled: boolean;
}

interface IndexResult {
  indexed: number;
  skipped: number;
  errors: number;
}

interface AuditEntry {
  id?: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
}

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
  marginBottom: '1.5rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid var(--ifm-color-emphasis-200)',
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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

const sectionStyle: React.CSSProperties = {
  background: 'var(--anshin-card-bg)',
  border: '1px solid var(--anshin-card-border)',
  borderRadius: '12px',
  padding: '1.5rem',
  marginBottom: '1.5rem',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 700,
  margin: '0 0 1rem 0',
};

const reindexBtnStyle: React.CSSProperties = {
  padding: '0.6rem 1.5rem',
  background: 'var(--ifm-color-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'background 0.15s',
};

const progressStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2rem',
  padding: '1rem',
  background: 'var(--ifm-background-surface-color)',
  borderRadius: '8px',
  marginTop: '1rem',
  fontSize: '0.85rem',
};

const progressItemStyle: React.CSSProperties = {
  textAlign: 'center',
};

const progressNumberStyle = (color: string): React.CSSProperties => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color,
});

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.85rem',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.6rem 0.75rem',
  borderBottom: '2px solid var(--ifm-color-emphasis-300)',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  color: 'var(--ifm-color-emphasis-700)',
  background: 'transparent',
};

const tdStyle: React.CSSProperties = {
  padding: '0.6rem 0.75rem',
  borderBottom: '1px solid var(--ifm-color-emphasis-200)',
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function AdminSearchIndex(): React.ReactElement {
  const user = useUser();
  const [stats, setStats] = useState<IndexStats>({
    total_pages: 0,
    total_chunks: 0,
    vector_enabled: false,
  });
  const [indexResult, setIndexResult] = useState<IndexResult | null>(null);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [reindexing, setReindexing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Redirect non-admins
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user && !user.isDocsAdmin) {
      window.location.href = '/';
    }
  }, [user]);

  // Fetch stats and audit log
  const fetchData = useCallback(async () => {
    if (!user?.isDocsAdmin) return;
    setLoading(true);
    const headers = { Authorization: `Bearer ${user.token}` };

    try {
      // Stats
      const statsResp = await fetch(`${API_BASE}/api/v1/admin/docs/stats`, { headers });
      if (statsResp.ok) {
        const data = await statsResp.json();
        setStats({
          total_pages: data.total_pages || 0,
          total_chunks: data.total_chunks || 0,
          vector_enabled: Boolean(data.vector_enabled),
        });
      }

      // Audit log
      const auditResp = await fetch(`${API_BASE}/api/v1/admin/audit?limit=20`, {
        headers,
      });
      if (auditResp.ok) {
        const data = await auditResp.json();
        setAuditLog(Array.isArray(data) ? data : data.entries || []);
      }
    } catch {
      // API may not be available
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReindexAll = async () => {
    if (!user) return;
    setReindexing(true);
    setIndexResult(null);

    try {
      const resp = await fetch(`${API_BASE}/api/v1/admin/docs/index`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        setIndexResult({
          indexed: data.indexed || 0,
          skipped: data.skipped || 0,
          errors: data.errors || 0,
        });
        // Refresh stats
        await fetchData();
      } else {
        setIndexResult({ indexed: 0, skipped: 0, errors: 1 });
      }
    } catch {
      setIndexResult({ indexed: 0, skipped: 0, errors: 1 });
    } finally {
      setReindexing(false);
    }
  };

  if (!user?.isDocsAdmin) {
    return (
      <Layout title="Admin - Search Index">
        <div style={{ ...pageStyle, textAlign: 'center', paddingTop: '4rem' }}>
          <p>Checking permissions...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin - Search Index">
      <div style={pageStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
              Search Index
            </h1>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav style={navStyle}>
          <a href="/admin" style={navLinkStyle(false)}>
            Dashboard
          </a>
          <a href="/admin/users" style={navLinkStyle(false)}>
            Users
          </a>
          <a href="/admin/documents" style={navLinkStyle(false)}>
            Documents
          </a>
          <a href="/admin/search-index" style={navLinkStyle(true)}>
            Search Index
          </a>
        </nav>

        {/* Stats */}
        <div style={gridStyle}>
          <div style={cardStyle}>
            <div style={statNumberStyle}>{stats.total_pages}</div>
            <div style={statLabelStyle}>Total Pages</div>
          </div>
          <div style={cardStyle}>
            <div style={statNumberStyle}>{stats.total_chunks}</div>
            <div style={statLabelStyle}>Total Chunks</div>
          </div>
          <div style={cardStyle}>
            <div
              style={{
                ...statNumberStyle,
                color: stats.vector_enabled ? '#10b981' : 'var(--ifm-color-emphasis-500)',
              }}
            >
              {stats.vector_enabled ? 'Yes' : 'No'}
            </div>
            <div style={statLabelStyle}>Vector Search</div>
          </div>
        </div>

        {/* Re-index section */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Re-index All Documents</h2>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--ifm-color-emphasis-600)',
              marginBottom: '1rem',
            }}
          >
            This will scan all markdown files across all products and rebuild the search
            index. Existing index entries will be updated in place.
          </p>
          <button
            style={reindexBtnStyle}
            onClick={handleReindexAll}
            disabled={reindexing}
          >
            {reindexing ? 'Re-indexing...' : 'Re-index All Documents'}
          </button>

          {indexResult && (
            <div style={progressStyle}>
              <div style={progressItemStyle}>
                <div style={progressNumberStyle('#10b981')}>{indexResult.indexed}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-600)' }}>
                  Indexed
                </div>
              </div>
              <div style={progressItemStyle}>
                <div style={progressNumberStyle('#f59e0b')}>{indexResult.skipped}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-600)' }}>
                  Skipped
                </div>
              </div>
              <div style={progressItemStyle}>
                <div style={progressNumberStyle('#ef4444')}>{indexResult.errors}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-600)' }}>
                  Errors
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Audit log */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Recent Audit Log</h2>
          {loading ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--ifm-color-emphasis-500)',
              }}
            >
              Loading...
            </div>
          ) : auditLog.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--ifm-color-emphasis-500)',
                fontSize: '0.85rem',
              }}
            >
              No audit entries found. Actions will appear here once the server is
              connected and tracking events.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>User</th>
                    <th style={thStyle}>Action</th>
                    <th style={thStyle}>Resource</th>
                    <th style={thStyle}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLog.map((entry, i) => (
                    <tr key={entry.id || i}>
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{entry.user}</td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background:
                              entry.action === 'delete'
                                ? '#fef2f2'
                                : entry.action === 'create'
                                  ? '#f0fdf4'
                                  : '#eff6ff',
                            color:
                              entry.action === 'delete'
                                ? '#dc2626'
                                : entry.action === 'create'
                                  ? '#16a34a'
                                  : '#2563eb',
                            textTransform: 'uppercase',
                          }}
                        >
                          {entry.action}
                        </span>
                      </td>
                      <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        {entry.resource}
                      </td>
                      <td style={{ ...tdStyle, fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-500)' }}>
                        {new Date(entry.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
