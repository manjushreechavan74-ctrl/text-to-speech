export default function AudioPlayer({ audioUrl }) {
  if (!audioUrl) return null;
  return (
    <div className="mt-6 pt-6 border-t border-line">
      <h3 className="text-sm font-medium text-ink/80 mb-2">Generated audio</h3>
      <audio controls src={audioUrl} className="w-full" />
    </div>
  );
}