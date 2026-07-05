import { Link } from "react-router-dom";

export default function EmptyState({ title, description, linkTo, linkLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-5xl mb-4" aria-hidden="true">🛍️</p>
      <h2 className="text-xl font-semibold text-slate-700 mb-2">{title}</h2>
      <p className="text-slate-500 mb-6">{description}</p>
      {linkTo && (
        <Link
          to={linkTo}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
