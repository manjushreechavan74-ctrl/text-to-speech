import { useEffect, useState } from "react";
import { getHistory, deleteHistory } from "../api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await getHistory();
      setHistory(data.history || []);
    } catch (err) {
      setError("Could not load history.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteHistory(id);
    load();
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-4">Speech history</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {history.length === 0 && (
        <p className="text-ink/50 text-sm">No history yet. Generate some speech first.</p>
      )}
      <ul className="space-y-3">
        {history.map((h) => (
          <li key={h.id} className="p-4 border border-line rounded-lg bg-paper/40">
            <p className="text-sm text-ink line-clamp-2">{h.text}</p>
            <p className="text-xs text-ink/50 mt-1">
              {h.language} · {h.voice} · {new Date(h.created_at).toLocaleString()}
            </p>
            <audio controls src={h.audio_url} className="w-full mt-3" />
            <button onClick={() => handleDelete(h.id)} className="text-xs text-red-600 mt-2 underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}