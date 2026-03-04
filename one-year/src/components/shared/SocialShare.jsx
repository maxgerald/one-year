/**
 * SocialShare - Twitter, Facebook, LinkedIn, Copy Link
 */
import { useState } from 'react';

function SocialShare({ url = typeof window !== 'undefined' ? window.location.href : '', text, dark }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(text ?? 'A house cost 2.3 years of salary in 1950. Today it costs 4.9 years.');

  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const btnClass = dark
    ? 'rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20'
    : 'rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-gray-50';

  return (
    <div className="flex flex-wrap gap-2">
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
        X
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
        Facebook
      </a>
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
        LinkedIn
      </a>
      <button onClick={copyLink} className={btnClass}>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}

export default SocialShare;
