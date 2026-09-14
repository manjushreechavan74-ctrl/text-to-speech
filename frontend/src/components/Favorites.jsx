import { useEffect, useState } from "react";
import { getFavorites, deleteFavorite } from "../api";

export default function Favorites({ onUse }) {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data.favorites || []);
    } catch (err) {
      setError("Could not load favorites.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteFavorite(id);
    load();
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-4">Favorites</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {favorites.length === 0 && (
        <p className="text-ink/50 text-sm">No favorites yet. Save one from the Generate tab.</p>
      )}
      <ul className="space-y-3">
        {favorites.map((f) => (
          <li key={f.id} className="p-4 border border-line rounded-lg bg-paper/40">
            <p className="font-medium text-sm text-ink">{f.label}</p>
            <p className="text-sm text-ink/70 line-clamp-2 mt-0.5">{f.text}</p>
            <p className="text-xs text-ink/50 mt-1">
              {f.language} · {f.voice}
            </p>
            <div className="flex gap-4 mt-2">
              <button onClick={() => onUse(f)} className="text-xs text-teal font-medium underline">
                Use
              </button>
              <button onClick={() => handleDelete(f.id)} className="text-xs text-red-600 underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}