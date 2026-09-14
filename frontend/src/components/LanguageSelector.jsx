export default function LanguageSelector({ languages, language, setLanguage }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-ink/80 mb-1.5">Language</label>
      <select
        className="w-full p-2.5 border border-line rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="">Select a language</option>
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}