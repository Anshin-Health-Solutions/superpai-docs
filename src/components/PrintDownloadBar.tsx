import React from 'react';

/* ------------------------------------------------------------------ */
/* PrintDownloadBar                                                    */
/* Renders print/export and download-source buttons above doc content. */
/* Relies on .print-download-bar styles defined in custom.css.         */
/* ------------------------------------------------------------------ */

export default function PrintDownloadBar(): React.ReactElement | null {
  if (typeof window === 'undefined') return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Try to find the markdown content from the DOM.
    // Docusaurus renders docs inside article.
    const article = document.querySelector('article');
    if (!article) return;

    // Get the text content; for a proper download, get the innerHTML
    // and convert basic structures. We grab innerText as a reasonable
    // markdown-like approximation.
    const textContent = article.innerText || '';

    // Derive a filename from the page title
    const title = document.title.replace(/[^a-zA-Z0-9-_ ]/g, '').trim() || 'document';
    const filename = `${title.replace(/\s+/g, '-').toLowerCase()}.md`;

    const blob = new Blob([textContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="print-download-bar print-hide">
      <button onClick={handlePrint} title="Print this page or export as PDF">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Print / Export PDF
      </button>
      <button onClick={handleDownload} title="Download source as markdown">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Source (.md)
      </button>
    </div>
  );
}
