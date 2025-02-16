export function LoadingSpinner() {
  return (
    <div className="animate-spin w-12 h-12 border-4 border-card-border border-t-accent rounded-full" 
         role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
} 