export default function LoadingSpinner({ label = "Loading…" }) {
  return (
    <div
      className="flex items-center justify-center py-16"
      role="status"
      aria-label={label}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
    </div>
  );
}
