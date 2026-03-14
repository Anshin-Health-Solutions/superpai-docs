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

const PRODUCTS = ['superpai', 'anna-voice', 'orchestrate'];
const ORG_OPTIONS = ['anshin', 'onnex', 'external'];
const ROLE_OPTIONS = ['viewer', 'editor', 'admin'];

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface AdminUser {
  id: string;
  name: string;
  email: string;
  org: string;
  role: string;
  is_docs_admin: boolean;
  created_at?: string;
  permissions?: Array<{
    product: string;
    can_read: number;
    can_create: number;
    can_update: number;
    can_delete: number;
  }>;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  org: string;
  role: string;
  is_docs_admin: boolean;
}

interface PermissionRow {
  product: string;
  can_read: boolean;
  can_create: boolean;
  can_update: boolean;
  can_delete: boolean;
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

const addBtnStyle: React.CSSProperties = {
  padding: '0.5rem 1.25rem',
  background: 'var(--ifm-color-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'background 0.15s',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.85rem',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.75rem 1rem',
  borderBottom: '2px solid var(--ifm-color-emphasis-300)',
  fontWeight: 600,
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  color: 'var(--ifm-color-emphasis-700)',
  background: 'transparent',
};

const tdStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid var(--ifm-color-emphasis-200)',
  verticalAlign: 'middle',
};

const orgBadgeStyle = (org: string): React.CSSProperties => {
  const colors: Record<string, { bg: string; text: string }> = {
    anshin: { bg: '#dbeafe', text: '#1e40af' },
    onnex: { bg: '#ffedd5', text: '#c2410c' },
    external: { bg: '#e5e7eb', text: '#374151' },
  };
  const c = colors[org] || colors.external;
  return {
    display: 'inline-block',
    padding: '0.15rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.7rem',
    fontWeight: 600,
    background: c.bg,
    color: c.text,
    textTransform: 'uppercase',
  };
};

const actionBtnStyle: React.CSSProperties = {
  padding: '0.25rem 0.6rem',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '6px',
  background: 'transparent',
  color: 'var(--ifm-font-color-base)',
  fontSize: '0.75rem',
  cursor: 'pointer',
  marginRight: '0.35rem',
  transition: 'all 0.15s',
};

const deleteBtnStyle: React.CSSProperties = {
  ...actionBtnStyle,
  borderColor: '#ef4444',
  color: '#ef4444',
};

/* ------------------------------------------------------------------ */
/* Modal Styles                                                        */
/* ------------------------------------------------------------------ */

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};

const modalStyle: React.CSSProperties = {
  background: 'var(--ifm-background-color)',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '12px',
  padding: '2rem',
  width: '100%',
  maxWidth: '520px',
  maxHeight: '85vh',
  overflowY: 'auto',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  marginBottom: '1.5rem',
  margin: '0 0 1.5rem 0',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '1rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  marginBottom: '0.35rem',
  color: 'var(--ifm-color-emphasis-700)',
};

const inputFieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '6px',
  background: 'var(--ifm-background-surface-color)',
  color: 'var(--ifm-font-color-base)',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const selectFieldStyle: React.CSSProperties = {
  ...inputFieldStyle,
  cursor: 'pointer',
};

const checkboxRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1rem',
};

const modalFooterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.75rem',
  marginTop: '1.5rem',
  paddingTop: '1rem',
  borderTop: '1px solid var(--ifm-color-emphasis-200)',
};

const cancelBtnStyle: React.CSSProperties = {
  padding: '0.5rem 1.25rem',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '8px',
  background: 'transparent',
  color: 'var(--ifm-font-color-base)',
  cursor: 'pointer',
  fontSize: '0.85rem',
};

const saveBtnStyle: React.CSSProperties = {
  padding: '0.5rem 1.25rem',
  border: 'none',
  borderRadius: '8px',
  background: 'var(--ifm-color-primary)',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '0.85rem',
};

const permCheckboxStyle: React.CSSProperties = {
  width: '16px',
  height: '16px',
  cursor: 'pointer',
};

/* ------------------------------------------------------------------ */
/* User Form Modal                                                     */
/* ------------------------------------------------------------------ */

function UserFormModal({
  user: editUser,
  onClose,
  onSave,
}: {
  user: AdminUser | null;
  onClose: () => void;
  onSave: (data: UserFormData) => Promise<void>;
}) {
  const isEditing = editUser !== null;
  const [form, setForm] = useState<UserFormData>({
    name: editUser?.name || '',
    email: editUser?.email || '',
    password: '',
    org: editUser?.org || 'external',
    role: editUser?.role || 'viewer',
    is_docs_admin: editUser?.is_docs_admin || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }
    if (!isEditing && !form.password.trim()) {
      setError('Password is required for new users.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(form);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save user.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={modalTitleStyle}>{isEditing ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Name</label>
            <input
              style={inputFieldStyle}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email</label>
            <input
              style={inputFieldStyle}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="user@example.com"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>
              Password {isEditing && '(leave blank to keep current)'}
            </label>
            <input
              style={inputFieldStyle}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder={isEditing ? '(unchanged)' : 'Password'}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Organization</label>
            <select
              style={selectFieldStyle}
              value={form.org}
              onChange={(e) => setForm({ ...form, org: e.target.value })}
            >
              {ORG_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Role</label>
            <select
              style={selectFieldStyle}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div style={checkboxRowStyle}>
            <input
              type="checkbox"
              id="is_admin"
              checked={form.is_docs_admin}
              onChange={(e) => setForm({ ...form, is_docs_admin: e.target.checked })}
            />
            <label htmlFor="is_admin" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
              Docs Admin
            </label>
          </div>
          {error && (
            <div
              style={{
                color: '#ef4444',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}
            >
              {error}
            </div>
          )}
          <div style={modalFooterStyle}>
            <button type="button" style={cancelBtnStyle} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={saveBtnStyle} disabled={saving}>
              {saving ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Permissions Modal                                                   */
/* ------------------------------------------------------------------ */

function PermissionsModal({
  targetUser,
  token,
  onClose,
}: {
  targetUser: AdminUser;
  token: string;
  onClose: () => void;
}) {
  const [rows, setRows] = useState<PermissionRow[]>(() =>
    PRODUCTS.map((product) => {
      const existing = targetUser.permissions?.find((p) => p.product === product);
      return {
        product,
        can_read: existing ? existing.can_read === 1 : false,
        can_create: existing ? existing.can_create === 1 : false,
        can_update: existing ? existing.can_update === 1 : false,
        can_delete: existing ? existing.can_delete === 1 : false,
      };
    })
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const togglePerm = (product: string, field: keyof PermissionRow) => {
    setRows((prev) =>
      prev.map((r) =>
        r.product === product ? { ...r, [field]: !r[field] } : r
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus('');
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      for (const row of rows) {
        await fetch(
          `${API_BASE}/api/v1/admin/users/${targetUser.id}/permissions/${row.product}`,
          {
            method: 'PUT',
            headers,
            body: JSON.stringify({
              can_read: row.can_read ? 1 : 0,
              can_create: row.can_create ? 1 : 0,
              can_update: row.can_update ? 1 : 0,
              can_delete: row.can_delete ? 1 : 0,
            }),
          }
        );
      }

      setStatus('Permissions saved successfully.');
      setTimeout(onClose, 1000);
    } catch {
      setStatus('Failed to save permissions.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={modalTitleStyle}>
          Permissions for {targetUser.name}
        </h2>
        <table style={{ ...tableStyle, marginBottom: '1rem' }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, background: 'transparent' }}>Product</th>
              <th style={{ ...thStyle, background: 'transparent', textAlign: 'center' }}>
                Read
              </th>
              <th style={{ ...thStyle, background: 'transparent', textAlign: 'center' }}>
                Create
              </th>
              <th style={{ ...thStyle, background: 'transparent', textAlign: 'center' }}>
                Update
              </th>
              <th style={{ ...thStyle, background: 'transparent', textAlign: 'center' }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.product}>
                <td style={tdStyle}>
                  <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                    {row.product.replace('-', ' ')}
                  </span>
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    style={permCheckboxStyle}
                    checked={row.can_read}
                    onChange={() => togglePerm(row.product, 'can_read')}
                  />
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    style={permCheckboxStyle}
                    checked={row.can_create}
                    onChange={() => togglePerm(row.product, 'can_create')}
                  />
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    style={permCheckboxStyle}
                    checked={row.can_update}
                    onChange={() => togglePerm(row.product, 'can_update')}
                  />
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    style={permCheckboxStyle}
                    checked={row.can_delete}
                    onChange={() => togglePerm(row.product, 'can_delete')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {status && (
          <div
            style={{
              fontSize: '0.8rem',
              marginBottom: '0.5rem',
              color: status.includes('Failed') ? '#ef4444' : '#10b981',
            }}
          >
            {status}
          </div>
        )}
        <div style={modalFooterStyle}>
          <button type="button" style={cancelBtnStyle} onClick={onClose}>
            Cancel
          </button>
          <button style={saveBtnStyle} onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Permissions'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function AdminUsers(): React.ReactElement {
  const user = useUser();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [permUser, setPermUser] = useState<AdminUser | null>(null);

  // Redirect non-admins
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user && !user.isDocsAdmin) {
      window.location.href = '/';
    }
  }, [user]);

  const fetchUsers = useCallback(async () => {
    if (!user?.isDocsAdmin) return;
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/api/v1/admin/users`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        setUsers(Array.isArray(data) ? data : data.users || []);
      }
    } catch {
      // API may not be available
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSaveUser = async (formData: UserFormData) => {
    if (!user) return;
    const headers = {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    };

    const body: Record<string, unknown> = {
      name: formData.name,
      email: formData.email,
      org: formData.org,
      role: formData.role,
      is_docs_admin: formData.is_docs_admin,
    };
    if (formData.password) {
      body.password = formData.password;
    }

    if (editingUser) {
      // Update
      const resp = await fetch(`${API_BASE}/api/v1/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });
      if (!resp.ok) throw new Error('Failed to update user.');
    } else {
      // Create
      body.password = formData.password;
      const resp = await fetch(`${API_BASE}/api/v1/admin/users`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if (!resp.ok) throw new Error('Failed to create user.');
    }

    await fetchUsers();
  };

  const handleDeleteUser = async (targetId: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this user? This cannot be undone.')) return;

    try {
      await fetch(`${API_BASE}/api/v1/admin/users/${targetId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      await fetchUsers();
    } catch {
      alert('Failed to delete user.');
    }
  };

  if (!user?.isDocsAdmin) {
    return (
      <Layout title="Admin - Users">
        <div style={{ ...pageStyle, textAlign: 'center', paddingTop: '4rem' }}>
          <p>Checking permissions...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin - Users">
      <div style={pageStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
              User Management
            </h1>
          </div>
          <button
            style={addBtnStyle}
            onClick={() => {
              setEditingUser(null);
              setShowUserModal(true);
            }}
          >
            + Add User
          </button>
        </div>

        {/* Navigation tabs */}
        <nav style={navStyle}>
          <a href="/admin" style={navLinkStyle(false)}>
            Dashboard
          </a>
          <a href="/admin/users" style={navLinkStyle(true)}>
            Users
          </a>
          <a href="/admin/documents" style={navLinkStyle(false)}>
            Documents
          </a>
          <a href="/admin/search-index" style={navLinkStyle(false)}>
            Search Index
          </a>
        </nav>

        {/* Users table */}
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--ifm-color-emphasis-500)',
            }}
          >
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--ifm-color-emphasis-500)',
            }}
          >
            No users found. The API may not be configured yet, or the server is
            unreachable.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Org</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Admin</th>
                  <th style={thStyle}>Created</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{u.name}</td>
                    <td style={tdStyle}>{u.email}</td>
                    <td style={tdStyle}>
                      <span style={orgBadgeStyle(u.org)}>{u.org}</span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ textTransform: 'capitalize' }}>{u.role}</span>
                    </td>
                    <td style={tdStyle}>
                      {u.is_docs_admin ? (
                        <span style={{ color: '#10b981', fontWeight: 600 }}>Yes</span>
                      ) : (
                        <span style={{ color: 'var(--ifm-color-emphasis-500)' }}>No</span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {u.created_at
                        ? new Date(u.created_at).toLocaleDateString()
                        : '-'}
                    </td>
                    <td style={tdStyle}>
                      <button
                        style={actionBtnStyle}
                        onClick={() => {
                          setEditingUser(u);
                          setShowUserModal(true);
                        }}
                        title="Edit user"
                      >
                        Edit
                      </button>
                      <button
                        style={actionBtnStyle}
                        onClick={() => setPermUser(u)}
                        title="Manage permissions"
                      >
                        Permissions
                      </button>
                      <button
                        style={deleteBtnStyle}
                        onClick={() => handleDeleteUser(u.id)}
                        title="Delete user"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modals */}
        {showUserModal && (
          <UserFormModal
            user={editingUser}
            onClose={() => {
              setShowUserModal(false);
              setEditingUser(null);
            }}
            onSave={handleSaveUser}
          />
        )}

        {permUser && (
          <PermissionsModal
            targetUser={permUser}
            token={user.token}
            onClose={() => setPermUser(null)}
          />
        )}
      </div>
    </Layout>
  );
}
