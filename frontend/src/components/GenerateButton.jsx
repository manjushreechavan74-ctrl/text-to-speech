export default function GenerateButton({ onClick, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full bg-teal hover:bg-teal-dark disabled:bg-line disabled:text-ink/40 text-white font-medium py-2.5 rounded-lg transition"
    >
      {loading ? "Generating…" : "Generate speech"}
    </button>
  );
}