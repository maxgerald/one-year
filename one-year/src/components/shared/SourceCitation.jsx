/**
 * SourceCitation - Small muted source reference with optional link
 */
function SourceCitation({ source, url, className = '' }) {
  if (!source) return null;

  const baseClass = `text-xs text-slate-500 ${className}`.trim();

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} hover:text-slate-700 underline`}
      >
        {source}
      </a>
    );
  }

  return <span className={baseClass}>{source}</span>;
}

export default SourceCitation;
