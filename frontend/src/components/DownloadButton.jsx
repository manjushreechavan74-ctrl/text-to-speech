export default function DownloadButton({ audioUrl }) {
  if (!audioUrl) return null;

  return (
    <a
      href={audioUrl}
      download
      className="inline-block bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
    >
      Download audio
    </a>
  );
}