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

const PRODUCT_FOLDERS = ['superpai', 'anna-voice', 'orchestrate'];

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface DocFile {
  path: string;
  title: string;
  product: string;
  indexed: boolean;
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const pageStyle: React.CSSProperties = {
  maxWidth: '1400px',
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

const splitPaneStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '280px 1fr',
  gap: '1.5rem',
  minHeight: '600px',
};

const sidebarStyle: React.CSSProperties = {
  background: 'var(--anshin-card-bg)',
  border: '1px solid var(--anshin-card-border)',
  borderRadius: '10px',
  padding: '1rem',
  overflowY: 'auto',
  maxHeight: '70vh',
};

const editorPaneStyle: React.CSSProperties = {
  background: 'var(--anshin-card-bg)',
  border: '1px solid var(--anshin-card-border)',
  borderRadius: '10px',
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
};

const folderHeaderStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: 'var(--ifm-color-emphasis-600)',
  padding: '0.5rem 0.25rem',
  marginTop: '0.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
};

const fileItemStyle = (active: boolean): React.CSSProperties => ({
  padding: '0.4rem 0.5rem 0.4rem 1.25rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.8rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  background: active ? 'var(--ifm-color-primary-lightest)' : 'transparent',
  color: active ? 'var(--ifm-color-primary-darkest)' : 'var(--ifm-font-color-base)',
  fontWeight: active ? 600 : 400,
  transition: 'background 0.1s',
});

const indexDotStyle = (indexed: boolean): React.CSSProperties => ({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: indexed ? '#10b981' : '#9ca3af',
  flexShrink: 0,
});

const editorToolbarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 0',
  marginBottom: '0.75rem',
  borderBottom: '1px solid var(--ifm-color-emphasis-200)',
  flexWrap: 'wrap',
  gap: '0.5rem',
};

const editorFilePathStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--ifm-color-emphasis-600)',
  fontFamily: 'monospace',
};

const wordCountStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: 'var(--ifm-color-emphasis-500)',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  flex: 1,
  padding: '1rem',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '6px',
  background: 'var(--ifm-background-surface-color)',
  color: 'var(--ifm-font-color-base)',
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  fontSize: '0.85rem',
  lineHeight: 1.6,
  resize: 'vertical',
  minHeight: '400px',
  outline: 'none',
  boxSizing: 'border-box',
};

const btnRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  marginTop: '0.75rem',
};

const btnStyle = (primary: boolean): React.CSSProperties => ({
  padding: '0.4rem 1rem',
  border: primary ? 'none' : '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '6px',
  background: primary ? 'var(--ifm-color-primary)' : 'transparent',
  color: primary ? '#fff' : 'var(--ifm-font-color-base)',
  fontWeight: primary ? 600 : 400,
  fontSize: '0.8rem',
  cursor: 'pointer',
  transition: 'all 0.15s',
});

const previewPaneStyle: React.CSSProperties = {
  width: '100%',
  flex: 1,
  padding: '1rem',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '6px',
  background: 'var(--ifm-background-surface-color)',
  overflowY: 'auto',
  minHeight: '400px',
  lineHeight: 1.7,
  fontSize: '0.9rem',
};

const emptyStateStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  color: 'var(--ifm-color-emphasis-500)',
  fontSize: '0.9rem',
};

/* ------------------------------------------------------------------ */
/* Simple Markdown to HTML (basic conversion)                          */
/* ------------------------------------------------------------------ */

function simpleMarkdownToHtml(md: string): string {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code style="background:var(--ifm-color-emphasis-200);padding:0.1em 0.3em;border-radius:3px;font-size:0.85em">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr/>')
    // Line breaks
    .replace(/\n/g, '<br/>');
  return html;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function AdminDocuments(): React.ReactElement {
  const user = useUser();
  const [files, setFiles] = useState<DocFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<DocFile | null>(null);
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [status, setStatus] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(PRODUCT_FOLDERS)
  );

  // Redirect non-admins
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user && !user.isDocsAdmin) {
      window.location.href = '/';
    }
  }, [user]);

  // Fetch file list
  const fetchFiles = useCallback(async () => {
    if (!user?.isDocsAdmin) return;
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/api/v1/admin/docs/files`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        const items: DocFile[] = Array.isArray(data)
          ? data
          : Array.isArray(data.files)
            ? data.files
            : [];
        setFiles(items);
      }
    } catch {
      // API may not be available
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Load file content when selected
  const handleSelectFile = async (file: DocFile) => {
    setSelectedFile(file);
    setPreviewMode(false);
    setStatus('');

    try {
      const resp = await fetch(
        `${API_BASE}/api/v1/admin/docs/files/${encodeURIComponent(file.path)}`,
        {
          headers: { Authorization: `Bearer ${user!.token}` },
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        setContent(data.content || '');
      } else {
        setContent('');
        setStatus('Failed to load file content.');
      }
    } catch {
      setContent('');
      setStatus('Failed to reach server.');
    }
  };

  const handleSave = async () => {
    if (!selectedFile || !user) return;
    setSaving(true);
    setStatus('');
    try {
      const resp = await fetch(
        `${API_BASE}/api/v1/admin/docs/files/${encodeURIComponent(selectedFile.path)}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        }
      );
      if (resp.ok) {
        setStatus('File saved successfully.');
      } else {
        setStatus('Failed to save file.');
      }
    } catch {
      setStatus('Failed to reach server.');
    } finally {
      setSaving(false);
    }
  };

  const handleReindex = async () => {
    if (!selectedFile || !user) return;
    setReindexing(true);
    setStatus('');
    try {
      const resp = await fetch(
        `${API_BASE}/api/v1/admin/docs/index/${encodeURIComponent(selectedFile.path)}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (resp.ok) {
        setStatus('File re-indexed successfully.');
        await fetchFiles(); // Refresh index status
      } else {
        setStatus('Failed to re-index file.');
      }
    } catch {
      setStatus('Failed to reach server.');
    } finally {
      setReindexing(false);
    }
  };

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folder)) {
        next.delete(folder);
      } else {
        next.add(folder);
      }
      return next;
    });
  };

  const wordCount =
    content
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;

  if (!user?.isDocsAdmin) {
    return (
      <Layout title="Admin - Documents">
        <div style={{ ...pageStyle, textAlign: 'center', paddingTop: '4rem' }}>
          <p>Checking permissions...</p>
        </div>
      </Layout>
    );
  }

  // Group files by product
  const grouped: Record<string, DocFile[]> = {};
  for (const folder of PRODUCT_FOLDERS) {
    grouped[folder] = files.filter((f) => f.product === folder);
  }

  return (
    <Layout title="Admin - Documents">
      <div style={pageStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
              Document Editor
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
          <a href="/admin/documents" style={navLinkStyle(true)}>
            Documents
          </a>
          <a href="/admin/search-index" style={navLinkStyle(false)}>
            Search Index
          </a>
        </nav>

        {/* Split pane */}
        <div style={splitPaneStyle}>
          {/* File tree sidebar */}
          <div style={sidebarStyle}>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--ifm-color-emphasis-500)',
                marginBottom: '0.75rem',
              }}
            >
              Files
            </div>
            {loading ? (
              <div style={{ color: 'var(--ifm-color-emphasis-500)', fontSize: '0.8rem' }}>
                Loading...
              </div>
            ) : files.length === 0 ? (
              <div style={{ color: 'var(--ifm-color-emphasis-500)', fontSize: '0.8rem' }}>
                No files found. The API may not be available.
              </div>
            ) : (
              PRODUCT_FOLDERS.map((folder) => (
                <div key={folder}>
                  <div
                    style={folderHeaderStyle}
                    onClick={() => toggleFolder(folder)}
                  >
                    <span>{expandedFolders.has(folder) ? '\u25BC' : '\u25B6'}</span>
                    <span>{folder}/</span>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--ifm-color-emphasis-400)',
                        fontWeight: 400,
                      }}
                    >
                      ({grouped[folder]?.length || 0})
                    </span>
                  </div>
                  {expandedFolders.has(folder) &&
                    grouped[folder]?.map((file) => (
                      <div
                        key={file.path}
                        style={fileItemStyle(selectedFile?.path === file.path)}
                        onClick={() => handleSelectFile(file)}
                        onMouseEnter={(e) => {
                          if (selectedFile?.path !== file.path) {
                            (e.currentTarget as HTMLElement).style.background =
                              'var(--ifm-color-emphasis-100)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedFile?.path !== file.path) {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                          }
                        }}
                      >
                        <span style={indexDotStyle(file.indexed)} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {file.title || file.path.split('/').pop()}
                        </span>
                      </div>
                    ))}
                </div>
              ))
            )}
          </div>

          {/* Editor pane */}
          <div style={editorPaneStyle}>
            {!selectedFile ? (
              <div style={emptyStateStyle}>
                Select a file from the sidebar to begin editing.
              </div>
            ) : (
              <>
                {/* Toolbar */}
                <div style={editorToolbarStyle}>
                  <span style={editorFilePathStyle}>{selectedFile.path}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={wordCountStyle}>
                      ~{wordCount} words
                    </span>
                    <button
                      style={btnStyle(false)}
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      {previewMode ? 'Edit' : 'Preview'}
                    </button>
                  </div>
                </div>

                {/* Editor or preview */}
                {previewMode ? (
                  <div
                    style={previewPaneStyle}
                    dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(content) }}
                  />
                ) : (
                  <textarea
                    style={textareaStyle}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    spellCheck={false}
                  />
                )}

                {/* Actions */}
                <div style={btnRowStyle}>
                  <button
                    style={btnStyle(true)}
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    style={btnStyle(false)}
                    onClick={handleReindex}
                    disabled={reindexing}
                  >
                    {reindexing ? 'Re-indexing...' : 'Re-index'}
                  </button>
                  {status && (
                    <span
                      style={{
                        fontSize: '0.8rem',
                        alignSelf: 'center',
                        marginLeft: '0.5rem',
                        color: status.includes('Failed') || status.includes('failed')
                          ? '#ef4444'
                          : '#10b981',
                      }}
                    >
                      {status}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
