import React, { useState, useRef, useEffect, useCallback } from 'react';
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

interface SearchResult {
  title: string;
  product: string;
  path: string;
  snippet: string;
}

/* ------------------------------------------------------------------ */
/* Product badge colors                                                */
/* ------------------------------------------------------------------ */

const PRODUCT_COLORS: Record<string, string> = {
  superpai: '#2E75B6',
  'anna-voice': '#00B4D8',
  orchestrate: '#10b981',
};

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const containerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const inputStyle: React.CSSProperties = {
  padding: '0.4rem 0.75rem 0.4rem 2rem',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '8px',
  background: 'var(--ifm-background-surface-color)',
  color: 'var(--ifm-font-color-base)',
  fontSize: '0.85rem',
  width: '240px',
  outline: 'none',
  transition: 'border-color 0.15s, width 0.2s',
};

const inputFocusedStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: 'var(--ifm-color-primary)',
  width: '320px',
};

const searchIconStyle: React.CSSProperties = {
  position: 'absolute',
  left: '0.6rem',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '14px',
  height: '14px',
  color: 'var(--ifm-color-emphasis-500)',
  pointerEvents: 'none',
};

const dropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  background: 'var(--ifm-background-surface-color)',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '8px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  zIndex: 1000,
  maxHeight: '400px',
  overflowY: 'auto',
  minWidth: '360px',
};

const resultItemStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  cursor: 'pointer',
  borderBottom: '1px solid var(--ifm-color-emphasis-200)',
  textDecoration: 'none',
  display: 'block',
  color: 'inherit',
  transition: 'background 0.1s',
};

const resultTitleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '0.9rem',
  marginBottom: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const badgeStyle = (product: string): React.CSSProperties => ({
  fontSize: '0.65rem',
  fontWeight: 700,
  padding: '0.1rem 0.4rem',
  borderRadius: '4px',
  background: PRODUCT_COLORS[product] || '#6b7280',
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  flexShrink: 0,
});

const snippetStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--ifm-color-emphasis-600)',
  lineHeight: 1.4,
};

const emptyStyle: React.CSSProperties = {
  padding: '1rem',
  textAlign: 'center',
  color: 'var(--ifm-color-emphasis-500)',
  fontSize: '0.85rem',
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function DocsSearch(): React.ReactElement | null {
  const user = useUser();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const doSearch = useCallback(
    async (q: string) => {
      if (!q.trim() || q.trim().length < 2) {
        setResults([]);
        setOpen(false);
        return;
      }

      setLoading(true);
      try {
        const token = user?.token || '';
        const url = `${API_BASE}/docs/search?q=${encodeURIComponent(q)}&token=${encodeURIComponent(token)}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          const items: SearchResult[] = Array.isArray(data.results)
            ? data.results
            : Array.isArray(data)
              ? data
              : [];
          setResults(items.slice(0, 10));
          setOpen(items.length > 0);
        } else {
          setResults([]);
          setOpen(false);
        }
      } catch {
        setResults([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === 'Enter' && results.length > 0) {
      window.location.href = results[0].path;
    }
  };

  // Highlight matched text in snippets
  const highlightSnippet = (text: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ background: '#fbbf24', borderRadius: '2px', padding: '0 1px' }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <svg style={searchIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Search docs..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setFocused(true);
          if (results.length > 0) setOpen(true);
        }}
        onBlur={() => setFocused(false)}
        style={focused ? inputFocusedStyle : inputStyle}
        aria-label="Search documentation"
      />
      {open && (
        <div style={dropdownStyle}>
          {loading && <div style={emptyStyle}>Searching...</div>}
          {!loading && results.length === 0 && <div style={emptyStyle}>No results found</div>}
          {!loading &&
            results.map((r, i) => (
              <a
                key={i}
                href={r.path}
                style={resultItemStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    'var(--ifm-color-emphasis-100)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <div style={resultTitleStyle}>
                  <span style={badgeStyle(r.product)}>{r.product}</span>
                  <span>{r.title}</span>
                </div>
                <div style={snippetStyle}>{highlightSnippet(r.snippet)}</div>
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
