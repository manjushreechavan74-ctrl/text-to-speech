export default function VoiceSelector({ voices, voice, setVoice }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-ink/80 mb-1.5">Voice</label>
      <select
        className="w-full p-2.5 border border-line rounded-lg bg-white disabled:bg-line/30 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
        disabled={voices.length === 0}
      >
        <option value="">Select a voice</option>
        {voices.map((v) => (
          <option key={v.id} value={v.id}>
            {v.label}
          </option>
        ))}
      </select>
    </div>
  );
}