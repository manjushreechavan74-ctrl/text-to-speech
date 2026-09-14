export default function TextInput({ text, setText, maxLength }) {
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-ink/80 mb-1.5">Your text</label>
      <textarea
        className="w-full h-40 p-3 border border-line rounded-lg bg-paper/40 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
        placeholder="Type or paste text here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
      />
      <div className="flex justify-between text-xs text-ink/50 mt-1.5">
        <span>{wordCount} words</span>
        <span>{charCount} / {maxLength} characters</span>
      </div>
    </div>
  );
}