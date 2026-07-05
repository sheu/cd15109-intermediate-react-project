export default function ErrorMessage({
  message = "Something went wrong. Please try again.",
}) {
  return (
    <div
      role="alert"
      className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm"
    >
      {message}
    </div>
  );
}
