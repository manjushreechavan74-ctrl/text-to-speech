import { useEffect, useState } from "react";
import TextInput from "./components/TextInput";
import LanguageSelector from "./components/LanguageSelector";
import VoiceSelector from "./components/VoiceSelector";
import GenerateButton from "./components/GenerateButton";
import AudioPlayer from "./components/AudioPlayer";
import DownloadButton from "./components/DownloadButton";
import ErrorMessage from "./components/ErrorMessage";
import Login from "./components/Login";
import Register from "./components/Register";
import History from "./components/History";
import Favorites from "./components/Favorites";
import { getVoices, generateSpeech, addFavorite } from "./api";

const MAX_LENGTH = 2000;
const TABS = [
  { id: "generate", label: "Generate" },
  { id: "history", label: "History" },
  { id: "favorites", label: "Favorites" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState("login");

  const [languages, setLanguages] = useState({});
  const [voicesByLanguage, setVoicesByLanguage] = useState({});
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [voice, setVoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [tab, setTab] = useState("generate");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) setUser(JSON.parse(savedUser));

    getVoices().then((data) => {
      setLanguages(data.languages || {});
      setVoicesByLanguage(data.voices || {});
    });
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleGenerate = async () => {
    setError("");
    setAudioUrl("");
    if (!text.trim()) return setError("Text must not be empty.");
    if (!language) return setError("Please select a language.");
    if (!voice) return setError("Please select a voice.");

    setLoading(true);
    try {
      const data = await generateSpeech({ text, language, voice });
      if (data.success) {
        setAudioUrl(data.audio_url);
      } else {
        setError(data.error || "Failed to generate speech.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFavorite = async () => {
    if (!audioUrl) return;
    const label = window.prompt("Label for this favorite:", text.slice(0, 30));
    if (!label) return;
    await addFavorite({ label, text, language, voice });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        {authView === "login" ? (
          <Login onLogin={handleLogin} switchToRegister={() => setAuthView("register")} />
        ) : (
          <Register onRegister={handleLogin} switchToLogin={() => setAuthView("login")} />
        )}
      </div>
    );
  }

  const voices = language ? voicesByLanguage[language] || [] : [];

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto">
        <header className="flex justify-between items-baseline mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold">Text to Speech</h1>
            <p className="text-sm text-ink/50 mt-0.5">Signed in as {user.username}</p>
          </div>
          <button onClick={handleLogout} className="text-sm text-ink/60 hover:text-red-600 underline">
            Log out
          </button>
        </header>

        <nav className="flex gap-1 mb-6 border-b border-line" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${
                tab === t.id
                  ? "border-teal text-teal"
                  : "border-transparent text-ink/50 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tab === "generate" && (
          <div className="bg-white border border-line rounded-xl p-6">
            <TextInput text={text} setText={setText} maxLength={MAX_LENGTH} />
            <LanguageSelector
              languages={languages}
              language={language}
              setLanguage={(l) => {
                setLanguage(l);
                setVoice("");
              }}
            />
            <VoiceSelector voices={voices} voice={voice} setVoice={setVoice} />
            <GenerateButton
              onClick={handleGenerate}
              loading={loading}
              disabled={!text || !language || !voice}
            />
            <ErrorMessage message={error} />
            <AudioPlayer audioUrl={audioUrl} />
            {audioUrl && (
              <div className="flex gap-4 items-center mt-4">
                <DownloadButton audioUrl={audioUrl} />
                <button
                  onClick={handleSaveFavorite}
                  className="text-sm text-teal font-medium underline underline-offset-2"
                >
                  Save as favorite
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "history" && (
          <div className="bg-white border border-line rounded-xl p-6">
            <History />
          </div>
        )}

        {tab === "favorites" && (
          <div className="bg-white border border-line rounded-xl p-6">
            <Favorites
              onUse={(fav) => {
                setText(fav.text);
                setLanguage(fav.language);
                setVoice(fav.voice);
                setTab("generate");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}