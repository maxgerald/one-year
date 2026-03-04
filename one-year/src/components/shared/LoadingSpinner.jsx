/**
 * LoadingSpinner - CSS-only rotating border
 */
function LoadingSpinner({ size = 'md', color = 'border-primary' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-transparent ${sizeClasses[size]} ${color}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export default LoadingSpinner;
